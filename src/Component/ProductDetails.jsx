import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  fetchProductById,
  fetchProductImage,
  deleteProductThunk,
  selectProductById,
} from "../redux/productSlice";
import AlertMessage from "./AlertMessage";
import BackendStatus from "./BackendStatus";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductById(state, id));
  const imageUrl = useSelector((state) => state.products.imageUrls[id]);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const role = useSelector((state) => state.auth.role);
  const { token } = useSelector((state) => state.auth);
  const [productAddMessage, setProductAddMessage] = React.useState("");

  const cartItems = useSelector((state) => state.cart);
  // console.log("Current cart items from Redux store:", cartItems);
  const [altetInfo, setAltetInfo] = useState({ show: false, message: "" });
  useEffect(() => {
    if (!id) return;
    if (!product) {
      dispatch(fetchProductById(id));
    }
    if (id && !imageUrl) {
      dispatch(fetchProductImage(id));
    }
  }, [dispatch, id, product, imageUrl]);

  const deleteProduct = async () => {
    try {
      await dispatch(deleteProductThunk(id)).unwrap();
      navigate("/");
      // alert("Deleted");
      <AlertMessage message="Deleted" />;
      setAltetInfo({
        show: true,
        message: "Deleted",
      });
    } catch (err) {
      // alert(err.message || "Delete failed.");
      <AlertMessage message="Deleted" />;
      setAltetInfo({
        show: true,
        message: "Delete Failed",
      });
    }
  };

  const handleEditClick = () => {
    navigate(`/update/${id}`);
  };

  const handleQuantity = () => {
    const avl = cartItems.find((items) => items.productId === product.id) || {
      productId: "",
      quantity: "",
    };
    if (!token) {
      navigate("/login");

      return;
    }

    if (avl.productId === product.id && avl.quantity >= product.quantity) {
      // alert(`Sorry\nWe have only ${product.quantity} prices.`);
      setAltetInfo({
        show: true,
        message: `Sorry\nWe have only ${product.quantity} prices.`,
      });
    } else {
      dispatch(addToCart({ productId: product.id, quantity: 1 }));
    }
  };
  // console.log(cartItems.find(items => items.productId === product.id || items.quantity <= product.quantity))

  // console.log(cartItems, product.id)
  // const handleAddToCart = (id) => {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const existingProduct = cart.find((item) => item.productId === id);

  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //     console.log(`You have successfully added ${existingProduct.quantity} of this product to your cart.`);
  //   } else {
  //     cart.push({
  //       productId: id,
  //       quantity: 1,
  //     });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   window.dispatchEvent(new Event("cartUpdated"));
  // };

  // const handleAddToCart = async (id) => {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   try {
  //     const message = await checkout(id, 1);

  //     alert(message);

  //     const updatedProduct = await getProductById(id);
  //     setProduct(updatedProduct);

  //      const existingProduct = cart.find((item) => item.productId === id);

  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //     console.log(`You have successfully added ${existingProduct.quantity} of this product to your cart.`);
  //   } else {
  //     cart.push({
  //       productId: id,
  //       quantity: 1,
  //     });
  //   }
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     window.dispatchEvent(new Event("cartUpdated"));
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  if (loading && !product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">
            Loading product details... This application is hosted on a free
            deployment service, so the backend may take a few moments to start
            after a period of inactivity. Please wait a moment while we get
            things ready.
          </h1>
          <BackendStatus />
        </div>
      </div>
    );
  }

  if ((!product && error) || (!product && !loading)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-8 py-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-rose-700">
            {error || "Product not found"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      {altetInfo.show && (
        <AlertMessage
          message={altetInfo.message}
          onClose={() => setAltetInfo({ show: false, message: " " })}
        />
      )}
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_-25px_rgba(15,23,42,0.35)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-8 sm:p-10">
              <img
                src={imageUrl}
                alt={product?.name || "Product image"}
                className="w-full max-w-md rounded-[24px] object-contain shadow-sm transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div>
                <span className="mb-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {product.category}
                </span>

                <h1 className="mb-3 text-3xl font-semibold text-slate-900 md:text-4xl">
                  {product.name}
                </h1>
                <h5 className="mb-5 text-lg font-semibold text-slate-600">
                  by {product.brand}
                </h5>
                <p className="mb-6 text-base leading-7 text-slate-600">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-4xl font-semibold text-emerald-600">
                    ₹{product.price}
                  </span>

                  <button
                    disabled={!product.available}
                    className={`rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-300 ${
                      product.available
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg"
                        : "cursor-not-allowed bg-slate-400 cursor-pointer"
                    }`}
                    onClick={() => {
                      product.available && handleQuantity();
                    }}
                  >
                    {product.available ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">
                    Stock Available:
                  </span>
                  <span className="text-base font-semibold text-emerald-600">
                    {product.quantity}
                  </span>
                </div>

                <div className="text-sm text-slate-600">
                  <span className="font-medium text-slate-700">
                    Product listed on:{" "}
                  </span>
                  <span className="italic">
                    {new Date(product.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {role === "ROLE_ADMIN" && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={deleteProduct}
                    className="rounded-2xl bg-rose-500 px-5 py-3 font-semibold text-white transition hover:bg-rose-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
