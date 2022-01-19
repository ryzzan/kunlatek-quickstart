import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('tokenToRegister')) {
      this.router.navigate(['/login']);
    }
  }

}
