import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../login/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth'; // URL de votre API NestJS

  userConnected?: UserDTO;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<UserDTO>(
        `${environment.urlBackend}/${this.endpoint}/signin`,
        { email, password },
        httpOptions,
      )
      .pipe(
        tap((response: UserDTO) => {
          if (response.accessToken) {
            this.userConnected = response;
            localStorage.setItem('auth_token', response.accessToken);
          }
        }),
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
