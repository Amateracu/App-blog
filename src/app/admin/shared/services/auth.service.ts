import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthResponse, IUser } from "../form.interface";

@Injectable()

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor (private http: HttpClient ) {}

  get token(): string | null {
    return localStorage.getItem('fb-token')
  }

  tokenIsExpired(): boolean {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string)
    const currentDate = new Date
    return currentDate > expDate
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleErr.bind<any>(this))

    )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleErr(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch(message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный Email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Нет такого Email')
        break
    }
    return throwError(error)
  }

  private setToken(response: IAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear
    }
  }
}
