export interface WeatherItem {
  title?: string;
  weather_state_abbr?: string;
  weather_state_name?: string;
  applicable_date?: string;
  min_temp?: number;
  max_temp?: number;
  humidity?: number;
  predictability?: number;
}
