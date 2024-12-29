import { Assert } from '@assert';
import { ListModel } from '@models/list';
import { ProductModel } from '@models/product';
import { ListResponse } from '@shared/interfaces/list/list';
import { getAuthUserId } from '@utils/user';
import { RequestHandler } from 'express';

export const listHandler: RequestHandler<{ listId: string }, ListResponse> = async (req, res) => {
  if (new Assert(res, req.params, 'listId').exists().isStringNumber().isInteger().isMoreThan(0).isFailed) {
    return;
  }
  const { listId } = req.params;
  const numericListId = Number(listId);

  const userId = getAuthUserId(req);

  const list = (await ListModel.findById(numericListId, userId))?.toPublic();

  if (!list) {
    res.status(404).send({ success: false, error: 'NOT_FOUND_ERR' });
    return;
  }
  const products = (await ProductModel.getProductsByListId(numericListId)).toPublic();

  res.status(200).send({ success: true, list, products });
};
