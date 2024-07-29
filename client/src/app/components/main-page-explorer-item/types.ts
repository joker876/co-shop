

export const ListExplorerItemType = {
  Folder: 'folder',
  List: 'list',
} as const;
export type ListExplorerItemType = typeof ListExplorerItemType[keyof typeof ListExplorerItemType];