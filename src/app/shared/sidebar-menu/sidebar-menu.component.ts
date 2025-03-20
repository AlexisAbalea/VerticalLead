import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule],
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent {
  isMenuOpen = false;

  menuItems = [
    { label: 'Upload', link: '/upload' },
    { label: 'My Videos', link: '/videos' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
