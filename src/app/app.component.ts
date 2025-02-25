import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, LayoutComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'forty-two-web';
}
