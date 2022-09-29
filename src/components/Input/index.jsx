import React from 'react';
import './Input.css';

const Input = ({
  lableTitle = '',
  type = '',
  name = '',
  placeholder = '',
  value = '',
  className = '',
  inputFunc,
}) => {
  const onChangeInput = (event) => {
    inputFunc((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className="input">
      <label>{lableTitle}</label>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChangeInput(event)}
      />
    </div>
  );
};

export default Input;
