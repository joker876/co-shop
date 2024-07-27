import { Component, inject } from '@angular/core';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ArdiumIconButtonModule, ArdiumIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly headerService = inject(HeaderService);

}
