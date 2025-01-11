import { Assert } from '@assert';
import { ProductModel } from '@models/product';
import { RequestHandler } from 'express';
import { SetCheckedRequest, SetCheckedResponse } from './../../../../shared/interfaces/product/set-checked';

export const setCheckedHandler: RequestHandler<null, SetCheckedResponse, SetCheckedRequest> = async (req, res) => {
  if (
    new Assert(res, req.body, 'productId').exists().isNumber().isInteger().isMoreThan(0).isFailed ||
    new Assert(res, req.body, 'checked').exists().isBoolean().isFailed
  ) {
    return;
  }
  const { productId, checked } = req.body;
  const numericProductId = Number(productId);

  const product = await ProductModel.findById(numericProductId);

  if (!product) {
    res.status(404).send({ success: false, error: 'NOT_FOUND_ERR' });
    return;
  }

  await ProductModel.setProductChecked(numericProductId, checked);

  res.status(200).send({ success: true });
};
