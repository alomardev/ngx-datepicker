import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  date1: string;
  date2: string;
  custom: string;

  @ViewChild('d1') date1Control: FormControl;
  @ViewChild('form') form: NgForm;

  constructor() {
    localStorage.setItem("lang", "en");
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(v => {
      console.log(v);
    });
  }
}
