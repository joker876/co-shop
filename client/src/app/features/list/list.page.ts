import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArdiumIconButtonModule, ArdiumIconModule } from '@ardium-ui/ui';
import { ListService } from '@services/list/list.service';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { BulletSeparatedList } from 'src/app/components/bullet-separated-list';
import { SmartDatePipe } from 'src/app/pipes/smart-date';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-list',
  imports: [
    BackButtonComponent,
    ArdiumIconButtonModule,
    ArdiumIconModule,
    BulletSeparatedList,
    SmartDatePipe,
    ProductListComponent,
    ProductListComponent,
  ],
  providers: [ListService],
  templateUrl: './list.page.html',
  styleUrl: './list.page.scss',
})
export class ListPage {
  private readonly _listService = inject(ListService);
  private readonly _router = inject(Router);

  readonly listData = this._listService.listData;
  readonly list = computed(() => this.listData.value()?.list);

  navigateToExplorer() {
    this._router.navigate(['/']);
  }
}
