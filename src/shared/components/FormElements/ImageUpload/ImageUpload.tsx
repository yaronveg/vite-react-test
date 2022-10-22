import "./ImageUpload.css";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";

const ImageUpload = (props: {
  id: string;
  center: boolean;
  onInput: (id: string, pickedFile: Blob, fileIsValid: boolean) => void;
  errorText: string;
}) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) return;
    // if (!file) {
    //   return;
    // }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview" onClick={pickImageHandler}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
