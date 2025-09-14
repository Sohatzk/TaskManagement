import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
export class AuthBaseComponent {
  protected loggedIn: boolean = false;
  protected isLoading: boolean = false;
  protected showPassword: boolean = false;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;

  constructor(
    protected router: Router,
    cookieService: CookieService) {
      const cookie = cookieService.get('user-info');
      if (cookie && cookie != '') {
        this.loggedIn = true;
      }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
