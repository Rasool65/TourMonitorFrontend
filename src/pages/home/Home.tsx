import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { RootStateType } from '../../redux/Store';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { CheckSquare, Grid, Mail, MessageSquare, List, Check, X, Circle, Map, MapPin, Navigation } from 'react-feather';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { Button, UncontrolledButtonDropdown } from 'reactstrap';

const Home: FunctionComponent<IPageProps> = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();

  const mapState = useSelector((state: RootStateType) => state.map);
  const getBoolean = (value: any) => (value === 'true' ? true : false);

  const [selected, setSelected] = useState<Number>(0);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <>
      <div className="map-options-btn">
        <UncontrolledButtonDropdown>
          <Button color="primary" size="md" onClick={() => {}} className="btn-icon btn-round">
            <Grid size={14} />
          </Button>
        </UncontrolledButtonDropdown>
      </div>
    </>
  );
};

export default Home;
