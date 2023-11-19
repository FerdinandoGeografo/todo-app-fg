import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoThemeSwitcherComponent } from './todo-theme-switcher.component';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [CommonModule, TodoThemeSwitcherComponent],
  template: `
    <header class="header">
      <h1 class="header-title">TODO</h1>
      <app-todo-theme-switcher />
    </header>
  `,
  styles: `
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4rem;
    }

    .header-title {
      color: rgba(255, 255, 255, 1);
      font-size: 4rem;
      font-weight: 700;
      line-height: 4rem;
      letter-spacing: 1.5rem;
    }

    @media (max-width: 40em) {
      .header-title {
        font-size: 2.5rem;
        line-height: 2rem;
        letter-spacing: 1.3rem;
      }
    }
  `,
})
export class TodoHeaderComponent {}
