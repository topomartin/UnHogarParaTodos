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
  private x_api_key = environment["x-api-key"];

  private getOptions() {
    const token = localStorage.getItem('access_token');

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('x-api-key', this.x_api_key);

    return { headers };
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.API_URL}${path}`, JSON.stringify(body), this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  public patch(path: string, body: object = {}): Observable<any> {
    return this.http.patch(`${this.API_URL}${path}`, JSON.stringify(body), this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.API_URL}${path}`, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
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
