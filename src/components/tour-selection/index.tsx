import { usePersianDate } from '@src/hooks/usePersianDate';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'react-feather';
import { Calendar } from 'react-modern-calendar-datepicker';
import useHttpRequest from '@src/hooks/useHttpRequest';
import * as L from 'leaflet';
import { useToast } from '@src/hooks/useToast';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Col,
  Input,
  InputGroup,
  Modal,
} from 'reactstrap';
import TourSelectionModal from '../tour-selection-modal';
import {
  APIURL_FAVORITE_DRIVERS,
  APIURL_GET_CUSTOMER_LIST,
  APIURL_GET_DRIVER_LOCATION_DATA,
  APIURL_GET_MAP_ROUTING_SETTING,
  APIURL_GET_VISIT_DATA,
} from '@src/configs/apiConfig/apiUrls';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IFavouriteTour } from '@src/models/output/tour/IFavouriteTour';
import LoadingComponent from '../spinner/LoadingComponent';
import { IFavouriteDriverModel } from '@src/models/output/tour/IFavouriteDriverModel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { dateSplitFormat, today, todayObject } from '@src/utility/helpers/dateHelper';
import { useMap } from '@src/hooks/useMap';
import { ICustomerResultModel } from '@src/models/output/customer/ICustomerResultModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import { setSelectedTour } from '@src/redux/reducers/mapReducer';
import IDriverResultModel from '@src/models/output/driver/IDriverResultModel';
import TourUpdateLocation from '../tour-update-location';
import { IVisitResultModel } from '@src/models/output/visit/IVisitResultModel';
import { setVisitData } from '@src/redux/reducers/cacheDataReducer';
import { IMapRoutingSettingModel } from '@src/models/output/setting/IMapRoutingSettingModel';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

const polyline = require('@mapbox/polyline');

