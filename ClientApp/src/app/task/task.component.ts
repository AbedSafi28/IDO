import {Component, Inject, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TodoService} from '../providers/todo.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  http: HttpClient;
  baseUrl: string;

  oldData: any = {};
  @Input() data: any = {};

  constructor(private datePipe: DatePipe, public todoService: TodoService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.oldData = Object.assign({}, this.data);
  }

  showDatePicker(event: any) {
    event.target.showPicker();
  }

  restoreDueDate() {
    this.setDueDate();
  }

  setDueDate() {
    this.data.dueDate = this.datePipe.transform((this.data.dueDate ? this.data.dueDate : this.getTodayDate()), 'yyyy-MM-dd');
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + + dd;
  }

  getTitleClass(highlighted = false) {
    let classes = 'task-title';
    if (highlighted) {
      classes += ' highlighted';
    }
    return classes;
  }

  getImportanceClass() {
    if (this.data.importance === '2') {
      return 'med-imp';
    }
    if (this.data.importance === '3') {
      return 'high-imp';
    }
    return 'low-imp';
  }

  checkAndUpdate() {
    const oldData = Object.assign({}, this.oldData);
    const data = Object.assign({}, this.data);
    delete oldData.highlighted;
    delete data.highlighted;
    if (JSON.stringify(oldData) !== JSON.stringify(data)) {
      this.http.post(this.baseUrl + 'todo', this.data).subscribe(
        (response: any) => {
        },
        (error) => {
        }
      );
      this.oldData = Object.assign({}, this.data);
      this.todoService.lastUpdatedTime = Date.now();
    }
  }
}
