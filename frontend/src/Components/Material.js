import React, { useEffect, useState } from "react";
import firebase from "../Components/firebase";
import "firebase/storage";
import "firebase/database";
import { v4 as uuid } from "uuid";

export default function Material() {
  const [file, setFile] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref("Material").child(id);
    const imageRef = firebase.database().ref("Material").child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.update({
        fileName: file.name,
        url: url,
      });
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };

  useEffect(() => {
    // getImageUrl();
    const onChildAdded = firebase
      .database()
      .ref(`Material`)
      .on("child_added", (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFile((files) => [...files, ...helperArr]);
        console.log(snapshot.val());
      });
    return () =>
      firebase.database().ref("Material").off("child_added", onChildAdded);
  });

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {/* <input type="file" accept="image/*" onChange={readImages} /> */}
      {/* {file && file.map(({}))} */}
    </div>
  );
}
