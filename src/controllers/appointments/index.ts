import * as create from './create';
import * as list from './list';
import * as deleteById from './deleteById';

export const AppointmentsController = {
  ...create,
  ...list,
  ...deleteById,
};
