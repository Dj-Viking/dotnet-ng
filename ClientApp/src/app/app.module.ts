import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './views/home/home.component';
import { CounterComponent } from './views/counter/counter.component';
import { FetchDataComponent } from './views/fetch-data/fetch-data.component';
import { TodosComponent } from './views/todos/todos.component';
import { TodosHeaderComponent } from './components/todos-header/todos-header.component';
import { TodosFormToggleButtonComponent } from './components/todos-form-toggle-button/todos-form-toggle-button.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TodosComponent,
    TodosHeaderComponent,
    TodosFormToggleButtonComponent,
    AddTaskFormComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'todos', component: TodosComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
