import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
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

  constructor(private apiService: ApiService){}

  login({username, password}: ILoginUser): Observable<IUser>{
    return this.apiService.post('auth/login',{username,password}).pipe(
        tap((user: IUser) => {
        this.initSession(user);
      }),
    );
  }

  register(data: any): Observable<IUser> {
    return this.apiService.post('user/create', data).pipe(
      tap((user: IUser) => {
        this.initSession(user); // opcional: auto login tras registro
      })
    );
  }


  private initSession(user: IUser) {
    this.currentUser = user;
    localStorage.setItem('current_user', JSON.stringify(user));

    
    //localStorage.setItem('access_token', authResult.access_token);
    /*if (authResult.user) {
      this.currentUser = authResult.user ;
    }*/
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
    // localStorage.removeItem('access_token'); // si usas JWT
  }
}
