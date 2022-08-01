import {Component} from '@angular/core';
import {TodoService} from '../providers/todo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  searchBarShown = false;
  searchTerm = '';

  constructor(private router: Router, public todoService: TodoService) {
  }

  setSearchValue(value: string): void {
    this.todoService.searchTerm = value;
  }

  showSearchBar() {
    this.searchBarShown = true;
  }

  hideSearchBar() {
    if (!this.searchTerm) {
      this.searchBarShown = false;
    }
  }

  addTask() {
    this.todoService.todos.unshift({
      id: Math.random().toString(36).substr(2, 16),
      status: 'todo',
      title: 'My Task',
      category: 'Category',
      dueDate: '',
      estimate: '7 days', // TODO check about this number + text requirement
      importance: ''
    })
  }

  logout() {
    localStorage.removeItem('ido-login');
    this.router.navigate(['/'])
  }
}
