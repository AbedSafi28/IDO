import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit, Inject} from '@angular/core';
import {TodoService} from '../providers/todo.service';
import {HttpClient} from '@angular/common/http';

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

  constructor(public todoService: TodoService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.http.get(this.baseUrl + 'todo').subscribe(
      (response: any) => {
        // console.log(response);
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
          console.log(this.todoService.todos);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onDrop(event: CdkDragDrop<any>) {
    const oldContainerData = [...event.previousContainer.data];
    const firstOldElenment = oldContainerData[0];
    const newContainerData = [...event.container.data]
    const firstNewElenment = newContainerData[0];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const draggedData = event.container.data.find((f: any) => f.status === firstOldElenment.status);
      draggedData.status = firstNewElenment.status;
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
