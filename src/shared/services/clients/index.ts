import * as create from './create';
import * as getById from './getById';
import * as update from './update';
import * as deleteById from './deleteById';
import * as list from './list';

export const ClientsService = {
  ...create,
  ...list,
  ...getById,
  ...update,
  ...deleteById,
};
