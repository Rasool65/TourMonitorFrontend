import { usePersianDate } from '@src/hooks/usePersianDate';
import { FunctionComponent, useRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'react-feather';
import { Calendar } from 'react-modern-calendar-datepicker';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Input,
  InputGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const TourSelection: FunctionComponent = (props) => {
  const [open, setOpen] = useState<any>('1');
  const dateTime = usePersianDate();
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const toggle = (id: any) => {
    open === id ? setOpen('') : setOpen(id);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<string>();
  const dateToggle = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="p-1">
        <InputGroup>
          <Button className="calendar-btn" onClick={dateToggle}>
            <CalendarIcon size={15} />
          </Button>
          <Input placeholder="Select Date" onClick={dateToggle} value={showDate} />
        </InputGroup>
      </div>
      <Modal isOpen={openModal} toggle={dateToggle}>
        <ModalHeader toggle={dateToggle}> Tour Date Select </ModalHeader>
        <ModalBody style={{ margin: 'auto' }}>
          <Calendar
            calendarClassName="responsive-calendar"
            locale={'en'}
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setShowDate(`${selectedDay.year + '/' + selectedDay.month + '/' + selectedDay.day}`);
              setOpenModal(false);
            }}
          >
            ok
          </Button>{' '}
          <Button color="secondary" onClick={dateToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Accordion className="accordion-margin" open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Favourite Tour</AccordionHeader>
          <AccordionBody accordionId="1">
            <Badge className="info">List is empty.</Badge>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">All Tour</AccordionHeader>
          <AccordionBody accordionId="2">
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <span>Item 1</span>
              <div className="form-switch">
                <Input type="switch" id="t1" name="t1" />
              </div>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <span>Item 2</span>
              <div className="form-switch">
                <Input type="switch" id="t2" name="t2" />
              </div>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <span>Item 3</span>
              <div className="form-switch">
                <Input type="switch" id="t3" name="t3" />
              </div>
            </ListGroupItem>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default TourSelection;
