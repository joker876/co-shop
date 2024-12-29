import { Component, inject } from '@angular/core';
import { ListService } from '@services/list/list.service';

@Component({
  selector: 'app-list',
  imports: [],
  providers: [ListService],
  templateUrl: './list.page.html',
  styleUrl: './list.page.scss'
})
export class ListPage {
  private readonly listService = inject(ListService);
}
