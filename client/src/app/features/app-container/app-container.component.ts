import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '@services/header';
import { HeaderComponent } from 'src/app/components/header';
import { SidebarComponent } from 'src/app/components/sidebar';

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent],
  providers: [HeaderService],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

}
