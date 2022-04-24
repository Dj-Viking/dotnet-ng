import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  todo_text: string = "";
  // TODO: convert into a calendar
  // and post the new TODO in a format that works with
  // saving dates to the MYSQL database
  day_date: string = "";
  reminder: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
