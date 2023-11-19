import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo';
import { TodosService } from '../services/todos.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo">
      <button
        class="todo-btn"
        aria-label="toggle"
        [ngClass]="todo.completed ? 'todo-btn--completed' : ''"
        (click)="updateTodo()"
      ></button>
      <p
        class="todo-text"
        [ngClass]="todo.completed ? 'todo-text--completed' : ''"
      >
        {{ todo.text }}
      </p>
      <button class="todo-delete-btn" (click)="deleteTodo()">
        <img
          src="../../assets/images/icon-cross.svg"
          alt="Cross icon image to delete a todo"
        />
      </button>
    </div>
  `,
  styles: `
    .todo {
      padding: 2rem 2.4rem;
      display: flex;
      align-items: center;
      box-shadow: inset 0 -0.1rem 0 0 var(--btn-color);
      transition: all 0.3s;
    }

    .todo-btn {
      height: 2.4rem;
      width: 2.4rem;
      margin-right: 2.4rem;
      background: linear-gradient(var(--bg-todo-color), var(--bg-todo-color)) padding-box,
      linear-gradient(var(--btn-color), var(--btn-color)) border-box;
      border: 1px solid transparent;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      transition: all 0.3s;
    }

    .todo-btn:not(.todo-btn--completed):hover, .todo-btn:not(.todo-btn--completed):focus {
      background: linear-gradient(var(--bg-todo-color), var(--bg-todo-color)) padding-box,
      linear-gradient(to bottom right, rgba(85, 221, 255, 1), rgba(192, 88, 243, 1)) border-box;
    }

    .todo-btn--completed {
      background-image: url("../../assets/images/icon-check.svg"), linear-gradient(to bottom right, rgba(85, 221, 255, 1), rgba(192, 88, 243, 1));
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
    }
    
    .todo-text {
      letter-spacing: -0.25px;
      color: var(--text-color-300);
      transition: all 0.3s;
    }
    
    .todo-text--completed {
      text-decoration: line-through;
      color: var(--text-color-600);
    }

    .todo-delete-btn {
      border: none;
      border-radius: 0.5rem;
      background: transparent;
      margin-left: auto;
      cursor: pointer;
      transition: all 0.3s;
    }

    .todo-delete-btn:focus {
      outline: none; 
      box-shadow: 0 0 0.2rem 0.15rem var(--shadow-color);
    }

    .todo-delete-btn img {
      display: block;
    }

    @media (max-width: 40em) {
      .todo {
        padding: 1.6rem 2rem;
      }

      .todo-btn {
        height: 2rem;
        width: 2rem;
        margin-right: 1.2rem;
      }

      .todo-text {
        font-size: 1.2rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
        max-width: 80%;
      }

      .todo-delete-btn img {
        height: 1.2rem;
        width: 1.2rem;
      }
    }
  `,
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  todosService = inject(TodosService);

  updateTodo() {
    this.todosService
      .updateTodo({ ...this.todo, completed: !this.todo.completed })
      .pipe(take(1))
      .subscribe();
  }

  deleteTodo() {
    this.todosService.deleteTodo(this.todo.id!).pipe(take(1)).subscribe();
  }
}
