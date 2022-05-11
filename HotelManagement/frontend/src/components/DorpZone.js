import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { truncate } from "../utils";
import Error from "./Error";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../config/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const override = css`
  display: flex;
  justify-content: center;
  alter-items: center;
`;

function getSize(maxSize) {

  if (maxSize.length === 7) {
    let str = `${maxSize.charAt(0)}`;
    return `${str}mb`;
  }

  if (maxSize.length === 8) {
    let str = maxSize.substring(0, 2);
    return `${str}mb`;
  }

  if (maxSize.length === 9) {
    let str = maxSize.substring(0, 3);
    return `${str}mb`;
  }

  if (maxSize.length === 6) {
    let str = maxSize.substring(0, 3);
    return `${str}kb`;
  }
  if (maxSize.length === 5) {
    let str = maxSize.substring(0, 2);
    return `${str}kb`;
  }

  if (maxSize.length === 4) {
    let str = maxSize.substring(0, 1);
    return `${str}kb`;
  }
}

function fileSizeLimit(file) {
  const maxLength = 1024 * 1024 * 2;
  if (file.size > maxLength) {
    return {
      code: "name-too-large",
      message: `File size is larger than ${getSize(`${maxLength}`)}`,
    };
  }

  return null;
}

function DorpZone(props) {

  const [files, setFiles] = useState([]);

  const [urls, setUrls] = useState([]);

  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const OnDorp = useCallback((acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => setError(file.errors[0].message));
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles((prev) => [
          ...prev,
          {
            name: file.name,
            src: reader.result,
            id: uuidv4(),
            type: file.type,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  if (error) setTimeout(() => setError(null), 3000);

  useEffect(() => {
    if (files.length > props.maxLength) {
      setError(`You can only upload ${props.maxLength} files`);
      setFiles(files.slice(0, 3));
    }
  }, []);

  useEffect(() => {
    if (urls.length === 3 && props.maxLength === 3) {
      props.setimageurl1(urls[0]);
      props.setimageurl2(urls[1]);
      props.setimageurl3(urls[2]);
      setUrls([]);
    }

    if (urls.length === 1 && props.maxLength === 1) {
      props.setimageurl1(urls[0]);
      setUrls([]);
    }
  }, [urls]);

  const onDropMemory = useMemo(() => OnDorp, [files, urls]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop: onDropMemory,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    multiple: props.multiple,
    validator: fileSizeLimit,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUpload = () => {
    setloading(true);
    files.map(async (file) => {
      const ext = file.name.split(".").pop();
      const imageRef = ref(storage, `${props.path}/${file.id}.${ext}`);
      const snapshot = await uploadString(imageRef, file.src, "data_url", {
        contentType: file.type,
      });
      const url = await getDownloadURL(snapshot.ref);
      setUrls((prev) => [...prev, url]);
      setFiles([]);
      setloading(false);
    });
  };
  const memory = useMemo(() => handleUpload, [urls, files]);

  return (
    <>
      {loading && (
        <div css={override}>
          <HashLoader color="#000" loading={loading} size={40} />
        </div>
      )}
      {error && <Error message={error} />}
      {files.length < props.maxLength && (
        <div className="container mt-4">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <em>(Only *.jpeg, *jpg and *.png images will be accepted)</em>
            {isDragAccept && <p>All files will be accepted</p>}
            {isDragReject && <p>Some files will be rejected</p>}
            {!isDragActive && <p>Drop some files here ...</p>}
          </div>
        </div>
      )}
      {files.length > 0 && (
        <>
          {files.map((file) => (
            <div
              key={file.id}
              className="container mt-3 d-flex justify-content-around align-items-center"
            >
              <img
                src={file.src}
                alt={file.name}
                style={{ width: "150px", height: "125px" }}
              />
              <span className="text-wrap" style={{ fontSize: "16px" }}>
                {truncate(file.name, 15)}
              </span>
              <span>
                <i
                  className="fa-solid fa-xmark"
                  style={{ cursor: "pointer", fontSize: "30px" }}
                  onClick={() =>
                    setFiles((prev) => prev.filter((f) => f.id !== file.id))
                  }
                ></i>
              </span>
            </div>
          ))}
          {files.length === props.maxLength && (
            <div className="d-flex justify-content-around align-items-center">
              <button className="btn mt-4 mb-3" onClick={memory}>
                Upload to Cloud
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default DorpZone;
