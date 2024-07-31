export const NavTabType = {
  Home: '/',
  Favorite: '/favorite',
  SharedWithMe: '/shared',
  Recent: '/recent',
} as const;
export type NavTabType = (typeof NavTabType)[keyof typeof NavTabType];

export class NavTab {
  constructor(
    public readonly type: NavTabType,
    public readonly label: string,
    public readonly icon: string
  ) {}

  public active: boolean = false;
}

export const NAV_TABS: NavTab[] = [
  new NavTab(NavTabType.Home, 'Home', 'home'),
  new NavTab(NavTabType.Favorite, 'Favorite', 'favorite'),
  new NavTab(NavTabType.SharedWithMe, 'Shared with me', 'group'),
  new NavTab(NavTabType.Recent, 'Recent', 'schedule'),
];
