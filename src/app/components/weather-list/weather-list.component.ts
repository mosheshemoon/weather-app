import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weatherApi.service';
import { WeatherItem } from 'src/app/types';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];

  constructor(public weatherService: WeatherApiService) {
    this.weatherItems = [];
  }

  ngOnInit(): void {}

  addItem(): void {
    this.weatherService.addWeatherItem();
  }
}
