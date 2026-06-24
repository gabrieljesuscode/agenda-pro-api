import * as create from './create';
import * as list from './list';
import * as deleteById from './deleteById';
import * as update from './update';

export const AppointmentsController = {
  ...create,
  ...list,
  ...deleteById,
  ...update
};
