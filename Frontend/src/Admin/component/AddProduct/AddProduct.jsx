import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AddProduct.css";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable
// } from "firebase/storage";
// import { app, storage } from "../../../firebase/firebase";



const Addproduct = (props) => {
  const [imagePaths, setImagePaths] = useState([]);
  const [id, setId] = useState(props.product ? props.product.id : "");
  const [name, setName] = useState(props.product ? props.product.name : "");
  const [brand, setBrand] = useState(props.product ? props.product.brand : "");
  const [description, setDescription] = useState(props.product ? props.product.description : "");
  const [price, setPrice] = useState(props.product ? props.product.price : 0);
  // const [origin, setOrigin] = useState(props.product ? props.product.origin : "");
  const [category_id, setCategory_id] = useState(props.product ? props.product.category_id : "");
  const [file, setFile] = useState(props.product ? props.product.image : null);
  const [inStock, setInStock] = useState(props.product ? props.product.inStock : 0);

  const categoryOptions = [
    { name: "Select Category", value: "" },
    { name: "Cleanser", value: "1" },
    // { name: "Cleansing Water", value: "7" },
    { name: "Eyeshadow", value: "2" },
    { name: "Toner", value: "3" },
    { name: "Lipstick", value: "4" },
    { name: "Powder", value: "5" },
    { name: "Eyeliner", value: "6" },
    { name: "Primer", value: "7" },
    { name: "Blush", value: "8" },
   
  ];

  const brandOptions = [
    { name: "Select Brand", value: "" },
    { name: "Cleanser", value: "1" },
    // { name: "Cleansing Water", value: "7" },
    { name: "Eyeshadow", value: "2" },
    { name: "Toner", value: "3" },
    { name: "Lipstick", value: "4" },
    { name: "Powder", value: "5" },
    { name: "Eyeliner", value: "6" },
    { name: "Primer", value: "7" },
    { name: "Blush", value: "8" },
   
  ];
  const handleCategoryChange = (e) => {
    setCategory_id(e.target.value);
  };

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const responseAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      // formData.append("brand", brand);
      imagePaths.forEach((image, index) => {
        formData.append(`images`, image.file);
      });
      formData.append("price", price);
      formData.append("description", description);
      formData.append("categoryId", category_id);
      // formData.append("categoryId", "1");
      // formData.append("origin", origin);
      formData.append("inStock", inStock);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const res = await axios.post("http://localhost:8080/api/v1/products", formData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
        },
      });
      console.log(res.data);

    } catch (error) {
      console.error(error);
    }
    // if (file) {
    //   const storeRef = ref(storage, `${file.name}`);
    //   const uploadTask = uploadBytesResumable(storeRef, file);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {},
    //     (error) => {
    //       // Xử lý lỗi (nếu có)
    //       console.log(error);
    //     },
    //     () => {
    //       // Hoàn thành tải lên thành công
    //       uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
    //         setUrl(downloadUrl);
    //       });
    //     }
    //   );
    // }
  };

  const handleAddProduct = () => {
    responseAddProduct();
  };

  const responseUpdateProduct = async () => {
    try {
      if (imagePaths.length > 0) {
        // Nếu có hình ảnh mới, cập nhật chúng
        const formData = new FormData();
        imagePaths.forEach((image, index) => {
          formData.append(`images`, image.file);
        });
        const resImages = await axios.post(`http://localhost:8080/api/v1/products/uploads/${id}`, formData, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
          },
        });
        console.log(resImages.data);
      }

      const res = await axios.put(`http://localhost:8080/api/v1/products/${id}`, {
        id,
        name,
        // brand,
        // image: file && file.name,
        price,
        description,
        category_id,
        // origin,
        inStock
      }, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
        },
      });
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    // if (file) {
    //   const storeRef = ref(storage, `${file.name}`);
    //   const uploadTask = uploadBytesResumable(storeRef, file);

    //   uploadTask.on('state_changed', 
    //     (snapshot) => {},
    //     (error) => console.log(error), 
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
    //         console.log("Download URL: ", downloadUrl);
    //         setUrl(downloadUrl);
    //       });
    //     }
    //   );
    // }
  };

  const handleUpdateProduct = () => {
    responseUpdateProduct();
  };

  const [url, setUrl] = useState("");


  // Xử lý sự kiện khi người dùng chọn tệp hình ảnh
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    const newImagePaths = Array.from(selectedFiles).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return { file, path: URL.createObjectURL(file) };
    });

    setImagePaths((prevImagePaths) => [...prevImagePaths, ...newImagePaths]);
    setFile(event.target.files[0]);
  };
  //xóa hình
  const handleRemoveImage = (index) => {
    const updatedImagePaths = [...imagePaths];
    updatedImagePaths.splice(index, 1);
    setImagePaths(updatedImagePaths);
    
  };
  
  useEffect(() => {
    // Check if it's an update operation and there is a product with images
    if (props.type === "Update" && props.product && props.product.product_images) {
      const images = props.product.product_images.map((image) => ({
        file: null, // Set file to null because it's an existing image
        path: `http://localhost:8080/api/v1/products/images/${image.image_url}`
      }));
      setImagePaths(images);
    }
  }, [props.product, props.type]);

  return (
    <div className="AddProduct">
      <div className="wrappper-Input-Product">
        <div className="input-add-product">
          <div className="Title-Input">NAME</div>
          <input
            className="add-produc-design-input"
            type="text"
            value={name}
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
            <div className="wrapper-add-product-image">
              {imagePaths.map((image, index) => (
                <div key={index} className="selected-image-container">
                  <img src={image.path} alt={`Selected ${index}`} />
                  <span className="remove-image" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </span>
                </div>
              ))}
            </div>

            {/* <input
              className="add-produc-design-input imageProduct"
              type="text"
              value={file && file.name ? file.name : file}
              readOnly
            /> */}
            <div>
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
        </div>

        <div className="input-add-product">
          <div className="Title-Input">CATEGORY</div>
          <select
            className="select"
            onChange={handleCategoryChange}
            value={category_id}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-add-product">
          <div className="Title-Input">BRAND</div>
          <select
            className="select"
            onChange={(e) => setBrand(e.target.value)}
            value={brand ? brand : null}
          >
            <option disabled selected hidden value="">
              Select Brand
            </option>
            <option value="3CE">3CE</option>
            <option value="Black Rouge">Black Rouge</option>
            <option value="B.O.M">B.O.M</option>
            <option value="Maybelline">Maybelline</option>
            <option value="Dior">Dior</option>
            <option value="MAC">MAC</option>
            <option value="LaRoche Posay">LaRoche Posay</option>
            <option value="Bioderma">Bioderma</option>
            <option value="NARS">NARS</option>
            <option value="L'Oreal">L'Oreal</option>
          </select>
        </div>
        {/* <div className="input-add-product">
          <div className="Title-Input">ORIGIN</div>
          <select
            className="select"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin ? origin : null}
          >
            <option disabled selected hidden value="">
              Select Origin
            </option>
            <option value="Korea">Korea</option>
            <option value="America">America</option>
            <option value="VietNam">Viet Nam</option>
          </select>
        </div> */}
        <div className="input-add-product">
          <div className="Title-Input">DESCRIPTION</div>
          <input
            className="add-produc-design-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-add-product">
          <div className="Title-Input">QUANTITY</div>
          <input
            className="add-produc-design-input"
            type="text"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          />
        </div>
      </div>
      <div className="Wrapper-Add-Admin-Add-Pd">
        <button
          className="Add-Admin-Add-Pd"
          onClick={props.type === "Add" ? handleAddProduct : handleUpdateProduct}
        // disabled={!name || !brand || !file.name || !price || !description || !category_id || !origin}
        >
          {props.type}
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
