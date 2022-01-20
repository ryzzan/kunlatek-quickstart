import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
}) export class SignupFormComponent implements OnInit {
    constructor(
        public router: Router,
    ) {}

    ngOnInit(): void {}
}
