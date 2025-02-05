import React, { useContext, useState } from 'react';
import './PlasceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlasceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const token = "your-auth-token"; // Tokenni autentifikatsiya tizimidan olish kerak
  const url = "http://localhost:4000"; // Server URL

  const onChangHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id]
      }));

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log('Sending order data:', orderData);

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('API response:', response.data);

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error in placing order:', error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlasceOrder;