const TourSelection: FunctionComponent = (props) => {
  const maxDate = todayObject();
  const map = useMap();
  const httpRequest = useHttpRequest();
  const toast = useToast();
  const mapState = useSelector((state: RootStateType) => state.map);
  const commandState = useSelector((state: RootStateType) => state.command);
  const [open, setOpen] = useState<any>('1');
  const dateTime = usePersianDate();
  const [selectedDay, setSelectedDay] = useState<any>(todayObject());
  const [tourSelectionModal, setTourSelectionModal] = useState<boolean>(false);
  const [loadingTour, setLoadingTour] = useState<boolean>(false);
  const [tourData, setTourData] = useState<IFavouriteTour[]>([]);
  const localStorage = useLocalStorage();

  const routeState = useSelector((state: RootStateType) => state.route);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tourSelectionModal) loadFavouriteDrivers();
  }, [tourSelectionModal]);

  useEffect(() => {
    prepareTourSelection();
  }, [mapState.selectedTour]);

  useEffect(() => {
    loadFavouriteDrivers();
  }, [selectedDay]);

  useEffect(() => {
    loadFavouriteDrivers();
  }, [commandState.refreshFavouriteDriversTrigger]);

  useEffect(() => {
    prepareTourSelection();
  }, [routeState.planned, routeState.driver, routeState.actual]);

  const toggle = (id: any) => {
    open === id ? setOpen('') : setOpen(id);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showDate, setShowDate] = useState<string>(today());
  const dateToggle = () => {
    setOpenModal(!openModal);
  };

  const selectDate = (date: any) => {
    const { year, month, day } = date;
    !!date ? setShowDate(dateSplitFormat(year, month, day)) : '';
    setSelectedDay(date);
    setOpenModal(false);
  };

  const handleShowSelectTourModal = () => {
    setTourSelectionModal(!tourSelectionModal);
  };

  const loadFavouriteDrivers = () => {
    setLoadingTour(true);
    if (selectedDay != undefined && selectedDay != '') {
      httpRequest
        .getRequest<IOutputResult<IFavouriteTour[]>>(
          APIURL_FAVORITE_DRIVERS,
          function () {
            toast.showError('خطایی در دریافت اطلاعات رانندگان روی داده است');
            setLoadingTour(false);
          },
          { params: { date: dateSplitFormat(selectedDay.year, selectedDay.month, selectedDay.day, '-') } }
        )
        .then((result) => {
          setTourData(result.data.data);
          setLoadingTour(false);
        });
    }
  };

  const handleSelectTour = (selected: IFavouriteDriverModel) => {
    dispatch(setSelectedTour(selected));
  };

  const prepareTourSelection = () => {
    httpRequest.getRequest<IOutputResult<IMapRoutingSettingModel>>(APIURL_GET_MAP_ROUTING_SETTING).then((result) => {
      let routingServers = result.data.data;
      if (routingServers.plannedRouteUrl != undefined) localStorage.set('PlannedRouteUrl', routingServers.plannedRouteUrl);
      if (routingServers.driverRouteUrl != undefined) localStorage.set('DriverRouteUrl', routingServers.driverRouteUrl);
      if (routingServers.actualRouteUrl != undefined) localStorage.set('ActualRouteUrl', routingServers.actualRouteUrl);

      const mapSection = mapState.map;
      if (mapSection != undefined && mapState.selectedTour != undefined) {
        if (routeState.planned != 'off') {
          httpRequest
            .getRequest<IOutputResult<ICustomerResultModel[]>>(APIURL_GET_CUSTOMER_LIST, () => {}, {
              params: { tourId: mapState.selectedTour?.tourId },
            })
            .then((result) => {
              if (routeState.planned == 'route') {
                map.createStoreRouting(result.data.data, routingServers.plannedRouteUrl);
                if (mapState.storeMarkersLayer != undefined) mapSection?.removeLayer(mapState.storeMarkersLayer);
              } else if (routeState.planned == 'pin') {
                if (mapState.storeRoutingControl != undefined) mapSection?.removeControl(mapState.storeRoutingControl);
                map.setStoreMarkers(result.data.data);
              }
            });
        } else {
          if (mapState.storeRoutingControl != undefined) mapSection?.removeControl(mapState.storeRoutingControl);
          if (mapState.storeMarkersLayer != undefined) mapSection?.removeLayer(mapState.storeMarkersLayer);
        }
        if (routeState.driver) {
          httpRequest
            .getRequest<IOutputResult<IDriverResultModel[]>>(APIURL_GET_DRIVER_LOCATION_DATA, () => {}, {
              params: { tourId: mapState.selectedTour?.tourId },
            })
            .then((result) => {
              map.createDriverRouting(result.data.data, routingServers.driverRouteUrl);
            });
        } else {
          if (mapState.driverRoutingControl != undefined) mapSection?.removeControl(mapState.driverRoutingControl);
        }
        if (routeState.actual) {
          httpRequest
            .getRequest<IOutputResult<IVisitResultModel[]>>(APIURL_GET_VISIT_DATA, () => {}, {
              params: { tourId: mapState.selectedTour?.tourId },
            })
            .then((result) => {
              map.createVisitRouting(result.data.data, routingServers.actualRouteUrl);
            });
        } else {
          if (mapState.visitRoutingControl != undefined) mapSection?.removeControl(mapState.visitRoutingControl);
        }
      }
    });
  };

  return (
    <>
      <TourUpdateLocation />
      <TourSelectionModal setShowModal={setTourSelectionModal} showModal={tourSelectionModal} />
      <div className="p-1">
        <InputGroup>
          <Button className="calendar-btn" onClick={dateToggle}>
            <CalendarIcon size={15} />
          </Button>
          <Input placeholder="Select Date" onClick={dateToggle} value={showDate} />
        </InputGroup>
      </div>
      <Modal className="date-time-modal" isOpen={openModal} toggle={dateToggle}>
        <Calendar
          calendarClassName="responsive-calendar"
          maximumDate={maxDate}
          value={selectedDay}
          onChange={(date) => selectDate(date)}
          shouldHighlightWeekends
        />
      </Modal>
      <div className="mt-1 mb-1 p-relative favourite-tour-header">
        <h4>Favourite Tour</h4>
        <Button className="btn-icon rounded-circle" onClick={() => handleShowSelectTourModal()} color="flat-success">
          <Plus size={16} />
        </Button>
      </div>
      <Accordion className="accordion-margin" open={open} toggle={toggle}>
        <PerfectScrollbar hidden={false} style={{ height: 'calc(100vh - 200px) ' }}>
          {loadingTour ? (
            <>
              <LoadingComponent></LoadingComponent>
            </>
          ) : (
            tourData.map((item) => {
              return (
                <AccordionItem>
                  <AccordionHeader targetId={'accordion-' + item.grouping}>{item.grouping}</AccordionHeader>
                  <AccordionBody accordionId={'accordion-' + item.grouping}>
                    {item.tours.length <= 0 ? (
                      <Badge className="info">List is empty.</Badge>
                    ) : (
                      <>
                        {item.tours.map((t) => {
                          return (
                            <Col className="tour-item">
                              <button
                                type="button"
                                onClick={() => handleSelectTour(t)}
                                className={
                                  t.driverNumber == mapState.selectedTour?.driverNumber &&
                                  t.grouping == mapState.selectedTour?.grouping &&
                                  t.tourId == mapState.selectedTour.tourId
                                    ? 'active'
                                    : ''
                                }
                              >
                                {t.driverName} - {t.tourId}
                              </button>
                            </Col>
                          );
                        })}
                      </>
                    )}
                  </AccordionBody>
                </AccordionItem>
              );
            })
          )}
        </PerfectScrollbar>
      </Accordion>
    </>
  );
};

export default TourSelection;
