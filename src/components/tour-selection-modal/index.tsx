import { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { TourSelectionModalProp } from './TourSelectionModalProp';
import AsyncSelect from 'react-select/async';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { TourGroupModel } from '@src/models/output/tour/TourGroupModel';
import {
  APIURL_ADD_DRIVER_TO_FAVORITE,
  APIURL_FAVORITE_DATA_DRIVERS,
  APIURL_GET_GROUPDRIVERS_LIST,
  APIURL_GET_TOURGROUP_LIST,
  APIURL_REMOVE_DRIVER_FROM_FAVORITE,
} from '@src/configs/apiConfig/apiUrls';
import { TourDeriverModel } from '@src/models/output/tour/TourDeriverModel';
import { useToast } from '@src/hooks/useToast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPageListOutputResult } from '@src/models/output/IPageListOutputResult';
import PerfectScrollbar from 'react-perfect-scrollbar';
import LoadingComponent from '../spinner/LoadingComponent';
import loadingImage from '@src/assets/images/loading.gif';
import { Plus, Star } from 'react-feather';
import classNames from 'classnames';
import { IFavouriteDriverItemModel } from '@src/models/output/tour/IFavouriteDriverItemModel';

export const TourSelectionModal: FunctionComponent<TourSelectionModalProp> = (props) => {
  let groupTourSelectdata: any[] = [];
  const [tourDriverdata, setTourDriverdata] = useState<TourDeriverModel[]>([]);
  const [tourFavouriteDriverdata, setTourFavouriteDriverdata] = useState<IFavouriteDriverItemModel[]>([]);
  const [tourDriverPage, setTourDriverPage] = useState<number>(1);
  const [tourFavouriteDriverPage, setTourFavouriteDriverPage] = useState<number>(1);
  const [tourGroupSelected, setTourGroupSelected] = useState<string>();
  const [tourDriverHasNextPage, setTourDriverHasNextPage] = useState<boolean>(false);
  const [tourFavouriteDriverHasNextPage, setTourFavouriteDriverHasNextPage] = useState<boolean>(false);
  const [loadingDrivers, setLoadingDrivers] = useState<boolean>(false);
  const [tourDriverSearch, setTourDriverSearch] = useState<string>('');
  const [favouriteTourDriverSearch, setFavouriteTourDriverSearch] = useState<string>('');
  const [loadingFavouriteDrivers, setLoadingFavouriteDrivers] = useState<boolean>(false);
  const [driverTempAddFavourite, setDriverTempAddFavourite] = useState<any[]>([]);
  const [driverTempRemoveFavourite, setDriverTempRemoveFavourite] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('add');

  useEffect(() => {
    resetModal();
  }, [props.showModal]);

  const resetModal = () => {
    setTourDriverdata([]);
    setTourFavouriteDriverdata([]);
    setTourDriverPage(1);
    setTourGroupSelected(undefined);
    setTourDriverHasNextPage(false);
    setTourFavouriteDriverHasNextPage(false);
    setTourDriverSearch('');
    setFavouriteTourDriverSearch('');
    setDriverTempAddFavourite([]);
    setDriverTempRemoveFavourite([]);
    setActiveTab('add');
  };

  useEffect(() => {
    reloadDriverdata();
  }, [tourGroupSelected]);

  useEffect(() => {
    reloadDriverdata();
  }, [tourDriverSearch]);

  useEffect(() => {
    reloadFavouriteDriverdata();
  }, [favouriteTourDriverSearch]);

  const reloadDriverdata = () => {
    if (tourGroupSelected) {
      setTourDriverdata([]);
      setDriverTempAddFavourite([]);
      setDriverTempRemoveFavourite([]);
      getTourgroupDrivers(tourGroupSelected, 1);
    }
  };

  const reloadFavouriteDriverdata = () => {
    setTourFavouriteDriverdata([]);
    setDriverTempRemoveFavourite([]);
    getFavouriteDrivers(1);
  };

  const httpRequest = useHttpRequest();
  const toast = useToast();

  const filterGroupTourdata = (inputValue: string) => {
    return groupTourSelectdata.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const preapreGroupTourdata = (data: TourGroupModel[]) => {
    groupTourSelectdata = [];
    data.forEach((d) => {
      groupTourSelectdata.push({ value: d.grouping, label: d.description });
    });
  };

  const groupTourOptions = (inputValue: string) => {
    return new Promise((resolve) => {
      if (groupTourSelectdata.length > 0) {
        resolve(filterGroupTourdata(inputValue));
      } else {
        httpRequest.postRequest<IOutputResult<TourGroupModel[]>>(APIURL_GET_TOURGROUP_LIST, {}).then((result) => {
          if (result.data) {
            preapreGroupTourdata(result.data.data);
            resolve(filterGroupTourdata(inputValue));
          }
        });
      }
    });
  };

  const handleGroupTourChange = (e: any) => {
    var selectedValue = e.value;
    if (selectedValue && selectedValue != tourGroupSelected) {
      setLoadingDrivers(true);
      setTourGroupSelected(selectedValue);
    }
  };

  const handleAddDriverToFavourite = (driverNumber: string, driverName: string, group?: string) => {
    if (!group) group = tourGroupSelected;
    httpRequest
      .postRequest<IOutputResult<any>>(APIURL_ADD_DRIVER_TO_FAVORITE, {
        groupId: group,
        driverNumber: driverNumber,
        driverName: driverName,
      })
      .then((result) => {
        var driverTempRemoveFavouriteArray = driverTempRemoveFavourite.filter(
          (o) => o.driverNumber !== driverNumber && o.group === group
        );
        setDriverTempRemoveFavourite(driverTempRemoveFavouriteArray);

        setDriverTempAddFavourite((item: any) => {
          return [...item, { group: group, driverNumber: driverNumber, driverName: driverName }];
        });
      });
  };
  const handleRemoveDriverFromFavourite = (driverNumber: string, group?: string) => {
    if (!group) group = tourGroupSelected;
    httpRequest
      .deleteRequest<IOutputResult<any>>(APIURL_REMOVE_DRIVER_FROM_FAVORITE, {
        groupId: group,
        driverNumber: driverNumber,
      })
      .then((result) => {
        const driverTempAddFavouriteArray = driverTempAddFavourite.filter(
          (o) => o.driverNumber != driverNumber && o.group == group
        );
        setDriverTempAddFavourite(driverTempAddFavouriteArray);

        setDriverTempRemoveFavourite((item: any) => {
          return [...item, { group: group, driverNumber: driverNumber }];
        });
      });
  };

  const getTourgroupDrivers = (group: string, page: number) => {
    httpRequest
      .getRequest<IPageListOutputResult<TourDeriverModel[]>>(
        APIURL_GET_GROUPDRIVERS_LIST,
        function () {
          toast.showError('خطایی در دریافت اطلاعات رانندگان روی داده است');
          setLoadingDrivers(false);
        },
        {
          params: { group: group, page: page, limit: 10, search: tourDriverSearch },
        }
      )
      .then((result) => {
        setTourDriverPage(result.data.currentPage + 1);
        setTourDriverHasNextPage(result.data.totalPages > result.data.currentPage);
        if (page == 1) {
          setTourDriverdata(result.data.data);
        } else {
          setTourDriverdata((item: any) => {
            return [...item, ...result.data.data];
          });
        }
        setLoadingDrivers(false);
      });
  };

  const getTourgroupDriversPaging = () => {
    if (tourGroupSelected) getTourgroupDrivers(tourGroupSelected, tourDriverPage);
  };

  const handleSearch = (e: any) => {
    setTourDriverSearch(e.target.value);
  };

  const toggleTab = (tabId: string) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
      if (tabId == 'favourite') {
        setTourFavouriteDriverdata([]);
        setDriverTempAddFavourite([]);
        setDriverTempRemoveFavourite([]);
        getFavouriteDrivers(1);
      } else if (tabId == 'add') {
        setTourDriverdata([]);
        setDriverTempAddFavourite([]);
        setDriverTempRemoveFavourite([]);
        if (tourGroupSelected) getTourgroupDrivers(tourGroupSelected, 1);
      }
    }
  };

  const getFavouriteDrivers = (page: number) => {
    setLoadingFavouriteDrivers(true);
    httpRequest
      .getRequest<IPageListOutputResult<IFavouriteDriverItemModel[]>>(
        APIURL_FAVORITE_DATA_DRIVERS,
        function () {
          toast.showError('خطایی در دریافت اطلاعات رانندگان روی داده است');
          setLoadingFavouriteDrivers(false);
        },
        {
          params: { page: page, limit: 10, search: favouriteTourDriverSearch },
        }
      )
      .then((result) => {
        setTourFavouriteDriverPage(result.data.currentPage + 1);
        setTourFavouriteDriverHasNextPage(result.data.totalPages > result.data.currentPage);
        if (page == 1) {
          setTourFavouriteDriverdata(result.data.data);
        } else {
          setTourFavouriteDriverdata((item: any) => {
            return [...item, ...result.data.data];
          });
        }
        setLoadingFavouriteDrivers(false);
      });
  };

  const getFavouriteDriversPaging = () => {
    getFavouriteDrivers(tourFavouriteDriverPage);
  };

  const handleFavouriteSearch = (e: any) => {
    setFavouriteTourDriverSearch(e.target.value);
  };

  return (
    <>
      <Modal
        modalClassName="modal-primary"
        isOpen={props.showModal}
        toggle={() => props.setShowModal(!props.showModal)}
        className="modal-lg"
      >
        <ModalHeader toggle={() => props.setShowModal(!props.showModal)}>Favourite Tools</ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activeTab === 'add'} onClick={() => toggleTab('add')}>
                <Plus size={15} />
                Add Driver
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === 'favourite'} onClick={() => toggleTab('favourite')}>
                <Star size={15} />
                Favourite
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={activeTab}>
            <TabPane tabId="add">
              <Row>
                <Col sm={5}>
                  <FormGroup>
                    <AsyncSelect
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      loadOptions={groupTourOptions}
                      onChange={handleGroupTourChange}
                      cacheOptions
                      defaultOptions
                    />
                  </FormGroup>
                </Col>
                <Col sm={7}>
                  <FormGroup>
                    <Input type="text" value={tourDriverSearch} placeholder="Serach in driver ..." onChange={handleSearch} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {tourDriverdata.length > 0 && !loadingDrivers ? (
                  <PerfectScrollbar id="driversScrollElement" hidden={false} style={{ height: '200px' }}>
                    <InfiniteScroll
                      style={{ display: 'flex', flexDirection: 'column' }}
                      dataLength={tourDriverdata.length}
                      next={getTourgroupDriversPaging}
                      hasMore={tourDriverHasNextPage}
                      loader={<img src={loadingImage} style={{ width: '90px' }} />}
                      scrollableTarget="driversScrollElement"
                    >
                      <ListGroup className="tour-selection">
                        {tourDriverdata.map((item, index) => (
                          <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                            {item.driverName}
                            <div className="form-favorite-switch">
                              <Star
                                size={19}
                                className={classNames('cursor-pointer', {
                                  'is-favorite':
                                    driverTempAddFavourite.some(
                                      (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                    ) ||
                                    driverTempRemoveFavourite.some(
                                      (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                    )
                                      ? driverTempAddFavourite.some(
                                          (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                        ) &&
                                        !driverTempRemoveFavourite.some(
                                          (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                        )
                                      : item.isFavorite,
                                })}
                                onClick={() => {
                                  var favorite =
                                    driverTempAddFavourite.some(
                                      (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                    ) ||
                                    driverTempRemoveFavourite.some(
                                      (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                    )
                                      ? driverTempAddFavourite.some(
                                          (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                        ) &&
                                        !driverTempRemoveFavourite.some(
                                          (o) => o.group === tourGroupSelected && o.driverNumber === item.driverNumber
                                        )
                                      : item.isFavorite;

                                  if (favorite) handleRemoveDriverFromFavourite(item.driverNumber);
                                  else handleAddDriverToFavourite(item.driverNumber, item.driverName);
                                }}
                              />
                            </div>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </InfiniteScroll>
                  </PerfectScrollbar>
                ) : loadingDrivers ? (
                  <>
                    <LoadingComponent></LoadingComponent>
                  </>
                ) : (
                  <>
                    <Col>
                      <Alert color="info" className="p-1">
                        Please select tour group.
                      </Alert>
                    </Col>
                  </>
                )}
              </Row>
            </TabPane>
            <TabPane tabId={'favourite'}>
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <Input
                      type="text"
                      value={favouriteTourDriverSearch}
                      placeholder="Serach in favourite drivers ..."
                      onChange={handleFavouriteSearch}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {tourFavouriteDriverdata.length > 0 && !loadingFavouriteDrivers ? (
                  <PerfectScrollbar id="favouriteDriversScrollElement" hidden={false} style={{ height: '200px' }}>
                    <InfiniteScroll
                      style={{ display: 'flex', flexDirection: 'column' }}
                      dataLength={tourFavouriteDriverdata.length}
                      next={getFavouriteDriversPaging}
                      hasMore={tourFavouriteDriverHasNextPage}
                      loader={<img src={loadingImage} style={{ width: '90px' }} />}
                      scrollableTarget="favouriteDriversScrollElement"
                    >
                      <ListGroup className="tour-selection">
                        {tourFavouriteDriverdata.map((item, index) => (
                          <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                            {item.groupId + ' - ' + item.driverName}
                            <div className="form-favorite-switch">
                              <Star
                                size={19}
                                className={classNames('cursor-pointer', {
                                  'is-favorite':
                                    !driverTempRemoveFavourite.some(
                                      (o) => o.group === item.groupId && o.driverNumber === item.driverNumber
                                    ) ||
                                    driverTempAddFavourite.some(
                                      (o) => o.group === item.groupId && o.driverNumber === item.driverNumber
                                    ),
                                })}
                                onClick={() => {
                                  var favorite =
                                    !driverTempRemoveFavourite.some(
                                      (o) => o.group === item.groupId && o.driverNumber === item.driverNumber
                                    ) ||
                                    driverTempAddFavourite.some(
                                      (o) => o.group === item.groupId && o.driverNumber === item.driverNumber
                                    );

                                  if (favorite) handleRemoveDriverFromFavourite(item.driverNumber, item.groupId);
                                  else handleAddDriverToFavourite(item.driverNumber, item.driverName);
                                }}
                              />
                            </div>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </InfiniteScroll>
                  </PerfectScrollbar>
                ) : loadingDrivers ? (
                  <>
                    <LoadingComponent></LoadingComponent>
                  </>
                ) : (
                  <>
                    <Col>
                      <Alert color="info" className="p-1">
                        List is empty.
                      </Alert>
                    </Col>
                  </>
                )}
              </Row>
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => props.setShowModal(!props.showModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TourSelectionModal;
