import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "2020",
      days: 30,
      firstDay: "",
      data: []
    };
  }

  componentDidMount() {
    this.checkDays(this.state.year);
  }

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value.trim() });
    this.checkDays(value);
  };

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  checkDays = (year) => {
    let days = this.daysInMonth(11, year);
    const startDay = moment(new Date(`${year}-11-01`)).format("ddd");
    this.setState({ days: days, firstDay: startDay });
    this.showCalender(startDay);
    console.log("checkDays in month==>", days, "startDay==>", startDay);
  };

  showCalender(startDay) {
    let count = "";
    let dates = [];
    let emptyDays = [];
    console.log("this.state.firstDay>>", startDay);

    switch (startDay) {
      // case "Sun":
      //   count = 0;
      //   break;
      case "Mon":
        count = 1;
        break;
      case "Tue":
        count = 2;
        break;
      case "Wed":
        count = 3;
        break;
      case "Thu":
        count = 4;
        break;
      case "Fri":
        count = 5;
        break;
      case "Sat":
        count = 6;
        break;
      default:
        count = 0;
    }
    console.log("count ==>", count);
    for (let i = 1; i <= this.state.days; i++) {
      dates.push(i);
    }
    if (count) {
      for (let i = 1; i <= count; i++) {
        emptyDays.push(" ");
      }
    }
    let newArray = [...emptyDays, ...dates];
    console.log("newArray===", newArray);
    // console.log("A", dates, "emptyDays=", emptyDays);
    this.setState({ data: newArray });
  }

  render() {
    const { firstDay, days, year, data } = this.state;
    const monthArray = _.chunk(data, 7);
    console.log("monthArray", monthArray);

    return (
      <div className="">
        <div className="container ">
          <h1>Calender</h1>
          <h2>November </h2>
          <select name="year" value={this.state.year} onChange={this.onChange}>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
          <table className="table bg-info mt-3">
            <thead>
              <tr>
                <td>Sun</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thr</td>
                <td>Fri</td>
                <td>Sat</td>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                monthArray.map((row, key) => {
                  return (
                    <tr>
                      {row.map((day, id) => {
                        return <td>{day}</td>;
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Calender;
