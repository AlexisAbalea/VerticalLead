import { Routes } from '@angular/router';
import { DisplayCodeComponent } from './display-code/display-code.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

export const routes: Routes = [
  { path: '', component: UploadVideoComponent },
  { path: 'code-generated', component: DisplayCodeComponent },
  { path: '**', component: UploadVideoComponent }
];
