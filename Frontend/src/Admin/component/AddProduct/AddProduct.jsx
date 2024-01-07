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
  const [brand_id, setBrand_id] = useState(props.product ? props.product.brand : "");
  const [description, setDescription] = useState(props.product ? props.product.description : "");
  const [price, setPrice] = useState(props.product ? props.product.price : 0);
  // const [origin, setOrigin] = useState(props.product ? props.product.origin : "");
  const [category_id, setCategory_id] = useState(props.product ? props.product.category_id : "");
  const [file, setFile] = useState(props.product ? props.product.image : null);
  const [inStock, setInStock] = useState(props.product ? props.product.inStock : 0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [discountPercent, setDiscountPercent] = useState(props.product ? props.product.discountPercent : 0);
  const [categoryName, setCategoryName] = useState(props.product ? props.product.brandName : "");
  const [brandName, setBrandName] = useState(props.product ? props.product.brandName : "");

  // const handleCategoryChange = (e) => {
  //   setCategory_id(e.target.value);
  // };

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
      formData.append("brandId", brand_id);
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
        brand_id,
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

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/brands`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching brands!', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/categories?page=0&limit=10`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching brands!', error);
      });
  }, []);

  const getCategoryId = (category_name) => {
    const category = categories.find(category => category.name === category_name);
    console.log(category);
    return category ? category.id : "";
  };

  const getBrandId = (brand_name) => {
    const brand = brands.find(brand => brand.name === brand_name);
    return brand ? brand.id : "0";
  };
  const getCategoryName = (category_id) => {
    const category = categories.find(category => category.id === category_id);
    return category ? category.name : "";
  };
  const getBrandName = (brand_id) => {
    const brand = brands.find(brand => brand.id === brand_id);
    return brand ? brand.name : "";
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/brands`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching brands!', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/categories?page=0&limit=10`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching brands!', error);
      });
  }, []);



  // useEffect(() => {
  //   // Check if it's an update operation and there is a product with a categoryName
  //   if (props.type === "Update" && props.product && props.product.categoryName) {
  //     setCategoryName(getCategoryName(props.product.category_id));
  //     setBrandName(getBrandName(props.product.brand_id));
  //     // setSelectedCategory(getCategoryName(props.product.category_id));
  //     // setSelectedBrand(getBrandName(props.product.brand_id));
  //   }
  // }, [props.product, props.type]);


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
        {/* {props.type === "Update" && (
          <div>
            <div className="input-add-product">
              <div className="Title-Input">CATEGORY</div>
              <select
                className="select"
                onChange={(e) => {
                  setCategory_id(getCategoryId(e.target.value));
                  setSelectedCategory(e.target.value);
                }}
                value={selectedCategory}
              >
                <option disabled selected hidden value={selectedCategory}>
                {selectedCategory}
                </option>
                <option value="Cleanser">Cleanser</option>
                <option value="Eyeshadow">Eyeshadow</option>
                <option value="Toner">Toner</option>
                <option value="Lipstick">Lipstick</option>
                <option value="Powder">Powder</option>
                <option value="Eyeliner">Eyeliner</option>
                <option value="Primer">Primer</option>
                <option value="Blush">Blush</option>
              </select>
            </div>
            <div className="input-add-product">
              <div className="Title-Input">BRAND</div>
              <select
                className="select"
                onChange={(e) => {
                  setBrand_id(getBrandId(e.target.value));
                  setSelectedBrand(e.target.value);
                }}
                value={selectedBrand}
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
          </div>
        )} */}
        {props.type === "Update" &&  (
          <div>
            {/* {setCategoryName(getCategoryName(props.product.category_id))}
                {setBrandName(getBrandName(props.product.brand_id))} */}
            <div className="input-add-product">
              <div className="Title-Input">CATEGORY</div>
              <select
                className="select"
                onChange={(e) => {
                  setCategory_id(getCategoryId(e.target.value));
                  setSelectedCategory(e.target.value);
                }}
                value={selectedCategory}
              >
                
                <option disabled hidden defaultValue={getCategoryName(category_id)}>
                  {getCategoryName(category_id)}
                </option>
                
                <option value="Cleanser">Cleanser</option>
                <option value="Eyeshadow">Eyeshadow</option>
                <option value="Toner">Toner</option>
                <option value="Lipstick">Lipstick</option>
                <option value="Powder">Powder</option>
                <option value="Eyeliner">Eyeliner</option>
                <option value="Primer">Primer</option>
                <option value="Blush">Blush</option>
              </select>
            </div>
            <div className="input-add-product">
              <div className="Title-Input">BRAND</div>
              <select
                className="select"
                onChange={(e) => {
                  setBrand_id(getBrandId(e.target.value));
                  setSelectedBrand(e.target.value);
                }}
                value={selectedBrand}
              >
                <option disabled defaultValue={brandName} hidden>
  {brandName}
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
          </div>
        )}
        {props.type === "Add" && (
          <div>
            <div className="input-add-product">
              <div className="Title-Input">CATEGORY</div>
              <select
                className="select"
                onChange={(e) => {
                  setCategory_id(getCategoryId(e.target.value));
                  setSelectedCategory(e.target.value);
                }}
                value={selectedCategory}
              >
                <option disabled selected hidden value="">
                  Select Category
                </option>
                <option value="Cleanser">Cleanser</option>
                <option value="Eyeshadow">Eyeshadow</option>
                <option value="Toner">Toner</option>
                <option value="Lipstick">Lipstick</option>
                <option value="Powder">Powder</option>
                <option value="Eyeliner">Eyeliner</option>
                <option value="Primer">Primer</option>
                <option value="Blush">Blush</option>
              </select>
            </div>
            <div className="input-add-product">
              <div className="Title-Input">CATEGORY</div>
              <select
                className="select"
                onChange={(e) => {
                  setBrand_id(getBrandId(e.target.value));
                  setSelectedBrand(e.target.value);
                }}
                value={selectedBrand}
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
          </div>
        )}

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
        {props.type === "Update" && (
          <div className="input-add-product">
            <div className="Title-Input">DISCOUNT</div>
            <input
              className="add-produc-design-input"
              type="text"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </div>
        )}
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
