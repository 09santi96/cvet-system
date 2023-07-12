import { Component, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth_module/services/user.service';
import {NgIf, NgFor} from '@angular/common';
import {MediaMatcher} from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnDestroy  {

  constructor(
    private userService: UserService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('mySidenav') sidenav: any;

  fillerNav = Array.from({length: 20}, (_, i) => `Nav Item ${i + 1}`);


  fillerContent = Array.from(
    {length: 10},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua.`,
  );

  OnToggleMenu(): void {
    if (this.sidenav) {
      if (this.sidenav.opened) {
        this.sidenav.close();
      } else {
        this.sidenav.open(); 
      }
    }
  }

  onMouseLeave(): void {
    setTimeout(() => {
      this.sidenav.close();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onLogout(): void {

 /*    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));*/
  } 


}
