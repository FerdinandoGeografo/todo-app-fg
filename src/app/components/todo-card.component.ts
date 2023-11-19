import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoHeaderComponent } from './todo-header.component';
import { TodoNewComponent } from './todo-new.component';
import { TodoListComponent } from './todo-list.component';
import { TodoOptionsComponent } from './todo-options.component';
import { TodosService } from '../services/todos.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    TodoHeaderComponent,
    TodoNewComponent,
    TodoListComponent,
    TodoOptionsComponent,
  ],
  template: `
    <section class="todo-card">
      <app-todo-header />
      <app-todo-new />

      @if(todos().length > 0) {
      <main class="todo-main">
        <app-todo-list [todos]="filteredTodos()" />
        <app-todo-options [todosLeft]="todosLeft()" />
      </main>
      }
    </section>
  `,
  styles: `
    .todo-card {
      max-width: 54rem;
      margin: 0 auto;
    }

    .todo-main {
      background-color: var(--bg-todo-color);
      border-radius: 0.5rem;
      box-shadow: 0 3.5rem 5rem -1.5rem var(--shadow-color);
      transition: all 0.3s;
    }
  `,
})
export class TodoCardComponent implements OnInit {
  todosService = inject(TodosService);

  get todos() {
    return this.todosService.todos;
  }

  get filteredTodos() {
    return this.todosService.filteredTodos;
  }

  get todosLeft() {
    return this.todosService.todosLeft;
  }

  ngOnInit(): void {
    this.todosService.getTodos().pipe(take(1)).subscribe();
  }
}
