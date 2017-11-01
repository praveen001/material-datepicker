import React from 'react';
import moment from 'moment';

// Material UI
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/NavigateBefore';
import NextIcon from 'material-ui-icons/NavigateNext';

const styles = {
  datePicker: {
    margin: '0px',
    position: 'static',
    top: '0px',
    backgroundColor:' #fff',
    boxShadow:' rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    left: '0px',
    zIndex:' 10000',
    '& th': {
      color: 'rgba(0, 0, 0, 0.38)',
      fontSize: '12px',
      textAlign: 'center',
      border: 'none !important',
      padding: '0px !important',
      fontWeight: '500'
    },
    '& tr': {
      height: '34px'
    },
    '& td': {
      textAlign: 'center',
      border: 'none !important',
      padding: '0px !important'
    }
  },
  summary: {
    backgroundColor: '#00B6DC',
    color: '525e66',
    padding: '15px 10px'
  },
  summaryYear: {
    fontSize: '16px',
    opacity: '0.7'
  },
  summaryDate: {
    fontSize: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '500',
    '& > p': {
      fontWeight: '500',
      display: 'block'
    }
  },
  disabled: {
    '& > div': {
      opacity: '0.5'
    },
    '&:hover > div': {
      backgroundColor: '#fff !important',
      cursor: 'not-allowed',
      color: '#525e66 !important'
    }
  },
  otherMonth: {
    opacity: '0.7'
  },
  date: {
    '& > div': {
      borderRadius: 'none !important',
      '&:after': {
        content: ' ',
        display: 'block',
        width: '100px',
        height: '100px',
        backgroundColor: '#000'
      }
    }
  },
  currentDate: {
    '& button': {
      height: '30px',
      width: '30px',
      opacity: '1 !important',
      fontWeight: 'bold',
      border: '1px solid #83959f'
    }
  },
  selectedDate: {
    '& button': {
      fontWeight: '500',
      backgroundColor: '#00b6dc !important',
      color: '#fff',
      opacity: '1',
      height: '40px',
      width: '40px',
      border: 'none',
      zIndex: 1
    }
  },
  inRange: {
    '& > div': {
      backgroundColor: '#cef6ff'
    }
  },
  startDate: {
    position: 'relative',
    '&:after': {
      display: 'block',
      content: '\'\'',
      width: '50%',
      height: '40px',
      backgroundColor: 'cef6ff',
      position: 'absolute',
      top: '0px',
      right: '0px',
      pointerEvents: 'none',
      zIndex: 0
    }
  },
  endDate: {
    position: 'relative',
    '&:after': {
      display: 'block',
      content: '\'\'',
      width: '50%',
      height: '40px',
      backgroundColor: 'cef6ff',
      position: 'absolute',
      top: '0px',
      left: '0px',
      pointerEvents: 'none'
    }
  },
  dates: {
    width: '40px',
    fontSize: '12px',
    height: '40px',
    color: 'rgba(54, 63, 69, 0.87)'
  },
  footer: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: '10px'
    }
  }
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: this.props.defaultValue ? moment(this.props.defaultValue) : undefined,
      endDate: this.props.range && this.props.endDate ? moment(this.props.endDate) : undefined
    };

    window.moment = moment;
    this.state = this.buildMonth(new Date().getMonth(), new Date().getFullYear());

    if (this.props.minDate) {
      this.minDate = moment([this.props.minDate.getFullYear(), this.props.minDate.getMonth(), this.props.minDate.getDate()]);
    }
    if (this.props.maxDate) {
      this.maxDate = moment([this.props.maxDate.getFullYear(), this.props.maxDate.getMonth(), this.props.maxDate.getDate()]);
    }
  }

  daysInMonth() {
    new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  buildMonth(month, year) {
    var firstDay = moment([year, month]);
    var daysInMonth = firstDay.daysInMonth();
    
    var datesArray = [];
    for (var i = 0; i < daysInMonth; i++ ) {
      datesArray.push(firstDay.clone().add(i, 'days'));
    }

    var firstOffset = firstDay.weekday();
    for (var i = 1; i <= firstOffset; i++) {
      datesArray.unshift(firstDay.clone().subtract(i, 'days'));
    }

    var endOffset = datesArray.length % 7, lastDay = datesArray[datesArray.length - 1];
    if (endOffset == 0) {
      endOffset = 7;
    } else {
      endOffset = 7 - endOffset;
    }
    for (var i = 1; i <= endOffset; i++) {
      datesArray.push(lastDay.clone().add(i, 'days'));
    }

    return {month, year, firstDay, daysInMonth, datesArray, currentDate: moment(new Date()), selectedDate: this.state.selectedDate, endDate: this.state.endDate};
  }

  previousMonth() {
    var year = this.state.year, month = this.state.month;
    if (this.state.month - 1 < 0) {
      month = 11;
      year = this.state.year - 1;
    } else {
      month -= 1;
    }
    this.setState(this.buildMonth(month, year));
  }

  nextMonth() {
    var year = this.state.year, month = this.state.month;
    if (this.state.month + 1 > 11) {
      month = 0;
      year = this.state.year + 1;
    } else {
      month += 1;
    }
    this.setState(this.buildMonth(month, year));
  }

  selectDate(dt) {
    if (this.isDateDisabled(dt)) {
      return;
    }
    var selectedDate = dt, endDate = undefined;
    if (this.props.range) {
      if (this.state.selectedDate) {
        if (dt.isBefore(this.state.selectedDate)) {
          selectedDate = dt;
          endDate = this.state.selectedDate;
        } else {
          selectedDate = this.state.selectedDate;
          endDate = dt;
        }
      } else {
        selectedDate = dt;
      }

      if (this.state.selectedDate && this.state.endDate) {
        selectedDate = dt;
        endDate = undefined;
      }
    }
    this.setState(Object.assign({}, this.buildMonth(dt.month(), dt.year()), {selectedDate: selectedDate, endDate: endDate}), () => {
      if (this.props.range) {
        this.props.onChange(this.state.selectedDate, this.state.endDate);
      } else {
        this.props.onChange(this.state.selectedDate);
      }
    });
  }

  isSame(date1, date2) {
    if (date1 && date2 && date1.isSame(date2, 'day')) {
      return true;
    } else {
      return false;
    }
  }

  isInRange(dt) {
    var inRange = false;
    if (this.props.range) {
      if (this.state.selectedDate && this.state.endDate) {
        if (dt.isAfter(this.state.selectedDate) && dt.isBefore(this.state.endDate)) {
          inRange = true;
        }
      }
    }
    return inRange;
  }

  isDateDisabled(date) {
    if (this.minDate && date.isBefore(this.minDate)) {
      return true;
    }
    if (this.maxDate && date.isAfter(this.maxDate)) {
      return true;
    }
    return false;
  }

  printMonth() {
    var totalWeeks = Math.ceil(this.state.datesArray.length / 7);
    return new Array(totalWeeks).fill(0).map( (z, i) => {
      return this.printWeek(i);
    })
  }

  printWeek(n) {
    var self = this;
    return (
      React.createElement(
        TableRow,
        { key: n },
        new Array(7).fill(0).map(function (z, j) {
          var thisDate = self.state.datesArray[n * 7 + j];
          return React.createElement(
            TableCell,
            {
              key: j,
              className: self.props.classes.date + ' ' + (thisDate.month() != self.state.month ? self.props.classes.otherMonth : '') + ' ' + (self.isSame(thisDate, self.state.currentDate) ? self.props.classes.currentDate : '') + ' ' + (self.isSame(thisDate, self.state.selectedDate) || self.props.range && self.isSame(thisDate, self.state.endDate) ? self.props.classes.selectedDate : '') + ' ' + (self.isDateDisabled(thisDate) ? self.props.classes.disabled : '') + ' ' + (self.isInRange(thisDate) ? self.props.classes.inRange : '') + ' ' + (self.props.range && self.isSame(thisDate, self.state.endDate) ? self.props.classes.endDate : '') + ' ' + (self.props.range && self.state.endDate && self.isSame(thisDate, self.state.selectedDate) ? self.props.classes.startDate : '')
            },
            React.createElement(
              'div',
              null,
              React.createElement(
                IconButton,
                { className: self.props.classes.dates, onClick: self.selectDate.bind(self, thisDate) },
                self.state.datesArray[n * 7 + j].date()
              )
            )
          );
        })
      )
    )
  }

  render() {
    var self = this;
    return (
      React.createElement(
        "div",
        { className: self.props.classes.datePicker },
        self.props.range ? null : React.createElement(
          "div",
          { className: self.props.classes.summary },
          React.createElement(
            Typography,
            { className: self.props.classes.summaryYear },
            self.state.selectedDate.year()
          ),
          React.createElement(
            Typography,
            { className: self.props.classes.summaryDate },
            moment.months()[self.state.selectedDate.month()],
            ", ",
            self.state.selectedDate.date()
          )
        ),
        React.createElement(
          "div",
          { className: self.props.classes.header },
          React.createElement(
            IconButton,
            { onClick: self.previousMonth.bind(self) },
            React.createElement(BackIcon, null)
          ),
          React.createElement(
            Typography,
            null,
            moment.months(self.state.month)
          ),
          React.createElement(
            IconButton,
            { onClick: self.nextMonth.bind(self) },
            React.createElement(NextIcon, null)
          )
        ),
        React.createElement(
          Table,
          null,
          React.createElement(
            TableHead,
            null,
            React.createElement(
              TableRow,
              null,
              React.createElement(
                TableCell,
                null,
                "S"
              ),
              React.createElement(
                TableCell,
                null,
                "M"
              ),
              React.createElement(
                TableCell,
                null,
                "T"
              ),
              React.createElement(
                TableCell,
                null,
                "W"
              ),
              React.createElement(
                TableCell,
                null,
                "T"
              ),
              React.createElement(
                TableCell,
                null,
                "F"
              ),
              React.createElement(
                TableCell,
                null,
                "S"
              )
            )
          ),
          React.createElement(
            TableBody,
            null,
            self.printMonth()
          )
        )
      )
    )
  }
}

export default withStyles(styles)(DatePicker);