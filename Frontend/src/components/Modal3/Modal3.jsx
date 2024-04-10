import axios from 'axios';
import "./Modal3.css";
import React, { useEffect, useState,useContext } from "react";
import {API_BASE_URL} from "../../api/config"

const Modal3 = ({ openModal, content, onCancel, style, stylebtn, onEmailSubmit }) => {
  const [responseData, setResponseData] = useState(null);

  const handleEmailSubmit = async () => {
    try {
      // Assuming you have an input field with id 'emailInput'
      const email = document.getElementById('emailInput').value;

      // Make API call
      const response = await axios.post(`${API_BASE_URL}/users/forgot_password`, {
        email: email,
      });

      // Handle API response
      setResponseData(response.data);

      // You can close the modal or perform other actions after a successful API call
      // onCancel(); // Commenting out this line to keep the modal open for displaying response data
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <>
      {openModal && (
        <div className="container-modal-ct" style={style}>
          <div className="wrapper-modal">
            <button onClick={onCancel} className="modal-btn">
              <i className="fa fa-close"></i>
            </button>
            <p className="modal-description">{responseData ? responseData : content}</p>
            <div className="modal-diff-button" style={stylebtn}>
              {!responseData && (
                <>
                  <input
                    type="email"
                    id="emailInput"
                    placeholder="Enter email"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      marginRight: '5px',
                      fontSize: '20px',
                    }}
                  />
                  <button onClick={handleEmailSubmit} className="btn-action yes">
                    Submit
                  </button>
                </>
              )}
              {responseData && (
                <button onClick={onCancel} className="btn-action yes">
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal3;
