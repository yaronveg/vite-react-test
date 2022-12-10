import { useCallback, useReducer } from "react";
import {
  InputHandler,
  HookInputs,
  FormActions,
} from "../interfaces/form-types";

const formReducer = (state: { inputs: HookInputs }, action: FormActions) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return { inputs: action.inputs, isValid: action.formIsValid };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: HookInputs,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler: InputHandler = useCallback(
    (id: string, value: string | Blob, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  const setFormData = useCallback(
    (newInputData: HookInputs, newFormValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: newInputData,
        formIsValid: newFormValidity,
      });
    },
    []
  );

  return {formState, inputHandler, setFormData};
};
