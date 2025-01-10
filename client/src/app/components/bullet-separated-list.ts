import { Component, input } from '@angular/core';
import { ArdiumTextListModule } from '@ardium-ui/ui';
import { ListService } from '@services/list/list.service';

@Component({
  selector: 'app-bullet-separated-list',
  imports: [ArdiumTextListModule],
  providers: [ListService],
  template: '<ard-text-list separator=" • " filter [values]="values()" />',
})
export class BulletSeparatedList {
  readonly values = input.required<any[]>();
}
