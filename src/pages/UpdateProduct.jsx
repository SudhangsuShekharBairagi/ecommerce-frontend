import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FormUl from "../Component/FormUl";
import {
  fetchProductById,
  fetchProductImage,
  updateProductThunk,
  selectProductById,
} from "../redux/productSlice";
import AlertMessage from "../Component/AlertMessage";

const UpdateProduct = () => {
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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const productFromStore = useSelector((state) => selectProductById(state, id));
  const productImageUrl = useSelector((state) => state.products.imageUrls[id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchProductImage(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (productFromStore) {
      const normalizedDate =
        typeof productFromStore.releaseDate === "string" &&
        productFromStore.releaseDate.includes("T")
          ? productFromStore.releaseDate.split("T")[0]
          : productFromStore.releaseDate || "";

      setProduct({
        ...productFromStore,
        description:
          productFromStore.description ?? productFromStore.desc ?? "",
        releaseDate: normalizedDate,
      });
    }
  }, [productFromStore]);

  useEffect(() => {
    if (productImageUrl) {
      setImage(productImageUrl);
    }
  }, [productImageUrl]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      if (image && image instanceof File) {
        formData.append("imageFile", image);
      }

      const requestProduct = {
        ...product,
        description: product.description ?? product.desc ?? "",
      };
      delete requestProduct.desc;

      formData.append(
        "product",
        new Blob([JSON.stringify(requestProduct)], {
          type: "application/json",
        }),
      );

      await dispatch(updateProductThunk({ id, formData })).unwrap();
      setProduct(initialProduct);
      setImage(null);
      navigate("/");
      const fileInput = document.getElementById("image");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // alert(`Error: ${error.message}`);
       setAltetInfo({
        show: true,
        message: `Error: ${error.message}`,
       
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <> {altetInfo.show && (
             <AlertMessage message={altetInfo.message}  onClose={() => setAltetInfo({show: false, message:" "})}/>
      )}
    <FormUl
      productOparation="Update The Product"
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

export default UpdateProduct;
