import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  navbarOpen = false;
  isDropdownOpen = false;
  

  constructor() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

}
