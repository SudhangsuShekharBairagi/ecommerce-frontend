import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../redux/productSlice";
import FormUl from "../Component/FormUl";
import AlertMessage from "../Component/AlertMessage";

const AddProduct = () => {
  const initialProduct = {
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  };

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [altetInfo, setAltetInfo] = useState({ show: false, message: "" });
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      setAltetInfo({
        show: true,
        message: "Please select a product image.",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageFile", image);
      formData.append(
        "product",
        new Blob([JSON.stringify(product)], {
          type: "application/json",
        }),
      );

      await dispatch(createProductThunk(formData)).unwrap();
      setAltetInfo({
        show: true,
        message: "Product added successfully!",
      });
      setProduct(initialProduct);
      setImage(null);
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error adding product:", error);
      setAltetInfo({
        show: true,
        message: `Error: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {altetInfo.show && (
        <AlertMessage
          message={altetInfo.message}
          onClose={() => setAltetInfo({ show: false, message: " " })}
        />
      )}
      <FormUl
        productOparation="Add New Product"
        product={product}
        setProduct={setProduct}
        submitHandler={submitHandler}
        loading={loading}
        image={image}
        setImage={setImage}
      />
    </>
  );
};

export default AddProduct;
