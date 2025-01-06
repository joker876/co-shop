import { Component, inject } from '@angular/core';
import { ListService } from '@services/list/list.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-list',
  imports: [BackButtonComponent],
  providers: [ListService],
  templateUrl: './list.page.html',
  styleUrl: './list.page.scss'
})
export class ListPage {
  private readonly listService = inject(ListService);
}
