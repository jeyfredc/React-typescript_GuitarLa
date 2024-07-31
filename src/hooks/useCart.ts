import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export const useCart=()=>{

    const initialCart = () : CartItem[] => {
        const localStorageGetCart = localStorage.getItem('cart')
    
        return localStorageGetCart ? JSON.parse(localStorageGetCart): []
      }
    
      const [data] = useState(db);
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
    
      function removeFromCart(id:Guitar['id']) {
        const filterCart = cart.filter((guitar) => guitar.id !== id);
        setCart(filterCart);
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

  // State Derivado
  // si IsEmpty se pone como funcion sin uso de useMemo, donde se llame se debe poner isEmpty()
  // si se pone useMemo solo se agrega isEmpty, esto lo que cambia es parecido a un useEffect, 
  //solo se ejecuta cada vez que haya un cambio en cart
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  /* La diferencia entre las dos funciones es que isEmpty es implicita y por lo tanto devuelve verdadero o falso
     pero cartTotal es una funcion explicita y por lo tanto es necesario devolver el valor con un return o de locontrario 
     arrojara undefined
    */
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  },[cart]);


      return{
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
      }
}