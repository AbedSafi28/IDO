import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {TodoComponent} from './todo/todo.component';
import {TaskComponent} from './task/task.component';
import {TodoService} from './providers/todo.service';
import {DatePipe} from '@angular/common';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {SearchFilterPipe} from './pipes/searchFilter';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TodoComponent,
    TaskComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'mylist',
        component: TodoComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  providers: [
    AuthGuardService,
    AuthService,
    TodoService,
    DatePipe,
    SearchFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
