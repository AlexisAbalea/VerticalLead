import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-menu-layout',
  imports: [SidebarMenuComponent, RouterOutlet],
  templateUrl: './menu-layout.component.html',
  styleUrl: './menu-layout.component.css',
})
export class MenuLayoutComponent {}
