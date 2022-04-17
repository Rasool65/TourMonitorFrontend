import { setShowVisitPanel } from '@src/redux/reducers/tourVisitSelectionReducer';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { ITourVisitPanelProp } from './ITourVisitPanelProp';

const TourVisitPanel: FunctionComponent<ITourVisitPanelProp> = (prop) => {
  const dispatch = useDispatch();
  if (prop.show) {
    return (
      <div className="visit-panel">
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            dispatch(setShowVisitPanel(false));
          }}
        ></button>
        {prop.children}
      </div>
    );
  }
  return <></>;
};

export default TourVisitPanel;
