import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter
  todos: Todo[] = [];
  faCheck = faCheck;
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {

    
  }

  deletingTodo(todo: Todo){
    this.deleteTodo.emit(todo)
  }
}
    

