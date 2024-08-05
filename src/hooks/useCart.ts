import { useEffect, useMemo, useState } from "react";
import { CartItem, Guitar } from "../types/types";

export const useCart=()=>{

    const initialCart = () : CartItem[] => {
        const localStorageGetCart = localStorage.getItem('cart')
    
        return localStorageGetCart ? JSON.parse(localStorageGetCart): []
      }
    
      const [cart, setCart] = useState(initialCart);
    
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
      
    
    
      function addToCart(item:Guitar) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExists >= 0) {
          if(cart[itemExists].quantity >= MAX_ITEMS) return
          const updatedCart = [...cart];
          updatedCart[itemExists].quantity++;
          setCart(updatedCart);
        } else {
          //aplicar casteo
          // item.quantity = 1;
          const newItem: CartItem = {...item, quantity :1}
          setCart([...cart, newItem]);
        }
      }
  
    
      /* Guitar['id'] solo esta heredando el id del objeto Guitar y no puede heredar ninguna otra propiedad */
      function increaseQuantity(id:Guitar['id']) {
        const updatedCart = cart.map((item) => {
          if (item.id === id && item.quantity < MAX_ITEMS) {
            return {
              ...item,
              quantity: item.quantity +1,
            };
          }
          return item;
        });
    
        setCart(updatedCart);
      }
    
      function decreaseQuantity(id:Guitar['id']){
        const updatedCart = cart.map((item)=>{
          if(item.id === id &&  MIN_ITEMS < item.quantity ){
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart(){
        setCart([])
      }




      return{
        cart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart
      }
}