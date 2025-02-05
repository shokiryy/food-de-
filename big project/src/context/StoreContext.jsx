import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets"; // food_list import qilindi
import axios, { Axios } from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Token localStorage dan o'qiladi

  useEffect(() => {
    localStorage.setItem("token", token); // Token har safar yangilanganda saqlanadi
  }, [token]);  // 'a' harfi olib tashlandi

  const addToCart = async (itemId) => {
    const newCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart)); // Savatchani localStorage ga saqlash
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, {});
    }
  };

  const removeFromCart = async  (itemId) => {
   setCartItems((prev) =>({ ...prev, [itemId]: prev[itemId]-1}));
   if (token) {
     await axios.post(url+"/api/cart/romove",{itemId},{headers:{token}})
   }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
    
   
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };
  
  // Sahifa refresh qilinganda savatchani localStorage'dan o'qib olish
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setCartItems(savedCart);
    }
    const fetchData = async () => {
      if (token) {
        await loadCartData(token);
      }
    };
    fetchData();
  }, [token]);


   
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
