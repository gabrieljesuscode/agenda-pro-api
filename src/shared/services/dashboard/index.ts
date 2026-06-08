import * as getSummary from './getSummary';
import * as upcoming from './upcoming';

export const DashboardService = {
  ...getSummary,
  ...upcoming,
};
