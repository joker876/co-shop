import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { HeaderService } from '@services/header';
import { NavTabType } from '@services/location';

@Component({
    selector: 'app-header',
    imports: [RouterModule, ArdiumIconButtonModule, ArdiumIconModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly headerService = inject(HeaderService);

  public readonly homeTab = NavTabType.Home;
}
