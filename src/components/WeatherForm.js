import React from "react";

const Weatherform = props => {
  const { handleInput, handleClick } = props;

  return (
    <form className="form">
      <input
        type="text"
        autoFocus
        placeholder="Enter city name"
        onInput={handleInput}
        className="form__input"
      />
      <button onClick={handleClick} className="form__button">
        Search
      </button>
    </form>
  );
};

export default Weatherform;
