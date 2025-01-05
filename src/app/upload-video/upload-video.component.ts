import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from './store.service';

@Component({
  selector: 'app-upload-video',
  imports: [FormsModule],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css',
})
export class UploadVideoComponent {
  router = inject(Router);
  fileUploadService = inject(StoreService);

  fileToUpload?: File;
  fileName?: string;

  errorMessage: string = '';

  isUploading: boolean = false;

  handleFileInput(event: any) {
    if (!event || event.target?.files?.length === 0) {
      console.log('No file selected for upload.');
      return;
    }

    const file = event.target.files[0];

    if (file.type !== 'video/mp4') {
      console.log('File type is not supported. Only MP4 videos are allowed.');
      this.errorMessage = 'Only MP4 videos are allowed.';
      return;
    }

    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 400) {
      console.log('The selected video file size exceeds the 400 MB limit.');
      this.errorMessage = 'The video size must not exceed 400 MB.';
      return;
    }

    this.fileToUpload = file;
    this.fileName = file.name;
  }

  uploadFile() {
    if (this.fileToUpload) {
      this.isUploading = true;
      this.fileUploadService.uploadVideo(this.fileToUpload).subscribe(
        (data: any) => {
          this.isUploading = false;
          this.router.navigate(['/code-generated', { idVideo: data!.idVideo }]);
        },
        error => {
          console.log('Erreur upload :', error);
          this.isUploading = false;
        },
      );
    }
  }
}
