import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from '../shared/services/store.service';


@Component({
  selector: 'app-upload-video',
  imports: [FormsModule],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent {
  router = inject(Router);
  fileUploadService = inject(StoreService);

  fileToUpload?: File;
  fileName?: string;

  errorMessage: string = '';

  handleFileInput(event: any) {
    if (!event || event.target?.files?.length === 0) {
      console.log('No file selected for upload.')
      return;
    }

    const file = event.target.files[0];

    if (file.type !== 'video/mp4') {
      console.log('File type is not supported. Only MP4 videos are allowed.')
      this.errorMessage = 'Only MP4 videos are allowed.';
      return;
    }

    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 400) {
      console.log('The selected video file size exceeds the 400 MB limit.')
      this.errorMessage = 'The video size must not exceed 400 MB.';
      return;
    }

    this.fileToUpload = file;
    this.fileName = file.name;
  }

  uploadFileToActivity() {
    if (this.fileToUpload) {
      const title :string = "video_"+uuidv4();
      this.fileUploadService.uploadVideo(this.fileToUpload, title).subscribe((data: any) => {
        this.router.navigate(['/code-generated', {idVideo: data!.idVideo}]);
        }, error => {
          console.log('Erreur upload :', error);
        });
    }
  }
}
