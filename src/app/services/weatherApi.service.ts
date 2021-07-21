import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { WeatherItem, Location } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private _weatherItems$: BehaviorSubject<WeatherItem[]> = new BehaviorSubject<
    WeatherItem[]
  >([]);

  public readonly weatherItems$: Observable<WeatherItem[]>;

  constructor(private http: HttpClient) {
    this.weatherItems$ = this._weatherItems$.asObservable();
  }

  setWeatherItems(WeatherItems: WeatherItem[]): void {
    this._weatherItems$.next(WeatherItems);
  }

  saveWeatherItems(location: Location, date: string, index: number): Observable<WeatherItem | void> {
    const splitedDate = date.split('-');
    return this.http
      .get<WeatherItem[]>(
        `api/location/${location?.woeid}/${splitedDate[0]}/${splitedDate[1]}/${splitedDate[2]}/`
      )
      .pipe(
        map(
          (weatherItems: WeatherItem[]) =>
            weatherItems.sort(
              (a: any, b: any) => b.predictability - a.predictability
            )[0]
        ),
        tap((weatherItem: WeatherItem) => {
          const weatherItems = [...this._weatherItems$.value];
          weatherItems[index] = { ...weatherItem, title: location.title };
          this.setWeatherItems(weatherItems);
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  addWeatherItem() {
    this.setWeatherItems([...this._weatherItems$.value, {}]);
  }

  deleteWeatherItem(index: number) {
    const weatherItems = this._weatherItems$.value.filter(
      (item: WeatherItem, i: number) => index !== i
    );
    this.setWeatherItems(weatherItems);
  }

  async getLocation(location: string): Promise<Location> {
    const params = new HttpParams().append('query', location);

    return (await this.http
      .get<Location[]>('api/location/search', {
        params,
      })
      .toPromise())[0];
  }

  handleError(error: any): Observable<void> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
