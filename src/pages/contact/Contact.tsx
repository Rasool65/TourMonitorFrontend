import { FunctionComponent, useEffect } from 'react';
import IPageProps from '../../configs/routerConfig/IPageProps';

const Contact: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div>ارتباط با ما</div>
    </>
  );
};

export default Contact;
