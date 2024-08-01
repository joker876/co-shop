export const ListExplorerItemType = {
  Folder: 'folder',
  List: 'list-alt',
} as const;
export type ListExplorerItemType = (typeof ListExplorerItemType)[keyof typeof ListExplorerItemType];
