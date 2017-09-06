import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  private email = '';

  constructor(private http: Http) {}

  getAuthenticatedUser() {
    let authenticated = this.isAuthenticated().subscribe(
      (user: any) => {
        if (user) {
          this.email = user.email;
        }
      },
      (e: any) => {
        console.error(e);
      }
    );
    return this.email;
  }

  isAuthenticated() {
    return this.http
      .get(this.endpoint + 'auth/login-gov/openid/user', { withCredentials: true })
      .map((res: Response) => {
        res.json();
      })
      .catch(this.handleError);
  }

  login(username: string, password: string, type: string) {
    if (type === 'user') {
      localStorage.setItem('currentUser', JSON.stringify({ username: username }));
    } else if (type === 'admin') {
      localStorage.setItem('adminUser', JSON.stringify({ username: username }));
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminUser');
  }

  private handleError(error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      if (error.status !== 401) {
        const body = error.json() || '';
        errors = body.errors;
        return Observable.throw(errors);
      }
    }
    return Observable;
  }
}
