export const ExplorerItemType = {
  Folder: 'folder',
  List: 'list-alt',
} as const;
export type ExplorerItemType = (typeof ExplorerItemType)[keyof typeof ExplorerItemType];
