import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

export default function CheckoutItemPanel({ item }) {
  const { removeItemFromCart, reduceItem, addItemToCart } =
    useContext(CartContext);
  function handleRemove() {
    removeItemFromCart(item);
  }
  function handleAdd() {
    addItemToCart(item);
  }
  function handleReduce() {
    reduceItem(item);
  }

  return (
    <div className="ItemPanel">
      <div className="checkoutItem">
        <CartItem key={item.id} cartItem={item} />
      </div>
      <div className="reduceBtn">
        <Button onClick={()=>handleReduce(item)}>reduce</Button>
      </div>
      <div>{item.quantity}</div>
      <div className="addBtn">
        <Button onClick={()=>handleAdd(item)}>add</Button>
      </div>
      <div className="clear">
        <Button onClick={()=>handleRemove(item)}>x</Button>
      </div>
    </div>
  );
}
