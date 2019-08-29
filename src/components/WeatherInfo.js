import React from "react";

const WeatherInfo = props => {
  const { data } = props;

  return (
    <div className="weather">
      <h1 className="weather__title">{data.name}</h1>
      <ul className="weather__list">
        <li>{data.main.temp} ℃ </li>
        <li>{data.wind.deg} m/s</li>
        <li>{data.main.pressure} hPa</li>
      </ul>
    </div>
  );
};

export default WeatherInfo;
