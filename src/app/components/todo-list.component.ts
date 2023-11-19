import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <ul class="todo-list">
      @for(todo of todos; track todo.id) {
      <li>
        <app-todo-item [todo]="todo" />
      </li>
      } @empty {
      <li>
        <p class="empty-list-text">No todos found</p>
      </li>
      }
    </ul>
  `,
  styles: `
    .todo-list {
      list-style-type: none;
    }

    .empty-list-text {
      padding: 2rem 2.4rem;
      color: var(--text-color-300);
      letter-spacing: -0.25px;
      box-shadow: inset 0 -0.1rem 0 0 var(--btn-color);
      transition: all 0.3s;
    }

    @media (max-width: 40em) {
      .empty-list-text {
        padding: 1.6rem 2rem;
        font-size: 1.2rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
      }
    }
  `,
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
}
