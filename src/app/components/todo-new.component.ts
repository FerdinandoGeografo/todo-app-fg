import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../services/todos.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../models/todo';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="newTodoForm"
      class="input-wrapper"
      (ngSubmit)="onSubmit()"
    >
      <input
        class="todo-checkbox"
        type="checkbox"
        formControlName="completed"
      />
      <input
        class="todo-input"
        type="text"
        placeholder="Create a new todo..."
        formControlName="text"
      />
    </form>
  `,
  styles: `
    .input-wrapper {
      padding: 2rem 2.4rem;
      margin-bottom: 2.4rem;
      display: flex;
      gap: 2.4rem;
      align-items: center;
      background-color: var(--bg-todo-color);
      border-radius: 0.5rem;
      box-shadow: 0 3.5rem 5rem -1.5rem var(--shadow-color);
      transition: all 0.3s;
    }

    .input-wrapper.ng-invalid.ng-touched.ng-dirty {
      box-shadow: 0 0 0.6rem 0.2rem var(--error-color);
    }

    .todo-checkbox {
      appearance: none;
      height: 2.4rem;
      width: 2.4rem;
      background: linear-gradient(var(--bg-todo-color), var(--bg-todo-color)) padding-box,
      linear-gradient(var(--btn-color), var(--btn-color)) border-box;
      border: 1px solid transparent;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      transition: all 0.3s;
    }

    .todo-checkbox:hover, .todo-checkbox:focus {
      background: linear-gradient(var(--bg-todo-color), var(--bg-todo-color)) padding-box,
      linear-gradient(to bottom right, rgba(85, 221, 255, 1), rgba(192, 88, 243, 1)) border-box;
    }

    .todo-checkbox:checked {
      background-image: url("../../assets/images/icon-check.svg"), linear-gradient(to bottom right, rgba(85, 221, 255, 1), rgba(192, 88, 243, 1));
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
    }

    .todo-input {
      width: 90%;
      border: none;
      outline: none;
      background: transparent;
      color: var(--text-color-100);
      font-family: inherit;
      font-size: inherit;
      line-height: 1.9rem;
      letter-spacing: -0.25px;
      transition: all 0.3s;
    }

    .todo-input::placeholder {
      color: var(--text-color-200);
    }

    @media (max-width: 40em) {
      .input-wrapper {
        padding: 1.4rem 2rem;
        margin-bottom: 1.6rem;
        gap: 1.2rem;
      }

      .todo-checkbox {
        height: 2rem;
        width: 2rem;
      }

      .todo-input {
        font-size: 1.2rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
      }
    }
  `,
})
export class TodoNewComponent {
  todosService = inject(TodosService);
  fb = inject(FormBuilder);

  newTodoForm = this.fb.group({
    completed: new FormControl(false),
    text: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  onSubmit() {
    if (this.newTodoForm.invalid) return;

    this.todosService
      .createTodo(this.newTodoForm.value as Todo)
      .pipe(
        take(1),
        tap(() => this.newTodoForm.reset({ completed: false, text: '' }))
      )
      .subscribe();
  }
}
