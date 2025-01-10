import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { ListService } from '@services/list/list.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { BulletSeparatedList } from 'src/app/components/bullet-separated-list';
import { SmartDatePipe } from 'src/app/pipes/smart-date';

@Component({
  selector: 'app-list',
  imports: [BackButtonComponent, ArdiumIconButtonModule, ArdiumIconModule, BulletSeparatedList, SmartDatePipe],
  providers: [ListService],
  templateUrl: './list.page.html',
  styleUrl: './list.page.scss',
})
export class ListPage {
  private readonly _listService = inject(ListService);
  private readonly _router = inject(Router);

  readonly listData = this._listService.listData;

  navigateToExplorer() {
    this._router.navigate(['/']);
  }
}
