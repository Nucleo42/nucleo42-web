import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor() {
    this.consoleLog();
  }

  consoleLog() {
    console.log('FooterComponent not implemented yet');
  }
}
