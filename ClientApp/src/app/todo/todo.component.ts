import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos = [{
    name: 'task1'
  },
  {
    name: 'task2'
  }
  ]
  doing = [{
    name: 'task3'
  },
  {
    name: 'task4'
  }
  ]
  completed = [{
    name: 'task5'
  },
  {
    name: 'task6'
  }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
