import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArdiumButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { HeaderService } from '@services/header';
import { LocationService } from '@services/location';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, ArdiumIconModule, ArdiumButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  public readonly locationService = inject(LocationService);
  public readonly headerSerivce = inject(HeaderService);
}
