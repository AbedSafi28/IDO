import {Component} from '@angular/core';
import {TodoService} from '../providers/todo.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  // TODO make butttons clickable with cursor pointer in this component

  constructor(public todoService: TodoService) {
  }

  addTask() {
    this.todoService.todos.unshift({
      id: 'randomId',
      title: 'My Task',
      category: 'Category',
      dueDate: '',
      estimate: '7 days', // TODO check about this number + text requirement
      importance: '',
      userCredential: 'zxc'
    })
  }
}
