import { ApiService } from './../../../services/api.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AdminPageService {

  constructor(private apiService: ApiService){}

  list(moduleName:string, filter:any){
    return this.apiService.post(`${moduleName}`,filter);
  }
  update(moduleName:string, data:any){
    return this.apiService.patch(`${moduleName}/${data.id}`,data);
  }
  delete(moduleName:string, data:any){
    return this.apiService.delete(`${moduleName}/${data.id}`);
  }
}
