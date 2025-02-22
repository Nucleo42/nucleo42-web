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
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/twitterIcon.svg'));
    this.matIconRegistry.addSvgIcon('linkedIn', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/linkedInIcon.svg'));
    this.matIconRegistry.addSvgIcon('gitHub', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/gitHubIcon.svg'));
    this.matIconRegistry.addSvgIcon('discord', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/discordIcon.svg'));
  }

  handleClick(platform: string) {
    switch (platform) {
      case 'twitter':
        window.open('https://twitter.com', '_blank');
        break;
      case 'linkedIn':
        window.open('https://linkedin.com', '_blank');
        break;
      case 'gitHub':
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
