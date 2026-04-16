import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";
interface ILoginUser {
  username:string,
  password: string
}

@Injectable()
export class AuthService {
  private currentUser!: ILoginUser ;

  constructor(private apiService: ApiService){}

  login({username, password}: ILoginUser): Observable<any>{
    return this.apiService.post('auth/login',{username,password}).pipe(
        tap((data: any) => {
        this.initSession(data);
      }),
    );
  }

  private initSession(authResult:any){
    localStorage.setItem('access_token', authResult.access_token);
    if (authResult.user) {
      this.currentUser = authResult.user ;
    }
  }
}
