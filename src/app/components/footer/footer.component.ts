import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  providers: [MatIconRegistry],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('linkedIn', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/linkedin.svg'));
    this.matIconRegistry.addSvgIcon('gitHub', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/github.svg'));
    this.matIconRegistry.addSvgIcon('discord', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/discord.svg'));
  }

  handleClick(platform: string) {
    switch (platform) {
      case 'linkedin':
        window.open('https://linkedin.com', '_blank');
        break;
      case 'github':
        window.open('https://github.com', '_blank');
        break;
      case 'discord':
        window.open('https://discord.com', '_blank');
        break;
      default:
        console.log('Unknown platform');
    }
  }
}
