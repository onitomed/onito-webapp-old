import { Component, ElementRef, HostListener, Input, Output, EventEmitter    } from '@angular/core';

@Component({
  selector: 'app-addbtn',
  templateUrl: './addbtn.component.html',
  styleUrl: './addbtn.component.css',
  standalone: false
})
export class AddbtnComponent {

  isOpen = false;
  @Input() text!: string;
  @Output() btnClick = new EventEmitter()
  constructor(private elRef: ElementRef) {}


  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.btnClick.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (!this.elRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

}