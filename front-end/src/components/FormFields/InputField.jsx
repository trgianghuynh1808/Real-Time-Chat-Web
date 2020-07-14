import React, { Fragment } from "react";

const InputField = ({
  field,
  label = "",
  type = "text",
  placeholder = "",
  disabled = false,
  subTitle = "",
  ...other
}) => {
  const { name } = field;

  return (
    <Fragment>
      <div
        className={`wrap-input100 validate-input ${
          !subTitle ? "m-b-26" : "m-b-5"
        }`}
      >
        {label && <span className="label-input100">{label}</span>}
        <input
          id={name}
          {...field}
          className="input100"
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          {...other}
        />
      </div>
      {subTitle && <div className="sub-title-input">{subTitle}</div>}
    </Fragment>
  );
};

export default InputField;
