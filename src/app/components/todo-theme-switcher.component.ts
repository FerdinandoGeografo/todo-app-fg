import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="header-theme-btn" (click)="toggleTheme()">
      <img
        [src]="
          '../../assets/images/icon-' +
          (theme() === 'light-mode' ? 'moon' : 'sun') +
          '.svg'
        "
        alt="Icon image to switch theme"
      />
    </button>
  `,
  styles: `
    .header-theme-btn {
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s;
    }

    .header-theme-btn:hover, .header-theme-btn:focus {
      scale: 1.25;
    }

    .header-theme-btn img {
      display: block;
    }

    @media (max-width: 40em) {
      .header-theme-btn img {
        width: 2rem;
      }
    }
  `,
})
export class TodoThemeSwitcherComponent {
  theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark-mode'
      : 'light-mode'
  );

  constructor() {
    effect(() => {
      if (this.theme() === 'light-mode') {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }

      if (this.theme() === 'dark-mode') {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
      }

      localStorage.setItem('theme', this.theme());
    });
  }

  toggleTheme() {
    this.theme.update((theme) =>
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    );
  }
}

type Theme = 'light-mode' | 'dark-mode';
