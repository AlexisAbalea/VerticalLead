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

  urlFile?: string;
  htmlIFrame?: string;

  ngOnInit(): void {
    const urlFile = this.route.snapshot.paramMap.get('urlFile');
    if (urlFile) {
      this.urlFile = urlFile;
      this.generateIframe(urlFile);
    } else {
      this.goHome();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  generateIframe(urlFile: string) {
    this.htmlIFrame = `<iframe src="${urlFile}" allow="encrypted-media;picture-in-picture;" style="border: none; border-radius: 10px" allowfullscreen="true" height="550" width="297"></iframe>`;
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.htmlIFrame!);
  }
}
