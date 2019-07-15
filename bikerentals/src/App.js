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

    //events 'enum'
    this.events = {
      SUMMER: "summer",
      WINTER: "winter",
      SPRING: "spring",
      FALL: "fall",
      RESET: "reset",
      HOLIDAY: "holiday"
    };

    //Our app's state
    this.state = {
      pred: "", //predicted data
      currentData: this.initData //initialize our current data with our initialData
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
        this.setState({ currentData: this.initData });
        break;
      //Incase we received a spring command
      case name === this.events.SPRING:
        let springData = {
          ...this.initData,
          SEASON_1: 1,
          SEASON_2: 0,
          SEASON_3: 0,
          SEASON_4: 0
        };
        this.setState({ currentData: springData });
        break;
      //Incase we received a summer command
      case name === this.events.SUMMER:
        const summerData = {
          ...this.initData,
          SEASON_1: 0,
          SEASON_2: 1,
          SEASON_3: 0,
          SEASON_4: 0
        };
        this.setState({ currentData: summerData });
        break;
      //Incase we received a fall command
      case name === this.events.FALL:
        const fallData = {
          ...this.initData,
          SEASON_1: 0,
          SEASON_2: 0,
          SEASON_3: 1,
          SEASON_4: 0
        };
        this.setState({ currentData: fallData });
        break;
      //Incase we received a winter command
      case name === this.events.WINTER:
        const winterData = {
          ...this.initData,
          SEASON_1: 0,
          SEASON_2: 0,
          SEASON_3: 0,
          SEASON_4: 1
        };
        this.setState({ currentData: winterData });
        break;
      //Incase we received a holiday command
      case name === this.events.HOLIDAY:
        const HOLIDAY = this.initData["HOLIDAY"] === 0 ? 1 : 0;
        this.setState({ currentData: { ...this.initData, HOLIDAY } });
        break;
      //Incase the received command is a temperature measure
      case this.temps.includes(name):
        const TEMP = (parseFloat(name.slice(0, 2)) + 8) / 47;
        this.setState({ currentData: { ...this.initData, TEMP } });
        break;
      //Incase the received  command is an hourly measure
      case this.hours.includes(name):
        const HOUR = parseFloat(name.slice(0, -2));
        this.setState({ currentData: { ...this.initData, HOUR } });
        break;
      default:
        break;
    }

    axios
      .post("http://127.0.0.1:5000", { data: this.state.currentData })
      .then(resp => {
        const pred = resp.data.res;
        this.setState({ pred });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .post("http://127.0.0.1:5000", { data: this.state.currentData })
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
          values={this.state.currentData}
        />
      </div>
    );
  }
}
export default App;
