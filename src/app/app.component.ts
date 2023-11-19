import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './components/todo-card.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, FooterComponent],
  template: `
    <main class="main">
      <app-todo-card />
    </main>

    <app-footer></app-footer>
  `,
  styles: `
    .main {
      padding: 7rem 0 11.5rem 0;
      
      background-image: var(--bg-desktop-image);
      background-position: top center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: var(--bg-color);
      
      transition: all 0.3s;
      min-height: 100vh;
    }

    @media (max-width: 40em) {
      .main {
        padding: 4.8rem 2.4rem;
        background-image: var(--bg-mobile-image);
      }
    }
  `,
})
export class AppComponent {}
