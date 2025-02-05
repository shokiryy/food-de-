import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                          <div>
                              <div className='cart-items-item' key={item._id}>
                                <img src={item.image} alt="food" />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>${item.price * cartItems[item._id]}</p>
                                <p><span onClick={() => removeFromCart(item._id)} style={{ cursor: 'pointer', color: 'red' }}>x</span></p>
                            </div>
                            <hr />
                          </div>
                          
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                  <div className="cart-total-details">
                       <p>oraliq jami</p>
                       <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                    <p>Yetkazib berish narxi</p>
                    <p>${getTotalCartAmount()===0?0:2}</p>
                  </div>
                  <hr />
                  <div className="cart-total-details">
                   <b>jami</b>
                   <b>${ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                  </div>
                </div>
                <button onClick={()=>navigate('/order')}>PROCEES TO CHECKOUT</button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>if you have promo code, Enter it here</p>
                  <div className='cart-promocode-input'>
                       <input type="text" placeholder='promo code' />
                       <button>Sumbit</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Cart;
