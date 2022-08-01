import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

    searchTerm = '';

    todos: any[] = [
    ]
    doing: any[] = [
    ]
    completed: any[] = [
    ]

    lastUpdatedTime: any = 0;

    constructor() {
        setInterval(() => {
            // TODO maybe find an alternative way to update data on server
            if (this.lastUpdatedTime && (Date.now() - this.lastUpdatedTime) > 800) {
                this.lastUpdatedTime = 0;
            }
        }, 100)
    }
}