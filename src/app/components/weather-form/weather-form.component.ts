import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent implements OnInit {
  @Output() saveItem: EventEmitter<{ city: string; date: string }> =
    new EventEmitter();
  @Output() deleteItem: EventEmitter<{ city: string; date: string }> =
    new EventEmitter();

  @Input() city: string | undefined;
  @Input() date: string | undefined;

  constructor() {}
  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    form.value.date = form.value.date
      ? form.value.date
      : this.convertDateFormat(new Date());

    this.saveItem.emit(form.value);
  }

  delete(): void {
    this.deleteItem.emit();
  }

  convertDateFormat(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
