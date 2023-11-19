import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by
        <a
          href="https://www.linkedin.com/in/ferdinandogeografo/"
          target="_blank"
          >Ferdinando Geografo</a
        >.
      </div>
    </footer>
  `,
  styles: `
    .footer {
      padding: 2rem 0;
      background-color: var(--bg-color);
      transition: all 0.3s;
    }

    .attribution {
      color: var(--text-color-400);
      text-align: center;
    }

    .attribution a:link, .attribution a:visited {
      text-decoration: none;
      font-weight: 700;
      letter-spacing: -0.19px;
      color: var(--text-color-300);
      transition: all 0.3s;
    }

    .attribution a:hover, .attribution a:active {
      color: var(--text-color-500);
    }

    @media (max-width: 40em) {
      .footer {
        padding: 1.6rem 0;
      }

      .attribution, .attribution a:link, .attribution a:visited  {
        font-size: 1rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
      }
    }
  `,
})
export class FooterComponent {}
