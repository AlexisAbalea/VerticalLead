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

  scriptToCopy?: string;
  divVerticalPlayer = `<div id="vertical-player"></div>`;

  ngOnInit(): void {
    const idVideo = this.route.snapshot.paramMap.get('idVideo');
    if (idVideo) {
      this.generateScript(idVideo);
    } else {
      this.goHome();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  generateScript(idVideo: string) {
    this.scriptToCopy = `<script src="player-vertical.js" data-video-id="${idVideo}"></script>`;
  }

  copyClipboard(code: string) {
    navigator.clipboard.writeText(code);
  }
}
