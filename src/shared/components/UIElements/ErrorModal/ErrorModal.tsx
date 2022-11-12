import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";

const ErrorModal = (props: {
  onClear: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  error?: boolean;
}) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
