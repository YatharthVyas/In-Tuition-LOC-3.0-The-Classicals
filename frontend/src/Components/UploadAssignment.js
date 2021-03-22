import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendResponse } from "./helper";
import firebase from "../Components/firebase";
import "firebase/storage";

const StudentResponse = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState(null);

  const params = useParams();
  const assignId = params.assignId;

  const uploadToFirebaseStorage = async (e) => {
    const file = e.target.files[0];
    const id = localStorage.getItem("userId");
    const storageRef = firebase
      .storage()
      .ref(`Responses`)
      .child(assignId)
      .child(id);
    storageRef.put(file).then(() => {
      storageRef
        .getDownloadURL()
        .then(async (url) => {
          // imageRef.set(url);
          // onSubmit(url);
          setPath(url);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const onSubmit = () => {
    console.log(path);
    let date = new Date();
    let b = date.toString();
    let submitDateTime = b.substring(0, 21);
    console.log(submitDateTime);
    let response = {};
    response.name = name;
    response.istDateTime = submitDateTime;
    response.path = path;
    response.assignId = assignId;
    response.studentId = localStorage.getItem("userId");
    console.log("ASSIGN", response);
    sendResponse(response).then(() => {
      // navigation.goBack();
      console.log("SUCCESS");
    });
  };

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div>
      <h1>Upload Assignment</h1>
      <label>Name of File </label>

      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input type="file" onChange={uploadToFirebaseStorage} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
export default StudentResponse;
