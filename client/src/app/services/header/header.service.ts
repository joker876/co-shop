import { effect, inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderButtonType } from './header-types';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly titleService = inject(Title);

  private readonly _header = signal<string>('CoShop');
  public readonly header = this._header.asReadonly();
  public readonly setHeader = this._header.set;
  public resetHeader() {
    this.setHeader('CoShop');
  }

  private readonly _headerButton = signal<HeaderButtonType>(null);
  public readonly headerButton = this._headerButton.asReadonly();
  public readonly setHeaderButton = this._headerButton.set;

  private readonly _isSidebarOpen = signal<boolean>(false);
  public readonly isSidebarOpen = this._isSidebarOpen.asReadonly();

  public toggleSidebar() {
    this._isSidebarOpen.update(v => !v);
  }

  constructor() {
    // title setter effect
    effect(() => {
      const h = this.header();
      if (h === 'CoShop') {
        this.titleService.setTitle('CoShop');
        return;
      }
      this.titleService.setTitle(`${this.header()} :: CoShop`);
    });
  }
}
