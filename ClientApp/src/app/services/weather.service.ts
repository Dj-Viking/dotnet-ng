import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl!: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    this.baseUrl = baseUrl;

  }

  getWeather(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(`${this.baseUrl}weatherforecast`);
  }
}
