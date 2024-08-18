export interface ListRecord {
  readonly id: number;
  readonly name: string;
  readonly shop: string | null;
  readonly date: Date | null;
  readonly owner: number;
  readonly parent_folder: number | null;
}