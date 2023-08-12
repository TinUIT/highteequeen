import React, { useState, useContext } from "react";
import axios from "axios";
import "./AddProduct.css";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage";
import { app, storage } from "../../../firebase/firebase";


const Addproduct = (props) => {
  const [imagePath, setImagePath] = useState("");
  const [id, setId] = useState(props.product ? props.product.id: "");
  const [name, setName] = useState(props.product ? props.product.name : "");
  const [brand, setBrand] = useState(props.product ? props.product.brand : "");
  const [description, setDescription] = useState(props.product ? props.product.description : "");
  const [price, setPrice] = useState(props.product ? props.product.price : 0);
  const [origin, setOrigin] = useState(props.product ? props.product.origin : "");
  const [categoryName, setCategoryName] = useState(props.product ? props.product.categoryName : "");
  const [file, setFile] = useState(props.product ? props.product.image : null);

  console.log(id);

  const responseAddProduct = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/products", {
        name,
        brand,
        image: file && file.name ? file.name : file,
        price,
        description,
        categoryName,
        origin
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    if (file) {
      const storeRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storeRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Xử lý lỗi (nếu có)
          console.log(error);
        },
        () => {
          // Hoàn thành tải lên thành công
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            setUrl(downloadUrl);
          });
        }
      );
    }
  };

  const handleAddProduct = () => {
    responseAddProduct();
  };

  const responseUpdateProduct = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/products/${id}`, {
        id,
        name,
        brand,
        image: file && file.name,
        price,
        description,
        categoryName,
        origin
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    if (file) {
      const storeRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storeRef, file);

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

  const handleUpdateProduct = () => {
    responseUpdateProduct();
  };

  const [url, setUrl] = useState("");
  

  // Xử lý sự kiện khi người dùng chọn tệp hình ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
  
    reader.onload = (e) => {
      if(file) {
        setImagePath(e.target.result); // Lưu trữ đường dẫn hình ảnh vào state
      }
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="AddProduct">
      <div className="wrappper-Input-Product">
        <div className="input-add-product">
          <div className="Title-Input">NAME</div>
          <input
            className="add-produc-design-input"
            type="text"
            value = {name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-add-product">
          <div className="Title-Input">PRICE</div>
          <input
            className="add-produc-design-input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-add-product">
          <div className="Title-Input">IMAGE</div>
          <div className="wrapper-add-produc-design-input">
            <input
              className="add-produc-design-input imageProduct"
              type="text"
              value={file && file.name ? file.name : file}
              readOnly
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="Choose-image-admin">
              Choose file
            </label>
          </div>
        </div>

        <div className="input-add-product">
          <div className="Title-Input">CATEGORY</div>
          <select
            className="select"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName ? categoryName: null}
          >
            <option disabled selected hidden value="">
              Select Category
            </option>
            <option value="Lipstick">Lipstick</option>
            <option value="Powder">Powder</option>
            <option value="Eyeliner">Eyeliner</option>
            <option value="Primer">Primer</option>
            <option value="Blush">Blush</option>
            <option value="Cleanser">Cleanser</option>
            <option value="Cleansing Water">Cleansing Water</option>
            <option value="Toner">Toner</option>
          </select>
        </div>
        <div className="input-add-product">
          <div className="Title-Input">BRAND</div>
          <select
            className="select"
            onChange={(e) => setBrand(e.target.value)}
            value={brand ? brand: null}
          >
            <option disabled selected hidden value="">
              Select Brand
            </option>
            <option value="3CE">3CE</option>
            <option value="Black Rouge">Black Rouge</option>
            <option value="B.O.M">B.O.M</option>
            <option value="Maybelline">Maybelline</option>
            <option value="Aprilskin">Aprilskin</option>
            <option value="Lemonade">Lemonade</option>
          </select>
        </div>
        <div className="input-add-product">
          <div className="Title-Input">ORIGIN</div>
          <select
            className="select"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin ? origin: null} 
          >
            <option disabled selected hidden value="">
              Select Origin
            </option>
            <option value="Korea">Korea</option>
            <option value="America">America</option>
            <option value="VietNam">Viet Nam</option>
          </select>
        </div>
        <div className="input-add-product">
          <div className="Title-Input">DESCRIPTION</div>
          <input
            className="add-produc-design-input"
            type="text"
            value = {description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="Wrapper-Add-Admin-Add-Pd">
        <button
          className="Add-Admin-Add-Pd"
          onClick={props.type === "Add" ? handleAddProduct : handleUpdateProduct}
          // disabled={!name || !brand || !file.name || !price || !description || !categoryName || !origin}
        >
          {props.type}
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
