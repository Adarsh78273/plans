import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const hotelItems = [
  { id: 'h1', name: 'Budget Hostel',      price: 400,  emoji: '🛏️', category: 'Budget',  desc: 'Clean dorm beds, shared amenities' },
  { id: 'h3', name: 'Treebo Hotel',       price: 1500, emoji: '🏩', category: 'Standard', desc: 'Comfortable stay with breakfast' },
  { id: 'h4', name: 'Lemon Tree Hotel',   price: 2800, emoji: '🏪', category: 'Premium',  desc: 'Business hotel with pool & gym' },
  { id: 'h5', name: 'Taj Hotels',         price: 8500, emoji: '🏰', category: 'Luxury',   desc: 'Iconic 5-star luxury experience' },
  { id: 'h6', name: 'Airbnb Villa',       price: 3200, emoji: '🏡', category: 'Unique',   desc: 'Private villa with home-like feel' },
];

const categoryColor = {
  Budget:   'text-emerald-600',
  Standard: 'text-sky-600',
  Premium:  'text-violet-600',
  Luxury:   'text-amber-600',
  Unique:   'text-rose-600',
};

const Hotels = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem('tempHotel', JSON.stringify({ name: selected.name, price: selected.price }));
    setConfirmed(true);
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans text-stone-900">
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="relative h-[220px] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10">
          <p className="text-amber-400/80 text-[10px] font-semibold tracking-[0.35em] uppercase mb-2">
            Rest & Recharge
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide drop-shadow-xl">
            🏠 Choose Your Stay
          </h1>
          <p className="mt-2 text-amber-300/60 text-xs font-light tracking-[0.2em] uppercase italic">
            From cozy to luxurious — your choice
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 mt-10">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5 mb-8 group transition-all duration-200"
        >
          <span className="w-9 h-9 rounded-full bg-white border border-amber-200/60 shadow-sm flex items-center justify-center text-emerald-800 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-white transition-all duration-200 text-sm font-bold">
            ←
          </span>
          <span className="text-xs font-semibold text-stone-500 group-hover:text-amber-600 tracking-wider uppercase transition-colors duration-200">
            Back to Dashboard
          </span>
        </button>

        {/* ── Section Label ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[3px] h-7 bg-gradient-to-b from-amber-400 to-emerald-600 rounded-full" />
          <p className="text-[10px] tracking-[0.3em] text-amber-600 font-semibold uppercase">Select One</p>
          <h2 className="text-xl font-serif font-semibold text-stone-800">Available Stays</h2>
        </div>

        {/* ── Hotels List ── */}
        <div className="bg-white rounded-3xl border border-amber-100/80 shadow-md shadow-stone-200/60 overflow-hidden divide-y divide-stone-100">
          {hotelItems.map((item) => {
            const isSelected = selected?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-200 group
                  ${isSelected
                    ? 'bg-amber-50/70 border-l-[3px] border-l-amber-400'
                    : 'hover:bg-stone-50/80 border-l-[3px] border-l-transparent'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200
                    ${isSelected ? 'bg-amber-100' : 'bg-stone-100 group-hover:bg-amber-50'}`}>
                    {item.emoji}
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-sm transition-colors ${isSelected ? 'text-amber-700' : 'text-stone-800'}`}>
                      {item.name}
                    </p>
                    <p className="text-[11px] text-stone-400 font-light mt-0.5">{item.desc}</p>
                    <span className={`text-[9px] font-semibold tracking-widest uppercase mt-1 inline-block ${categoryColor[item.category] || 'text-amber-500/80'}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className={`font-serif text-lg font-semibold transition-colors ${isSelected ? 'text-amber-600' : 'text-emerald-700'}`}>
                    ₹{item.price.toLocaleString()}
                  </span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
                    ${isSelected
                      ? 'bg-amber-400 border-amber-400 text-white scale-110'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:border-amber-300'
                    }`}>
                    <span className="text-sm font-bold">{isSelected ? '✓' : '+'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Confirm Strip ── */}
        {selected && (
          <div className="mt-6 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 rounded-3xl p-6 flex items-center justify-between shadow-xl shadow-emerald-900/30 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="z-10">
              <p className="text-[9px] tracking-[0.25em] text-amber-400/70 uppercase mb-1">Selected Stay</p>
              <p className="text-white font-serif text-lg font-semibold">{selected.emoji} {selected.name}</p>
              <p className="text-amber-300 font-mono text-sm mt-0.5">₹{selected.price.toLocaleString()}</p>
            </div>
            <button
              onClick={handleConfirm}
              disabled={confirmed}
              className={`z-10 px-8 py-3.5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg active:scale-95
                ${confirmed
                  ? 'bg-emerald-400 text-emerald-950 shadow-emerald-400/30 scale-95'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 shadow-amber-400/30 hover:shadow-amber-400/50 hover:-translate-y-0.5'
                }`}
            >
              {confirmed ? '✓ Saved!' : '✦ Confirm'}
            </button>
          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f5f3ef; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #f59e0b, #065f46); border-radius: 99px; }
        ::selection { background: #fef3c7; color: #064e3b; }
      `}} />
    </div>
  );
};

export default Hotels;