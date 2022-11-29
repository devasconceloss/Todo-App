import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { Todo } from 'src/models/todo.model';


@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  todos: Todo[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTodos().subscribe((todoData) => {
      this.todos = todoData['todos']
      console.log(this.todos)
    
  });
}
    
}
