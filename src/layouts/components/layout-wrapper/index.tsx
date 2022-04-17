// ** React Imports
import { Fragment, useEffect } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@src/redux/reducers/layoutReducer';
import TourVisitPanel from '@src/components/tour-visit-panel';
import { Col, Row, Table } from 'reactstrap';

// ** Styles
// import 'animate.css/animate.css'

const LayoutWrapper = (props: any) => {
  // ** Props
  const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props;

  // ** Store Vars
  const dispatch = useDispatch();
  const navbarStore = useSelector((state: RootStateType) => state.navbar);
  const contentWidth = useSelector((state: RootStateType) => state.layout).contentWidth;
  const tourVisitSelectionState = useSelector((state: RootStateType) => state.tourVisitSelection);

  //** Vars
  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment;

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth('full'));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden));
      }
    }
  };

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden));
      }
    }
    return () => cleanUp();
  }, []);

  return (
    // <div
    //   className={classnames('app-content content overflow-hidden', {
    //     [wrapperClass]: wrapperClass,
    //     'show-overlay': navbarStore.query.length,
    //   })}
    // >

    <>
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          'container-xxl p-0': contentWidth === 'boxed',
          [`animate__animated animate__${transition}`]: transition !== 'none' && transition.length,
        })}
      >
        <Tag
          /*eslint-disable */
          {...(layout === 'HorizontalLayout' && !appLayout ? { className: classnames({ 'content-body': !appLayout }) } : {})}
          /*eslint-enable */
        >
          {children}
        </Tag>
      </div>

      <TourVisitPanel show={tourVisitSelectionState.showVisitPanel}>
        {tourVisitSelectionState.visitSelection != undefined ? (
          <>
            <p className="header">
              <img src={require('@src/assets/images/elements/store.png')} />
              <div className="info">
                <b>{tourVisitSelectionState.visitSelection.customerNumber}</b>
                <br />
                Lat:{tourVisitSelectionState.visitSelection.locationLat} {'   '} Long:
                {tourVisitSelectionState.visitSelection.locationLong}
              </div>

              <span className="float-end customer-name">واحد صنفی انتخاب شده</span>
            </p>
            <div>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <b>Visit Details:</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="visit-list">
                        {tourVisitSelectionState.visitSelection.visitsDetails.map((d) => {
                          return (
                            <Row>
                              <Col xl={3} xs={12}>
                                Visit Duration: {d.visitDuration}
                              </Col>
                              <Col xl={3} xs={12}>
                                Visit Status: {d.visitStatus}
                              </Col>
                              <Col xl={3} xs={12}>
                                Visit Start: {d.visitStart}
                              </Col>
                              <Col xl={3} xs={12}>
                                Division: {d.division}
                              </Col>
                            </Row>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <>d</>
        )}
      </TourVisitPanel>
    </>
  );
};

export default LayoutWrapper;
