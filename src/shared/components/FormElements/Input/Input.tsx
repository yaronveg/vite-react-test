import { useReducer, useEffect, ChangeEvent } from "react";
import { validation } from "../../../utils/validation";
import { ValidatorConfig } from "../../../interfaces/validation-types";
import "./Input.css";
import { InputHandler } from "../../../interfaces/form-types";

const inputReducer = (
  state: {
    value: string;
    isValid: boolean;
  },
  action: {
    type: string;
    val: string;
    validators: ValidatorConfig[];
  }
): { value: string; isValid: boolean; isTouched?: boolean } => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validation(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: {
  initialValue?: string;
  initialIsValid?: boolean;
  element?: "input" | "textarea";
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
  label?: string;
  errorText?: string;
  validators?: ValidatorConfig[];
  onInput: InputHandler;
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ?? "",
    isValid: props.initialIsValid ?? false,
    isTouched: false,
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators ?? [],
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH", val: "", validators: [] });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
