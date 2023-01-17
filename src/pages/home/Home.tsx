import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { Grid } from 'react-feather';
import { Button, UncontrolledButtonDropdown } from 'reactstrap';

const Home: FunctionComponent<IPageProps> = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="map-options-btn">
        {/* <UncontrolledButtonDropdown>
          <Button color="primary" size="md" onClick={() => {}} className="btn-icon btn-round">
            <Grid size={14} />
          </Button>
        </UncontrolledButtonDropdown> */}
      </div>
    </>
  );
};

export default Home;
