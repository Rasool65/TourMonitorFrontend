import { Fragment, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@src/redux/reducers/layoutReducer';

const LayoutWrapper = (props: any) => {
  const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props;
  const dispatch = useDispatch();
  const contentWidth = useSelector((state: RootStateType) => state.layout).contentWidth;

  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment;

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
