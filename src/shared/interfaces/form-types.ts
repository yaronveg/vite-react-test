export type InputHandler = (
  id: string,
  value: string | Blob,
  isValid: boolean
) => void;

interface HookInput {
  value: string | Blob | null;
  isValid: boolean;
}

export type HookInputs = Record<string, HookInput>;

interface FormActionInputChange {
  type: "INPUT_CHANGE";
  value: string | Blob;
  isValid: boolean;
  inputId: string;
}
interface FormActionSetData {
  type: "SET_DATA";
  inputs: HookInputs;
  formIsValid: boolean;
}

export type FormActions = FormActionInputChange | FormActionSetData;
