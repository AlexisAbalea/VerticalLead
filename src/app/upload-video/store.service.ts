import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StoreAccess {
  accessKey: string;
  hostname: string;
  idLibrary: string;
  collectionId: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  httpClient = inject(HttpClient);

  uploadVideo(fileToUpload: File): Observable<unknown> {
    const formdata = new FormData();
    formdata.append('file', fileToUpload);
    return this.httpClient.post(environment.urlBackend + '/storage/upload', formdata);
  }
}
