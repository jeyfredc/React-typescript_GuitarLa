import { useEffect, useMemo, useState } from "react";
import { CartItem, Guitar } from "../types/types";

export const useCart=()=>{

    const initialCart = () : CartItem[] => {
        const localStorageGetCart = localStorage.getItem('cart')
    
        return localStorageGetCart ? JSON.parse(localStorageGetCart): []
      }
    
      const [cart, setCart] = useState(initialCart);
        
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
      
      
  
    
      function clearCart(){
        setCart([])
      }




      return{
        cart,
        clearCart
      }
}