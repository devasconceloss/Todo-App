import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/models/todo.model';


@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter
  @Output() finishTodo: EventEmitter<Todo> = new EventEmitter
  todos: Todo[] = [];
  faCheck = faCheck;
  faTimes = faTimes;
  @Input() color: string;

  constructor() { }

  ngOnInit() {
    
  }


  deletingTodo(todo: Todo){
    this.deleteTodo.emit(todo)
  }


  finishingTodo(todo: Todo){
    this.finishTodo.emit(todo)
  }
}
    

