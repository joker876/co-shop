import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '@services/header/header.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

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
