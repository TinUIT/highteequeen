import "./ProfileUser.css";
import Header from "../../components/header/header";

import { Footer } from "../../components/footer/footer";
import Avartar from "../../assets/avatar.png";
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app, storage } from "../../firebase/firebase";
import { UserContext } from "../../contexts/UserContext";
import axios from 'axios';

const ProfileUser = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [isMobile, setIsMobile] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [url, setUrl] = useState('');
  const { user, updateUserProfile } = useContext(UserContext);
  const [file, setFile] = useState(userInfo ? userInfo.image: {});
  const [fullName, setFullName] = useState(userInfo ? userInfo.fullName : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [address, setAddress] = useState(userInfo ? userInfo.address: "");
  const [phone, setPhone] = useState(userInfo ? userInfo.phone : "")  

  const handleSave = async () => {
    const newCustomerData = {
      fullName, 
      email,
      phone,
      address,
      image: file.name ? file.name : userInfo.image
    };
    console.log(file.name);
    const updatedCustomer = await updateCustomer(userInfo.customerId, newCustomerData);

  };

  const updateCustomer = async (customerId, customerDto) => {
    const response = await axios.put(`http://localhost:8080/api/v1/customer/${customerId}`, customerDto);
    localStorage.setItem('user-info', JSON.stringify(response.data));
    updateUserProfile(response.data);
    return response.data;
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      const storeRef = ref(storage, `Avartar-User/${newFile.name}`);
      const uploadTask = uploadBytesResumable(storeRef, newFile);
  
      uploadTask.on('state_changed', 
        (snapshot) => {},
        (error) => console.log(error), 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("Download URL: ", downloadUrl);
            setUrl(downloadUrl);
          });
        }
      );

    }
    
  };

  useEffect(() => {
    if(userInfo.image) {
      const storeRef = ref(storage, `Avartar-User/${userInfo.image}`);
      getDownloadURL(storeRef).then((downloadUrl) => {
        console.log("Download URL: ", downloadUrl);
        setUrl(downloadUrl);
      });
    }
    handleSave();
  }, [file])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>

      <hr></hr>
      <div className="Profile-person">
        <div className="wrapper-avartar">
          <img className="avartar-image" src={url}></img>
        </div>
        <div className="Wrapper-Name-Person">
          <div className="Name-person">{user ? user.fullName : ""}</div>
          <div className="Wrapper-edit">
            <i class="edit-profile far fa-edit"></i>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} 
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="Bt-edit" >
              Edit Avatar
            </label>

          </div>
        </div>
        <div>

        </div>
      </div>
      <hr></hr>



    </>
  );
};

export default ProfileUser;