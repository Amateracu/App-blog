import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IUser } from '../shared/form.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;
  public submitted = false;
  public message!: string;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(params.loginAgain) {
        this.message = 'Пожалуйста, введите данные'
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заново'
      }
    })
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,

    }

    this.auth.login(user)
    .pipe(
      catchError((error) => {
        this.submitted = false
        return error
      })
    )
    .subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    })
  }

}
