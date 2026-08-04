import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { selectProductById } from "../redux/productSlice";
import AlertMessage from "../Component/AlertMessage";

const ProductInCart = React.memo(({ productId, quantity }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, productId));
  const [altetInfo, setAltetInfo] = useState({show: false, message:""})

  // console.log(product);

  const productImage = useSelector(
    (state) => state.products.imageUrls[productId],
  );

  const handleIncreaseQuantity = () => {
    if (product.quantity <= quantity) {
      // alert(`Sorry\nWe have only ${product.quantity} prices.`);
      setAltetInfo({
        show: true,
        message: `Sorry\nWe have only ${product.quantity} prices.`,
       
      });
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };

  if (!product) {
    return <div className="p-4 border-b">Loading Product...</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      {altetInfo.show && (
             <AlertMessage message={altetInfo.message}  onClose={() => setAltetInfo({show: false, message:" "})}/>
      )}
      <img
        src={productImage}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>

        <p>{product.brand}</p>

        <p>₹{product.price}</p>

        <div className="mt-2">
          <button onClick={() => dispatch(decreaseQuantity({ productId }))}>
            -
          </button>

          <span className="mx-3">{quantity}</span>

          <button onClick={() => handleIncreaseQuantity()}>+</button>
        </div>
      </div>

      <button onClick={() => dispatch(removeFromCart({ productId }))}>
        Remove
      </button>
    </div>
  );
});

export default ProductInCart;
