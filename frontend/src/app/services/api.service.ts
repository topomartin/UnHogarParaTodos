import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = environment.apiBaseUrl;
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public get(path: string): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, this.options).pipe(catchError(err => this.handleError(err)));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.API_URL}${path}`, JSON.stringify(body), this.options).pipe(catchError(err => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error.error?.message || 'Error en la petición';
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    return throwError(error.error);
  }
}
