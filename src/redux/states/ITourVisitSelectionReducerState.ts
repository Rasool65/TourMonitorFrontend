import { IVisitResultModel } from './../../models/output/visit/IVisitResultModel';
export interface ITourVisitSelectionReducerState {
  showVisitPanel: boolean;
  visitSelection?: IVisitResultModel;
}
