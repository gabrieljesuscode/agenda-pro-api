import * as create from './create';
import * as list from './list';
import * as deleteById from './deleteById';

export const AppointmentsService = {
  ...create,
  ...list,
  ...deleteById,
};
