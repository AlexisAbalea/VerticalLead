import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  storeAccess!: StoreAccess;

  constructor() {
    this.storeAccess = {
      accessKey: environment.accessKey,
      hostname: environment.hostname,
      idLibrary: environment.idLibrary,
      collectionId: environment.collectionId,
    }
  }

  uploadVideo(fileToUpload: File, title: string): Observable<unknown> {
    let idVideo: string;

    return this.createVideoMetadata(title).pipe(switchMap((response: any) => {
      idVideo = response.guid;
      return this.uploadData(idVideo, fileToUpload).pipe(map(() => {
        return {idVideo};
      }));
    }));
  }

  private createVideoMetadata(title: string) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        AccessKey: this.storeAccess.accessKey
      },
    };
    const body = {title: title, collectionId: this.storeAccess.collectionId};
    return this.httpClient.post(`${this.storeAccess.hostname}/${this.storeAccess.idLibrary}/videos`, body, options);
  }

  private uploadData(idVideo: string, fileToUpload: File) {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        AccessKey: this.storeAccess.accessKey,
      }
    };

    return this.httpClient.put(`${this.storeAccess.hostname}/${this.storeAccess.idLibrary}/videos/${idVideo}?skipEncoding=false`, fileToUpload, options);
  }
}
