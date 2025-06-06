import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from './store.service';
import { OptionVideoDto, UploadVideoDto } from './upload-video.dto';

@Component({
  selector: 'app-upload-video',
  imports: [FormsModule, CommonModule],
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

  addButton: boolean = false;

  redirectLink: string = '';

  buttonLabel: string = '';

  videoInMemory: string | null = null;

  buttonPosition: string = 'top-left';

  buttonColor: string = '#000000';

  handleFileInput(event: any) {
    if (!event || event.target?.files?.length === 0) {
      return;
    }

    const file = event.target.files[0];

    if (file.type !== 'video/mp4') {
      this.errorMessage = 'Only MP4 videos are allowed.';
      return;
    }

    const fileSize = file.size / 1024 / 1024;
    if (fileSize > 400) {
      this.errorMessage = 'The video size must not exceed 400 MB.';
      return;
    }

    this.fileToUpload = file;
    this.fileName = file.name;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.videoInMemory = fileReader.result as string; // URL temporaire de la vidéo
    };

    fileReader.readAsDataURL(file);
  }

  uploadFile() {
    if (this.fileToUpload) {
      this.isUploading = true;
      let optionVideoDto: OptionVideoDto | undefined;
      if (this.addButton) {
        optionVideoDto = new OptionVideoDto(
          this.buttonLabel,
          this.redirectLink,
          this.buttonPosition,
          this.buttonColor,
        );
      }
      this.fileUploadService
        .uploadVideo({ file: this.fileToUpload, option: optionVideoDto })
        .subscribe({
          next: (data: UploadVideoDto) => {
            this.isUploading = false;
            this.router.navigate(['/code-generated', { idVideo: data!.idVideo }]);
          },
          error: error => {
            console.log('Erreur upload :', error);
            this.isUploading = false;
          },
        });
    }
  }
}
