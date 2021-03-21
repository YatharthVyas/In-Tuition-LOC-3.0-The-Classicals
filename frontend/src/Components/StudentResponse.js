import React, { useState } from "react";

const StudentResponse = () => {
  const [name, setName] = useState("");

  const uploadToFirebaseStorage = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase
      .storage()
      .ref("Responses/assingId/userId")
      .child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      // imageRef.set(url);
      onSubmit(url);
      // setPathFire(url);
    });
  };

  const onSubmit = (url) => {
    console.log(url);
    // if (proceed) {
    // console.log(dateTime);
    // uploadToFirebaseStorage();

    let date = new Date();
    let b = date.toString();
    let submitDateTime = b.substring(0, 21);
    console.log(submitDateTime);
    let response = {};
    let assignId = "6056bd40d5f12b00044e420b";
    response.name = name;
    response.istDateTime = submitDateTime;
    response.path = url;
    response.assignId = assignId;
    response.studentId = localStorage.getItem("userId");
    // assignment.fileName = res.name;
    // assignment.filePathLocal = res.uri;
    console.log("ASSIGN", response);
    sendResponse(response).then(() => {
      // navigation.goBack();
      console.log("SUCCESS");
    });
  };

  return (
    <div>
      <h1>Hi</h1>
      <input type="file" onChange={uploadToFirebaseStorage} />
    </div>
  );
};
export default StudentResponse;
