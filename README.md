# material-datepicker
Datepicker for material ui 2

## Install
npm install --save react-material-datepicker

## Usage
```
<Datepicker 
  defaultValue={ this.state.startDate }
  endDate={ this.state.endDate }
  onChange={ this.onDateChange }
  range={ true }
  maxDate={ new Date('12-12-2017') }
  minDate={ new Date( '12-10-2017') }
/> 
```

## Getting selected date
onDateChange(startDate, endDate) {
  // endDate will be undefined if 'range=false'
  console.log(startDate, endDate); 
}
