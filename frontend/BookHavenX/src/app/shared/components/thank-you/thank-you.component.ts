import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  countdown: number = 5;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startCountdown();
  }


  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.router.navigate(['/']);
        clearInterval(interval);
      }
    }, 1000);
  }
}
