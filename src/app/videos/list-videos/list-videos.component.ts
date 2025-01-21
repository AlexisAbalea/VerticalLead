import { Component, inject, OnInit } from '@angular/core';
import { ClickableCardComponent } from '../clickable-card/clickable-card.component';
import { VideoService } from '../video.service';

export interface CardVideo {
  title: string;
  date: string;
  size: number;
  duration: string;
  link?: string;
  linkName?: string;
}

@Component({
  selector: 'app-list-videos',
  imports: [ClickableCardComponent],
  templateUrl: './list-videos.component.html',
})
export class ListVideosComponent implements OnInit {
  videoService = inject(VideoService);

  cards: CardVideo[] = [];
  //   {
  //     title: 'Introduction to Angular',
  //     date: '2023-01-15',
  //     size: 12,
  //     duration: '30',
  //     link: 'https://example.com/angular-intro',
  //     linkName: 'Watch now',
  //   },
  //   {
  //     title: 'Advanced TypeScript',
  //     date: '2023-01-16',
  //     size: 8,
  //     duration: '45',
  //     link: 'https://example.com/advanced-ts',
  //     linkName: 'Watch now',
  //   },
  //   {
  //     title: 'RxJS in Depth',
  //     date: '2023-01-17',
  //     size: 10,
  //     duration: '20',
  //   },
  //   {
  //     title: 'State Management with NgRx',
  //     date: '2023-01-18',
  //     size: 15,
  //     duration: '50',
  //     link: 'https://example2.com/ngrx-state',
  //     linkName: 'Watch now',
  //   },
  //   {
  //     title: 'Building Progressive Web Apps',
  //     date: '2023-01-19',
  //     size: 20,
  //     duration: '60',
  //   },
  //   {
  //     title: 'Unit Testing in Angular',
  //     date: '2023-01-20',
  //     size: 18,
  //     duration: '40',
  //     link: 'https://example2.com/unit-testing',
  //     linkName: 'Watch now',
  //   },
  //   {
  //     title: 'Angular Performance Optimization',
  //     date: '2023-01-21',
  //     size: 22,
  //     duration: '35',
  //     link: 'https://example2.com/performance',
  //     linkName: 'Watch now',
  //   },
  //   {
  //     title: 'Deploying Angular Applications',
  //     date: '2023-01-22',
  //     size: 25,
  //     duration: '55',
  //     link: 'https://example2.com/deploying',
  //     linkName: 'Watch now',
  //   },
  // ];

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(videos => {
      this.cards = videos;
    });
  }

  onCardClick(card: any) {}
}
