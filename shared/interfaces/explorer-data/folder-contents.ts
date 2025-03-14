import { Folder } from '../folder/folder';
import { List } from '../list/list';
import { BodyParamErrorResponse, GotExpectedBodyParamErrorResponse } from '../request-param-errors';
import { SuccessResponse } from '../success';

export interface FolderContentsRequestParams {
  parentFolderId: string | '';
}
export interface FolderContentsSuccessResponse extends SuccessResponse {
  folders: Folder[];
  lists: List[];
}
export type FolderContentsResponse =
  | FolderContentsSuccessResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;
