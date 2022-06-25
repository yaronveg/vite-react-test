import { ChangeEventHandler, TextareaHTMLAttributes, useReducer } from "react";
import "./Input.css";

const Input = (props) => {
  const inputReducer = (
    state: {
      value: string;
      isValid: boolean;
    },
    action: { type: string; val: string }
  ) => {
    switch (action.type) {
      case "CHANGE":
        return { ...state, value: action.val, isValid: true };
      default:
        return state;
    }
  };
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
