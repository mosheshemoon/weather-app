import { Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherApiService } from 'src/app/services/weatherApi.service';
import { WeatherItem } from 'src/app/types';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherItemComponent implements OnChanges {
  @Input() weatherItem!: WeatherItem;
  @Input() index!: number;

  loading!: boolean;
  editable!: boolean;

  constructor(
    private weatherService: WeatherApiService,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnChanges() {
    this.editable = !this.weatherItem?.title;
  }

  async saveItem({
    city,
    date,
  }: {
    city: string;
    date: string;
  }): Promise<void> {
    if (
      city === this.weatherItem.title &&
      date === this.weatherItem.applicable_date
    ) {
      this.editable = !this.weatherItem?.title;
      return;
    }

    this.loading = true;
    try {
      const location = await this.weatherService.getLocation(city);

      if (!location) {
        throw new Error('no location with current name');
      }

      this.weatherService
        .saveWeatherItems(location, date, this.index)
        .subscribe(
          () => (this.loading = false),
          (err) => {
            throw err;
          }
        );
    } catch (err) {
      this.snackBar.open(err.message, 'close');
      this.loading = false;
    }
  }

  deleteItem(): void {
    this.weatherService.deleteWeatherItem(this.index);
  }

  toggleEditable() {
    this.editable = !this.editable;
  }
}
