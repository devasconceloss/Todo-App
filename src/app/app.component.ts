import { Component } from '@angular/core';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Todo List';
  public tasks: Task[] = [];

  constructor() {
    this.tasks.push(new Task(1,"developer todolist angular version", "programming", false))
    this.tasks.push(new Task(2,"finish the 2nd LOTR book", "personal", false))
    this.tasks.push(new Task(3,"go to the gym", "personal", true))
    
  }
}
