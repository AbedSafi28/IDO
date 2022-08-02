import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit, Inject} from '@angular/core';
import {TodoService} from '../providers/todo.service';
import {HttpClient} from '@angular/common/http';
import {SearchFilterPipe} from '../pipes/searchFilter';

// @TODO fix dragging to empty list
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  http: HttpClient;
  baseUrl: string;

  quoteHidden = true;

  constructor(
    public todoService: TodoService,
    public searchFilterPipe: SearchFilterPipe,
    http: HttpClient, @Inject('BASE_URL')
    baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.http.get(this.baseUrl + 'todo').subscribe(
      (response: any) => {
        if (response?.length) {
          response.map((m: any) => {
            if (m.status === 'todo') {
              this.todoService.todos.push(m);
            } else if (m.status === 'doing') {
              this.todoService.doing.push(m);
            } else if (m.status === 'completed') {
              this.todoService.completed.push(m);
            }
          })
        }
      },
      (error) => {
      }
    );
  }

  onDrop(event: CdkDragDrop<any>) {
    let skipUpdate = false;
    let draggedData: any = '';
    const oldContainerData = [...event.previousContainer.data];
    const firstOldElenment = oldContainerData[0];
    const newContainerData = [...event.container.data]
    const firstNewElenment = newContainerData[0];
    if (event.previousContainer === event.container) {
      // if entered here although user dragged with distance > 150
      // then user is trying to move item to empy column but Angular refusing to do so
      if (event.previousContainer.data[event.previousIndex].status === 'todo' && event.distance.x > 150) {
        draggedData = this.todoService.todos.find((f: any) => f.id === event.previousContainer.data[event.previousIndex].id);
        if (draggedData) {
          this.todoService.todos.splice(this.todoService.todos.indexOf(draggedData), 1)
        }
        if (event.distance.x > 500) {
          this.todoService.completed.unshift(draggedData);
          draggedData.status = 'completed';
        } else {
          this.todoService.doing.unshift(draggedData)
          draggedData.status = 'doing';
        }
      } else if (event.previousContainer.data[event.previousIndex].status === 'doing' && (event.distance.x < - 150 || event.distance.x > 150)) {
        draggedData = this.todoService.doing.find((f: any) => f.id === event.previousContainer.data[event.previousIndex].id);
        if (draggedData) {
          this.todoService.doing.splice(this.todoService.doing.indexOf(draggedData), 1)
        }
        if (event.distance.x > 150) {
          this.todoService.completed.unshift(draggedData);
          draggedData.status = 'completed';
        } else {
          this.todoService.todos.unshift(draggedData);
          draggedData.status = 'todo';
        }
      } else if (event.previousContainer.data[event.previousIndex].status === 'completed' && event.distance.x < -150) {
        draggedData = this.todoService.completed.find((f: any) => f.id === event.previousContainer.data[event.previousIndex].id);
        if (draggedData) {
          this.todoService.completed.splice(this.todoService.completed.indexOf(draggedData), 1)
        }
        if (event.distance.x < -500) {
          this.todoService.todos.unshift(draggedData);
          draggedData.status = 'todo';
        } else {
          this.todoService.doing.unshift(draggedData);
          draggedData.status = 'doing';
        }
      } else {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        skipUpdate = true;
      }
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      draggedData = event.container.data.find((f: any) => f.status === firstOldElenment.status);
      draggedData.status = firstNewElenment.status;
    }
    if (!skipUpdate) {
      this.http.post(this.baseUrl + 'todo', draggedData).subscribe(
        (response: any) => {
        },
        (error) => {
        }
      );
    }
  }

  showQuote() {
    this.quoteHidden = false;
  }

  hideQuote() {
    this.quoteHidden = true;
  }
}
