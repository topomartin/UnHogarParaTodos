import { ApiService } from './../../../services/api.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AdminPageService {

  constructor(private apiService: ApiService){}

  list(modelName:string, filter:any){
    return this.apiService.post(`${modelName}`,filter);
  }
  create(modelName:string, data:any){
    return this.apiService.post(`${modelName}/create`,data);
  }
  update(modelName:string, data:any){
    if (modelName == 'animal-requests' && ['approved', 'rejected'].includes(data.status)){
      //URL ex: "animal-requests/1/aprove" or "animal-requests/1/rject"
      //data valueex: {id: 1, status: aproved} or {id: 1, status: rejected}
      const statusMap: Record<string, string> = {
        approved: 'approve',
        rejected: 'reject'
      };
      const url = `${modelName}/${data.id}/${statusMap[data.status]}`;
      return this.apiService.patch(url,data);
    }
    return this.apiService.patch(`${modelName}/${data.id}`,data);
  }
  delete(modelName:string, data:any){
    return this.apiService.delete(`${modelName}/${data.id}`);
  }


  //SCHEMAS (Grid, create and update)
  getGridSchema(modelName:string){
    return this.apiService.get(`${modelName}/schema/gridSchema`);
  }
  getCreateSchema(modelName:string){
    return this.apiService.get(`${modelName}/schema/createSchema`);
  }
  getUpdateSchema(modelName:string){
    return this.apiService.get(`${modelName}/schema/updateSchema`);
  }
  getInfoSchema(modelName:string){
    return this.apiService.get(`${modelName}/schema/infoSchema`);
  }
}
