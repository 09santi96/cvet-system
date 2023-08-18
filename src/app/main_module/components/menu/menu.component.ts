import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Output() closeSideNav = new EventEmitter<void>();
  items: MenuItem[] = [];
  private canAccess: boolean = true;
  private itemsAccess: string[] = [];

  constructor(private userService: UserService){

  }

  ngOnInit() {
      this.items = [
          {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              routerLink: 'dashboard',
              visible: true,
              command: () => {this.onClickButtonClose()}
          },
          {
            label: 'Accesos',
            icon: 'pi pi-fw pi-plus',
            visible: true,
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-user',
                    routerLink: 'users',
                    visible: true,
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Perfiles',
                    icon: 'pi pi-fw pi-id-card',
                    visible: true,
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Veterinarios',
                    icon: 'pi pi-fw pi-github',
                    routerLink: 'vets',
                    visible: true,
                    command: () => {this.onClickButtonClose()}
                },
                {
                    label: 'Legajos',
                    icon: 'pi pi-fw pi-folder-open',
                    visible: true,
                    command: () => {this.onClickButtonClose()}
                }
            ]

        }
      ];

    }

  ngAfterViewInit(): void {
    //this.retrieveDataForCurrentUser();
  }


  retrieveDataForCurrentUser(): void {
    this.userService.getCurrentUserData().subscribe({
      next: (rs) => {
        console.log("perfil id " + rs[0].perfil);
        this.userService.getCurrentPerfilData(rs[0].perfil).subscribe({
          next: (data) => {
            data[0].access.forEach(labelToSearch => {
               // console.log(labelToSearch);
               console.log(this.canAccessToThisMenu(this.items, labelToSearch));
            }); 
          }
        })
      }
    })
  }

  canAccessToThisMenu(items: any[], searchLabel: any): string | null {
      for (const item of items) {
          if (item.label === searchLabel) {
              item.visible = false;
              return item.visible;
          }
          if (item.items) {
              const foundLabel = this.canAccessToThisMenu(item.items, searchLabel);
              if (foundLabel) {
                return foundLabel;
              }
          }
      }
      return null;
  }



  onClickButtonClose() {
    this.closeSideNav.emit();
  }

}