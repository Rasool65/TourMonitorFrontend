import { usePersianDate } from '@src/hooks/usePersianDate';
import { FunctionComponent, useState } from 'react';
import { Calendar } from 'react-feather';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const TourSelection: FunctionComponent = (props) => {
  const [open, setOpen] = useState<any>('1');
  const dateTime = usePersianDate();
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const toggle = (id: any) => {
    open === id ? setOpen('') : setOpen(id);
  };

  return (
    <>
      <div className="p-1">
        <InputGroup>
          <Button className="calendar-btn">
            <Calendar size={15} />
          </Button>
          <Input placeholder="Date" disabled={true} value={dateTime.getCurrentDate()} />
        </InputGroup>
      </div>
      <DatePicker locale="fa" value={selectedDay} onChange={setSelectedDay} shouldHighlightWeekends />
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
