import { Component, OnInit } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  fillerNav = Array.from({length: 20}, (_, i) => `Nav Item ${i + 1}`);

  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [

          {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: 'dashboard'
          },

          {
            label: 'Accesos',
            icon: 'pi pi-fw pi-plus',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-user',
                    routerLink: 'users',
                },
                {
                    label: 'Perfiles',
                    icon: 'pi pi-fw pi-id-card'
                },
                {
                    label: 'Veterinarios',
                    icon: 'pi pi-fw pi-github',
                    routerLink: 'vets',
                },
                {
                    label: 'Legajos',
                    icon: 'pi pi-fw pi-folder-open'
                }
            ]

        }
      ];
  }


}
