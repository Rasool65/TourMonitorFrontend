// ** React Imports
import { Fragment, useEffect } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@src/redux/reducers/layoutReducer';

import { Col, Row, Table } from 'reactstrap';

// ** Styles
// import 'animate.css/animate.css'

const LayoutWrapper = (props: any) => {
  // ** Props
  const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props;

  // ** Store Vars
  const dispatch = useDispatch();
  const contentWidth = useSelector((state: RootStateType) => state.layout).contentWidth;

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
    </>
  );
};

export default LayoutWrapper;
