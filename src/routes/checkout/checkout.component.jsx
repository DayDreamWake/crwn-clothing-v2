import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItemPanel from "../../components/checkout-item-panel/checkout-item-panel.component";
export default function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-bar">
      <div className="checkout-item">
        {cartItems.map((item) => (
          <CheckoutItemPanel key={item.id} item={item} />
        ))}
      </div>
      <div className="total">{cartTotal}</div>
    </div>
  );
}
