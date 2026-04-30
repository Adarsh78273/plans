import React, { useState } from 'react';

const Budget = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (name && price) {
      setItems([...items, { name, price: parseFloat(price) }]);
      setName('');
      setPrice('');
    }
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Expense name" 
          className="border p-2 rounded w-full text-sm" 
        />
        <input 
          type="number"
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          placeholder="Price" 
          className="border p-2 rounded w-24 text-sm" 
        />
        <button onClick={addItem} className="bg-blue-600 text-white px-4 rounded-lg">+</button>
      </div>
      
      <div className="max-h-40 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-1 text-sm text-gray-600">
            <span>{item.name}</span>
            <span className="font-bold">₹{item.price}</span>
          </div>
        ))}
      </div>
      
      <div className="pt-2 border-t flex justify-between font-bold text-lg text-gray-800">
        <span>Total:</span>
        <span className="text-blue-600">₹{total}</span>
      </div>
    </div>
  );
};

export default Budget;