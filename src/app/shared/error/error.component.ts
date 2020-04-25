import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bb-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(private router: Router) {
  }

  TAKASINKOTIO() {
    this.router.navigate(['/']);
  }
}
