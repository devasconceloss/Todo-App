import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Todo } from 'src/models/todo.model';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  title: String = 'Todo App';
  todos: Todo[] = [];
  form: FormGroup;
  new_todo: Todo;
  faExclamation = faExclamationCircle;
  

  id: number;
  title_todo: string;
  category: string;
  @Output() newTodo: EventEmitter<Todo> = new EventEmitter;
  @Output() class: EventEmitter<string> = new EventEmitter;


  constructor(private fb:FormBuilder, private apiService: ApiService) { 

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required
      ])],
    });
  }
  
  addNewTodo(){
    
    let title_todo = this.form.controls['title'].value
    let category = this.form.controls['category'].value
    let done:boolean = false

    this.filteringCategories(category)
    
    this.new_todo = new Todo(this.id, title_todo, category, done)
    this.id++
    this.newTodo.emit(this.new_todo)
  }

  filteringCategories(category: string) {
    switch(category) {
      case "Work":
        this.class.emit('work-color');
        break;
        
      case "Health":
        this.class.emit('health-color');
        break;

      case "Fun":
        this.class.emit('fun-color');
        break;
      
      case "Personal":
        this.class.emit('work-color');
        break;
          
      default:
        this.class.emit('default-color')
        break
    }
  }
  


  async ngOnInit() {
    const response = await this.apiService.getHighestId();
    this.id = response + 1;
  }
  
  
}