import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-code',
  imports: [],
  templateUrl: './display-code.component.html',
})
export class DisplayCodeComponent implements OnInit {
  private router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  idVideo?: string;
  htmlIFrame?: string;

  ngOnInit(): void {
    const idVideo = this.route.snapshot.paramMap.get('idVideo');
    if (idVideo) {
      this.idVideo = idVideo;
      this.generateIframe(idVideo);
    } else {
      this.goHome();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  generateIframe(idVideo: string) {
    this.htmlIFrame = `<iframe src="https://iframe.mediadelivery.net/embed/350451/${idVideo}?loop=false&muted=false&preload=true&responsive=true" allow="encrypted-media;picture-in-picture;" style="border:none; border-radius: 10px;" allowfullscreen="true" width="280" height="500"></iframe>`;
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.htmlIFrame!);
  }
}
