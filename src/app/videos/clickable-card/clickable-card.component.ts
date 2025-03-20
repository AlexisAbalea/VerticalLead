import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-clickable-card',
  imports: [],
  templateUrl: './clickable-card.component.html',
})
export class ClickableCardComponent {
  @Input() title!: string;
  @Input() date!: string;
  @Input() size!: number;
  @Input() duration!: string;

  @Input() link?: string;
  @Input() linkName?: string;

  @Output() cardClick = new EventEmitter<void>();

  onCardClick() {
    this.cardClick.emit();
  }
}
