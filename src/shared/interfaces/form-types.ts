export type InputHandler = (
  id: string,
  value: String | Blob,
  isValid: boolean
) => void;
