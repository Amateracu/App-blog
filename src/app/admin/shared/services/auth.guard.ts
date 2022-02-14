import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): boolean {
      if (this.auth.isAuthenticated() && !this.auth.tokenIsExpired()) {
        return true
      } else  {
        this.auth.logout()
        this.router.navigate(['/admin','login'], {
          queryParams: {
            loginAgain: true
          }
        })
        return false
      }
  }

}
