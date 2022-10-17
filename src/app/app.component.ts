import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Todo List';
  public tasks: Task[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required
      ])],
    });
  
    
  }

  addTask(){
    const id = this.tasks.length + 1
    const title = this.form.controls['title'].value
    const category = this.form.controls['category'].value
    const done = false
    
    this.tasks.push(new Task(id, title, category, done))
    this.erasePreviousData()
    
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

  erasePreviousData(){
    this.form.reset()
  }
}
