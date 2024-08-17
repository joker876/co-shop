export interface FolderRecord {
  readonly id: number;
  readonly name: string;
  readonly owner: number;
  readonly parent_folder: number;
}