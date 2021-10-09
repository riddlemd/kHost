import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tsa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form: FormGroup;

    constructor() {
      this.form = new FormGroup({
          'email': new FormControl(null, Validators.required),
          'password': new FormControl(null, Validators.required)
      });
    }

    login(): void {
        const email = this.form.get("email")?.value;
        const password = this.form.get("password")?.value;

        if (!email || !password) return;
    }
}
