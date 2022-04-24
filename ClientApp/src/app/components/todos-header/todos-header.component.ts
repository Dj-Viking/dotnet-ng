import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit {
  public title: string = "Todos";

  constructor() { }

  ngOnInit(): void {
  }

}
