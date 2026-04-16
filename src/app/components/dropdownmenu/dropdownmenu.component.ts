import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdownmenu.component.html',
  styleUrl: './dropdownmenu.component.css',
  standalone: false
})
export class DropdownmenuComponent {
  isOpen = false;
  constructor(private elRef: ElementRef) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (!this.elRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  menuItems = [
    {
      label: 'Add report',
      link: '/add-reports',
      color: '#f6f6f6',
      stroke: "#0061E0",
      icon: 'report'
    },
    {
      label: 'Add medication',
      link: '/meds',
      color: '#f6f6f6',
      stroke: "#7ED958",
      icon: 'medication'
    },
    {
      label: 'Add notes',
      link: '/notes',
      color: '#f6f6f6',
      stroke: "#0061E0",
      icon: 'notes'
    },
    {
      label: 'Add patient information',
      link: '/patient-info',
      color: '#f6f6f6',
      stroke: "#7ED958",
      icon: 'patient'
    }
  ];
}
