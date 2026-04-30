// src/components/TransportModule.jsx
import React, { useState } from 'react';

const transportOptions = [
  { id: 'bus', name: 'Luxury Bus', icon: '🚌', price: 800, desc: 'AC Seater/Sleeper' },
  { id: 'train', name: 'Express Train', icon: '🚆', price: 1200, desc: '3rd AC Economy' },
  { id: 'car', name: 'Private Cab', icon: '🚗', price: 2500, desc: 'Hatchback/Sedan' },
  { id: 'flight', name: 'Domestic Flight', icon: '✈️', price: 4500, desc: 'Economy Class' },
];

const TransportModule = ({ onAddTransport }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-black mb-4 text-gray-800 flex items-center gap-2">
        Pick Your Ride ⚡
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {transportOptions.map((option) => (
          <div 
            key={option.id}
            onClick={() => setSelected(option)}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
              selected?.id === option.id 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <h4 className="font-bold text-gray-800 text-sm">{option.name}</h4>
            <p className="text-[10px] text-gray-500 mb-2">{option.desc}</p>
            <p className="text-blue-700 font-black">₹{option.price}</p>
          </div>
        ))}
      </div>

      {selected && (
        <button 
          onClick={() => onAddTransport(selected)}
          className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all animate-pulse"
        >
          Add {selected.name} to Budget
        </button>
      )}
    </div>
  );
};

export default TransportModule;