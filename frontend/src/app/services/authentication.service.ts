import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  gdpr_consent: boolean;
  created_at?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

interface ILoginUser {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: IUser | null = null;

  private userSubject = new BehaviorSubject<IUser | null>(this.getCurrentUser());
  public user$ = this.userSubject.asObservable();

  constructor(private apiService: ApiService) { }

  login({ username, password }: ILoginUser): Observable<void> {
    return this.apiService.post('auth/login', { username, password }).pipe(
      tap((response: any) => {

        const token = response.access_token;
        localStorage.setItem('access_token', token);

        const payload = this.decodeJwt(token);

        const user: IUser = {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
          gdpr_consent: payload.gdpr_consent,
          created_at: payload.created_at,
          updated_at: payload.updated_at,
          deleted_at: payload.deleted_at,
          password: ''
        };
        this.initSession(user);
      })
    );
  }

  register(data: any): Observable<IUser> {
    return this.apiService.post('user/create', data).pipe(
      tap((user: IUser) => {
        this.initSession(user); // opcional: auto login tras registro
      })
    );
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }


  private initSession(user: IUser) {
    this.currentUser = user;
    localStorage.setItem('current_user', JSON.stringify(user));

    this.userSubject.next(user);
  }

  getCurrentUser(): IUser | null {
    if (this.currentUser) return this.currentUser;

    const user = localStorage.getItem('current_user');
    if (user) {
      this.currentUser = JSON.parse(user);
      return this.currentUser;
    }

    return null;
  }


  getUserById(id: number | string): Observable<IUser> {
    const userId = Number(id);
    return this.apiService.get(`user/${userId}`);
  }

  updateProfile(id: number, data: Partial<IUser>) {
    return this.apiService.patch(`user/${id}`, data).pipe(
      tap((updatedUser: IUser) => {
        // actualizar el localStorage
        this.initSession(updatedUser);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('current_user');
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
  }
}
