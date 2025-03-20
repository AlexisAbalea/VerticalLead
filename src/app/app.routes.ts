import { Routes } from '@angular/router';
import { DisplayCodeComponent } from './display-code/display-code.component';
import { MenuLayoutComponent } from './layouts/menu-layout/menu-layout.component';
import { NoMenuLayoutComponent } from './layouts/no-menu-layout/no-menu-layout.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth/auth.guard';
import { TestPageComponent } from './test-page/test-page.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { ListVideosComponent } from './videos/list-videos/list-videos.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: UploadVideoComponent, canActivate: [authGuard] },
      { path: 'code-generated', component: DisplayCodeComponent, canActivate: [authGuard] },
      { path: 'test-page', component: TestPageComponent, canActivate: [authGuard] },
      { path: 'videos', component: ListVideosComponent, canActivate: [authGuard] },
    ],
  },
  {
    path: '',
    component: NoMenuLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  { path: '**', redirectTo: 'login' }, // Redirection pour les chemins invalides
];
