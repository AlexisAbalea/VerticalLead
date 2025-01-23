import { Routes } from '@angular/router';
import { DisplayCodeComponent } from './display-code/display-code.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth/auth.guard';
import { TestPageComponent } from './test-page/test-page.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

export const routes: Routes = [
  { path: 'upload', component: UploadVideoComponent, canActivate: [authGuard] },
  { path: 'code-generated', component: DisplayCodeComponent, canActivate: [authGuard] },
  { path: 'test-page', component: TestPageComponent, canActivate: [authGuard] },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
