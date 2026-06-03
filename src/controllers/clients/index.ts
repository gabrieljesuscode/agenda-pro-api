import * as create from './create';
import * as list from './list';
import * as getById from './getById';
import * as update from './update';
import * as deleteById from './deleteById';

export const ClientsController = {
  ...create,
  ...list,
  ...getById,
  ...update,
  ...deleteById,
};
