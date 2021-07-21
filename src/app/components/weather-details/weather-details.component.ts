import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherItem } from 'src/app/types';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @Input() weatherItem!: WeatherItem;

  imgUrl!: string;
  
  constructor() { }

  ngOnInit(): void {
    this.imgUrl = `http://metaweather.com/static/img/weather/png/64/${this.weatherItem.weather_state_abbr}.png`;
  }

  toggleEditable(): void {
    this.toggle.emit();
  }
}
