import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() data: any = {};

  dueDate: any = '';

  selectedImportance = '';

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.setDueDate();
  }

  showDatePicker(event: any) {
    event.target.showPicker();
  }

  restoreDueDate() {
    this.setDueDate();
  }

  setDueDate() {
    this.dueDate = this.datePipe.transform(this.getTodayDate(), 'yyyy-MM-dd');
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + + dd;
  }

  // TODO fix card design and whole app design to match adobe
  // TODO maybe make it enum
  // TODO remove default blue color when selecting date or entering other info
  getImportanceClass() {
    if (!this.selectedImportance || this.selectedImportance === '0') {
      return '';
    }
    if (this.selectedImportance === '1') {
      return 'low-imp';
    }
    if (this.selectedImportance === '2') {
      return 'med-imp';
    }
    return 'high-imp';
  }
}
