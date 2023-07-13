import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  fillerNav = Array.from({length: 20}, (_, i) => `Nav Item ${i + 1}`);
  
}
