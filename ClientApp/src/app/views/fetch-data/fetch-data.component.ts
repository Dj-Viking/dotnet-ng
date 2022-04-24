import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe((forecasts) => {
      this.forecasts = forecasts;
    })
  }
}

