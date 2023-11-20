import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoOption } from '../models/todo-option';
import { TodosService } from '../services/todos.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-todo-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="options-container">
      <p class="todos-left">{{ todosLeft }} items left</p>
      <ul class="main-options">
        @for(option of todoOptions; track $index) {
        <li>
          <button
            class="option-btn option-btn--primary"
            [ngClass]="{ active: option === selectedOption() }"
            (click)="onSelectOption(option)"
          >
            {{ option | titlecase }}
          </button>
        </li>
        }
      </ul>
      <button
        class="option-btn option-btn--secondary"
        (click)="onClearCompleted()"
      >
        Clear completed
      </button>
    </div>
  `,
  styles: `
    .options-container {
      padding: 1.6rem 2.4rem 1.6rem 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .todos-left {
      font-size: 1.4rem;
      line-height: 1.4rem;
      letter-spacing: -0.19px; 
      color: var(--text-color-400);
      transition: all 0.3s;
    }

    .main-options {
      list-style-type: none;
      display: flex;
      gap: 1.9rem;
    }

    .main-options li {
      height: 1.4rem;
    }

    .option-btn {
      border: none;
      outline: none;
      background: transparent;
      color: var(--text-color-400);
      font-family: inherit;
      font-size: 1.4rem;
      line-height: 1.4rem;
      letter-spacing: -0.19px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .option-btn--primary {
      font-weight: 700;
    }

    .option-btn--secondary {
      font-weight: 400;
    }

    .option-btn:hover, .option-btn:focus {
      color: var(--text-color-500);
    }

    .active {
      color: rgba(58, 124, 253, 1);
    }

    @media (max-width: 40em) {
      .options-container {
        padding: 1.6rem 2rem 2.2rem 2rem;
        position: relative;
      }

      .todos-left, .option-btn--secondary {
        font-size: 1.2rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
      }

      .main-options {
        width: 100%;
        position: absolute;
        right: 0;
        bottom: calc(-100% - 1.6rem);

        justify-content: center;
        padding: 1.5rem 0 1.9rem 0;
        background-color: var(--bg-todo-color);
        border-radius: 0.5rem;
        box-shadow: 0 3.5rem 5rem -1.5rem var(--shadow-color);
        transition: all 0.3s;
        z-index: 1;
      }
    }
  `,
})
export class TodoOptionsComponent {
  @Input({ required: true }) todosLeft!: number;

  todosService = inject(TodosService);

  get selectedOption() {
    return this.todosService.selectedOption;
  }

  todoOptions: TodoOption[] = ['all', 'active', 'completed'];

  onSelectOption(option: TodoOption) {
    this.todosService.selectTodoOption(option);
  }

  onClearCompleted() {
    this.todosService.clearCompletedTodo().pipe(take(1)).subscribe();
  }
}
