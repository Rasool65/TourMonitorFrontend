import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { RootStateType } from '../../redux/Store';
import * as L from 'leaflet';
import { createRoutineMachineLayer } from '@src/components/map/RoutingMachine';
import { setRoutingControl } from '@src/redux/reducers/mapReducer';
import { useMap } from '@src/hooks/useMap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_CUSTOMER_LIST } from '@src/configs/apiConfig/apiUrls';
import { ICustomerResultModel } from '@src/models/output/customer/ICustomerResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { CheckSquare, Grid, Mail, MessageSquare } from 'react-feather';
import { Calendar } from 'react-modern-calendar-datepicker';

const Home: FunctionComponent<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const mapState = useSelector((state: RootStateType) => state.map);

  const map = useMap();

  const [mapOptionsModal, setMapOptionsModal] = useState<boolean>(false);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    // map.createRouting(plan1);
  }, [mapState.map]);

  return (
    <>
      <Modal isOpen={mapOptionsModal} toggle={() => setMapOptionsModal(!mapOptionsModal)} className="modal-dialog-centered">
        <ModalHeader toggle={() => setMapOptionsModal(!mapOptionsModal)}>Map Options</ModalHeader>
        <ModalBody>
          <h5>Options</h5>
          Test
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setMapOptionsModal(!mapOptionsModal)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
      <div className="map-options-btn">
        {/* <button
          onClick={() => {
            httpRequest
              .postRequest<IOutputResult<ICustomerResultModel[]>>(APIURL_GET_CUSTOMER_LIST, { touR_ID: '' })
              .then((result) => {
                var d: L.LatLng[] = [];
                result.data.data.map((r) => {
                  d.push(L.latLng(r.locatioN_LATIT, r.locatioN_LONG));
                });
                map.createRouting(d);
              });
          }}
          type="button"
        >
          Set
        </button> */}

        <UncontrolledButtonDropdown>
          <Button color="primary" size="md" onClick={() => setMapOptionsModal(true)} className="btn-icon btn-round">
            <Grid size={14} />
          </Button>
        </UncontrolledButtonDropdown>
      </div>
    </>
  );
};

export default Home;
