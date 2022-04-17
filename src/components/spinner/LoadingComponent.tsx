import { FunctionComponent } from 'react';
import { Spinner } from 'reactstrap';

export const LoadingComponent: FunctionComponent = () => {
  return (
    <>
      <div className="text-center">
        <Spinner />
      </div>
    </>
  );
};

export default LoadingComponent;
