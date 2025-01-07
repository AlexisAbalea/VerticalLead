import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OptionVideoDto, UploadVideoDto } from './upload-video.dto';

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

  uploadVideo(fileToUploadWithOptions: {
    file: File;
    option?: OptionVideoDto;
  }): Observable<UploadVideoDto> {
    const formdata = new FormData();
    formdata.append('file', fileToUploadWithOptions.file);
    if (fileToUploadWithOptions.option) {
      formdata.append('options', JSON.stringify(fileToUploadWithOptions.option));
    }
    return this.httpClient.post<UploadVideoDto>(
      environment.urlBackend + '/storage/upload',
      formdata,
    );
  }
}
