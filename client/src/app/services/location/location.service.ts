import { computed, Injectable, signal } from '@angular/core';
import { NAV_TABS, NavTab, NavTabType } from './location-utils';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly _activeTab = signal<NavTabType | null>(NavTabType.Home);
  public readonly activeTab = this._activeTab.asReadonly();

  public readonly navTabs = computed<NavTab[]>(() =>
    NAV_TABS.map(tab => {
      tab.active = this.activeTab() === tab.type;
      return tab;
    })
  );
}
