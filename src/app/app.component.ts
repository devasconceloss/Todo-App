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
  
    
  }

  removeTask(task: Task): void {
    const taskIndex = this.tasks.indexOf(task)
    taskIndex == -1? console.log("Task dont found") : this.tasks.splice(taskIndex, 1)

  }

  finishTask(task: Task){
    task.done = true
  }

  reopenTask(task: Task){
    task.done = false
  }

  addTask(title: String, category: String){
    !title || title.length == 0 ? console.log("erro") : this.tasks.push(new Task(this.tasks.length + 1, title, category, false))

  }
}
