import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CardVideo } from './list-videos/list-videos.component';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  httpClient = inject(HttpClient);

  getVideos(): Observable<any> {
    return this.httpClient.get<CardVideo[]>(environment.urlBackend + '/videos');
  }
}
