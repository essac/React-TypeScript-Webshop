import { createContext } from "react";

interface ContextType {
    shopCart?: any;
    setShopCart?: any;
    removeShopCartItem?: any;
}
const CartContext = createContext<ContextType>({});

export default CartContext;