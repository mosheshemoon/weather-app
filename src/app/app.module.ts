import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherItemComponent } from './components/weather-card/weather-card.component';
import { HttpPrefixInterceptor } from './interceptors/http-interceptor';
import { WeatherFormComponent } from './components/weather-form/weather-form.component';
import { FormsModule } from '@angular/forms';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherListComponent,
    WeatherItemComponent,
    WeatherFormComponent,
    WeatherDetailsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpPrefixInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
