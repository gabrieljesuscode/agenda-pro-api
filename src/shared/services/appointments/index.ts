import * as create from './create';
import * as list from './list';

export const appointmentsService = {
  ...create,
  ...list,
};
