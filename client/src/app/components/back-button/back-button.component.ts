import { Component } from '@angular/core';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';

@Component({
  selector: 'app-back-button',
  imports: [ArdiumIconButtonModule, ArdiumIconModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

}
