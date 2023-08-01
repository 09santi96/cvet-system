import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  fillerNav = Array.from({length: 20}, (_, i) => `Nav Item ${i + 1}`);

  @Output() closeSideNav = new EventEmitter<void>();

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [

          {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: 'dashboard',
              command: () => {this.onClickButtonClose()}
          },

          {
            label: 'Accesos',
            icon: 'pi pi-fw pi-plus',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-user',
                    routerLink: 'users',
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Perfiles',
                    icon: 'pi pi-fw pi-id-card',
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Veterinarios',
                    icon: 'pi pi-fw pi-github',
                    routerLink: 'vets',
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Legajos',
                    icon: 'pi pi-fw pi-folder-open',
                    command: () => {this.onClickButtonClose()}
                }
            ]

        }
      ];
  }

  onClickButtonClose() {
    this.closeSideNav.emit();
  }

}