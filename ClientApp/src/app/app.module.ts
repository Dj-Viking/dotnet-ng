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
import { TodosFormToggleButtonComponent } from './components/todos-form-toggle-button/todos-form-toggle-button.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { TodosComponent } from './views/todos/todos.component';
import { TodosHeaderComponent } from './components/todos-header/todos-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CounterComponent,
        FetchDataComponent,
        TodosFormToggleButtonComponent,
        AddTodoFormComponent,
        TodosComponent,
        TodosHeaderComponent,
        TodoItemComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'todo-list', component: TodosComponent },
        ]),
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
