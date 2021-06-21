import React from "react";
import { addDays, addMonths, subMonths, startOfMonth, startOfWeek, endOfWeek, format, endOfMonth, isSameMonth, isSameDay, toDate} from 'date-fns'
import DailyScheduler from "./DailyScheduler";

class Calendar extends React.Component {
    state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      showDailyPlan: false,
      
    };
  
    renderHeader() {
      const dateFormat = "MMMM yyyy";
  
      return (
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="col col-center">
            <span>{format(this.state.currentMonth, dateFormat)}</span>
          </div>
          <div className="col col-end" onClick={this.nextMonth}>
            <div className="icon">chevron_right</div>
          </div>
        </div>
      );
    }
  
    renderDays() {
      const dateFormat = "dddd";
      const days = [];
  
      let startDate = startOfWeek(this.state.currentMonth);
  
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }
  
      return <div className="days row">{days}</div>;
    }
  
    renderCells() {
      const { currentMonth, selectedDate } = this.state;
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
  
      const dateFormat = "d";
      const rows = [];
  
      let days = [];
      let day = startDate;
      let formattedDate = "";
  
      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, dateFormat);
          const cloneDay = day;
          days.push(
            <div
              className={`col cell ${
                !isSameMonth(day, monthStart)
                  ? "disabled"
                  : isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
             onClick={() => this.onDateClick(toDate(cloneDay))}
             //onClick={() => this.onDateClick(day)}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
          day = addDays(day, 1);
        }
        rows.push(
          <div className="row" key={day}>
            {days}
          </div>
        );
        days = [];
      }
      return <div className="body">{rows}</div>;
    }
  
    onDateClick = day => {
      this.setState({
        selectedDate: day,
        showDailyPlan: true
      });
    }
  
    nextMonth = () => {
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      });
    };
  
    prevMonth = () => {
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
      });
    };
  
    convert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    render() {
      console.log("calendar selectedDate: " + this.convert(this.state.selectedDate))
      console.log("Raw selectedDate: "+this.state.selectedDate)
      return (
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
          {this.state.showDailyPlan &&
                    <DailyScheduler
                   selectedDate={this.convert(this.state.selectedDate)}
                        
                        modal={this.state.showDailyPlan}
                        toggleModal={(flag) => this.setState({ showDailyPlan: flag })}
                    />}
        </div>
      );
    }
  }
  
  export default Calendar;