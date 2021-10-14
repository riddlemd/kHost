import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form: FormGroup;

    showError: boolean = false;

    constructor(
      private _authService: AuthService,
      private _router: Router
    ) {
      this.form = new FormGroup({
          'username': new FormControl(undefined, Validators.required),
          'password': new FormControl(undefined, Validators.required)
      });
    }

    async login(): Promise<void> {
        this.showError = false;
        const username = this.form.get("username")?.value;
        const password = this.form.get("password")?.value;

        if (!username || !password) return;

        const authenticated = await this._authService.authenticate(username, password);

        if(authenticated) {
          console.info("BAM!");
          this._router.navigateByUrl('/');
        } else {
          this.showError = true;
        }
    }
}
