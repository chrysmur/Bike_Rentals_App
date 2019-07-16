import React from "react";
import Button from "./buttons";
import "./panel.css";

const Panel = props => {
  const { clickHandler, result, values, seasons, hours, temps } = props;
  const style = {
    backgroundColor: "gray",
    color: "white",
    position: "fixed",
    left: 0,
    width: "100%",
    height: "88%",
    border: "1px solid",
    fontSize: "20px"
  };
  const temp = parseInt(values["TEMP"] * 47 - 8);
  const hour = values["HOUR"];
  const holiday = values["HOLIDAY"] ? "Holiday" : "Not Holiday";
  const season = values["SEASON_1"]
    ? "spring"
    : values["SEASON_2"]
    ? "summer"
    : values["SEASON_3"]
    ? "fall"
    : "winter";

  const PlaceButtons = props => {
    const { names, handler } = props;
    if (Array.isArray(names)) {
      const btnnames = names.map(name => (
        <td key={name}>
          <Button name={name} clickHandler={handler} />
        </td>
      ));
      return btnnames;
    } else if (Object.keys(names).length > 0) {
      const btnnames = Object.values(names).map(name => (
        <td key={name}>
          <Button name={name} clickHandler={handler} />{" "}
        </td>
      ));
      return btnnames;
    }
  };

  return (
    <div>
      <table className="table1" style={style}>
        <thead />
        <tbody>
          <tr className="results">
            <td colSpan="4" color="blue">
              Predicted Bikes: {result}
            </td>
          </tr>
          <tr className="selections">
            <td className="title">Selections</td>
            <td> Season: {season}</td>
            <td>Time: {hour}</td>
            <td>Temp: {Math.ceil(temp)}C</td>
            <td>Day: {holiday}</td>
          </tr>
          <tr colSpan="4">
            <td className="title">Seasons</td>
            <PlaceButtons names={seasons} handler={clickHandler} />
          </tr>
          <tr className="hours" colSpan="4">
            <td className="title">Hours</td>
            <PlaceButtons names={hours} handler={clickHandler} />
          </tr>

          <tr colSpan="4">
            <td className="title">Temperature</td>
            <PlaceButtons names={temps} handler={clickHandler} />
          </tr>
          <tr colSpan="4">
            <td className="title">Days</td>
            <td>
              <Button name="holiday" clickHandler={clickHandler} />
            </td>
          </tr>
          <tr colSpan="4">
            <td>
              <Button name="reset" clickHandler={clickHandler} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Panel;
