import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '@services/header';
import { HeaderComponent } from 'src/app/components/header';

@Component({
  selector: 'app-app-container',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  providers: [HeaderService],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

}
