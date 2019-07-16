import React from "react";
import "./App.css";
import axios from "axios";
import Panel from "./components/panel";
import Header from "./components/header";

class App extends React.Component {
  constructor(props) {
    super(props);

    //initial  data
    this.initData = {
      SEASON_1: 0,
      SEASON_2: 0,
      SEASON_3: 1,
      SEASON_4: 0,
      TEMP: 0.497,
      HOLIDAY: 0,
      HOUR: 11
    };

    //seasons 'enum'
    this.seasons = {
      SUMMER: "summer",
      WINTER: "winter",
      SPRING: "spring",
      FALL: "fall"
    };

    //events 'enum'
    this.events = {
      RESET: "reset",
      HOLIDAY: "holiday"
    };

    this.data = this.initData; //initialize our current data with our initialData

    //Our app's state
    this.state = {
      pred: "" //predicted data
    };

    //temperatures array
    this.temps = ["0c", "10c", "20c", "40c"];
    //hours array
    this.hours = ["8am", "10am", "12pm", "16pm"];
  }

  //Our click handler
  clickHandler = name => {
    switch (true) {
      //Incase we received a reset command
      case name === this.events.RESET:
        this.data = this.initData;
        break;
      //Incase we received a spring command
      case name === this.seasons.SPRING:
        this.data = {
          ...this.data,
          SEASON_1: 1,
          SEASON_2: 0,
          SEASON_3: 0,
          SEASON_4: 0
        };
        break;
      //Incase we received a summer command
      case name === this.seasons.SUMMER:
        this.data = {
          ...this.data,
          SEASON_1: 0,
          SEASON_2: 1,
          SEASON_3: 0,
          SEASON_4: 0
        };

        break;
      //Incase we received a fall command
      case name === this.seasons.FALL:
        this.data = {
          ...this.data,
          SEASON_1: 0,
          SEASON_2: 0,
          SEASON_3: 1,
          SEASON_4: 0
        };
        break;
      //Incase we received a winter command
      case name === this.seasons.WINTER:
        this.data = {
          ...this.data,
          SEASON_1: 0,
          SEASON_2: 0,
          SEASON_3: 0,
          SEASON_4: 1
        };

        break;
      //Incase we received a holiday command
      case name === this.events.HOLIDAY:
        const HOLIDAY = this.data["HOLIDAY"] === 0 ? 1 : 0;
        this.data = { ...this.data, HOLIDAY };
        break;
      //Incase the received command is a temperature measure
      case this.temps.includes(name):
        const TEMP = (parseFloat(name.slice(0, 2)) + 8) / 47;
        this.data = { ...this.data, TEMP };
        break;
      //Incase the received  command is an hourly measure
      case this.hours.includes(name):
        const HOUR = parseFloat(name.slice(0, -2));
        this.data = { ...this.data, HOUR };
        break;
      default:
        break;
    }

    axios
      .post("http://127.0.0.1:5000", { data: this.data })
      .then(resp => {
        const pred = resp.data.res;
        this.setState({ pred });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .post("http://127.0.0.1:5000", { data: this.data })
      .then(resp => {
        const pred = resp.data.res;
        this.setState({ pred });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Panel
          clickHandler={this.clickHandler}
          result={this.state.pred}
          values={this.data}
          hours={this.hours}
          temps={this.temps}
          seasons={this.seasons}
        />
      </div>
    );
  }
}
export default App;
