import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Food = () => {
  const [cart, setCart] = useState([]);
  
  const menu = [
    { id: 1, name: "Classic Pizza", price: 350 },
    { id: 2, name: "Burger Combo", price: 200 },
    { id: 3, name: "Pasta White Sauce", price: 280 }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmOrder = () => {
    const foodData = { restaurant: "Traveler's Cafe", price: totalPrice, items: cart.length };
    localStorage.setItem('tempFood', JSON.stringify(foodData));
    alert("Food added to budget!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-10">
        <h1 className="text-3xl font-black mb-6">Choose Your Meal 🍕</h1>
        <div className="bg-white rounded-3xl p-6 shadow-sm border mb-6">
          {menu.map(item => (
            <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-0">
              <span className="font-bold">{item.name} - ₹{item.price}</span>
              <button onClick={() => addToCart(item)} className="bg-green-100 text-green-700 px-4 py-1 rounded-lg font-bold">+</button>
            </div>
          ))}
        </div>
        
        {cart.length > 0 && (
          <div className="bg-black text-white p-6 rounded-3xl">
            <p className="font-bold">Items: {cart.length}</p>
            <h2 className="text-2xl font-black">Total: ₹{totalPrice}</h2>
            <button onClick={confirmOrder} className="w-full bg-green-500 mt-4 py-3 rounded-xl font-black text-white">CONFIRM FOOD ➔</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;