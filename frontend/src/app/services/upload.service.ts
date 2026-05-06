import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private apiService: ApiService){}

  uploadImage(modelName:string, elementId: number, files: any){
    const formData = new FormData();
    // IMPORTANTE: el nombre 'files' debe coincidir con FilesInterceptor('files', ...)
    for (const file of files) {
      formData.append('files', file);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    return this.apiService.post(`${modelName}/${elementId}`, formData);
  }
}
