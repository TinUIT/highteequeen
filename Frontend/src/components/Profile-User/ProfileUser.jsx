import "./ProfileUser.css";
import Header from "../../components/header/header";

import { Footer } from "../../components/footer/footer";
import Avartar from "../../assets/avatar.png";
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import axios from 'axios';
import {API_BASE_URL} from "../../api/config"

const ProfileUser = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [isMobile, setIsMobile] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [url, setUrl] = useState('');
  const { user, updateUserProfile } = useContext(UserContext);
  const [file, setFile] = useState(userInfo ? userInfo.image: {});
  const [fullName, setFullName] = useState(userInfo ? userInfo.userData.fullname : "");
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

  };

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

  useEffect(() => {
    if (userInfo.userData.avatar) {
      axios.get(`${API_BASE_URL}/users/avatars/${userInfo.userData.avatar}`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
        },
        responseType: 'arraybuffer',
      })
        .then(response => {
          const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const imageUrl = URL.createObjectURL(imageBlob);
          setUrl(imageUrl);
        })
        .catch(error => {
          console.error('Có lỗi khi lấy ảnh!', error);
        });
    }
  }, []);

  const handleFileChange = async (event) => {
    const newFile = event.target.files[0];

    // Kiểm tra xem có file mới được chọn không
    if (newFile) {
      try {
        // Sử dụng FormData để tạo một đối tượng chứa file
        const formData = new FormData();
        formData.append('file', newFile);

        // Gọi API upload ảnh
        const response = await axios.post(`${API_BASE_URL}/users/uploads/${userInfo.id}?id=${userInfo.id}&Authorization=${userInfo.token}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userInfo.token}`,
          },
          
        });

        const imageUrl = URL.createObjectURL(newFile);
        setUrl(imageUrl);
        const updatedUserInfo = { ...userInfo, userData: { ...userInfo.userData, avatar: response.data } };
        setUserInfo(updatedUserInfo);
        localStorage.setItem('user-info', JSON.stringify(updatedUserInfo));
      } catch (error) {
        console.error('Có lỗi khi upload ảnh!', error);
      }
    }
  };

  return (
    <>

      <hr></hr>
      <div className="Profile-person">
        <div className="wrapper-avartar">
          <img className="avartar-image" src={url}></img>
        </div>
        <div className="Wrapper-Name-Person">
          <div className="Name-person">{userInfo ? userInfo.userData.fullname : ""}</div>
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