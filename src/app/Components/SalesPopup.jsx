"use client"

import React, { useEffect, useState } from "react";

const SalesPopup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  const fakePurchases = [
    { name: "Ram", city: "Jaipur", time: "3 hours ago" },
    { name: "Sneha", city: "Mumbai", time: "1 hour ago" },
    { name: "Amit", city: "Delhi", time: "Just now" },
    { name: "Priya", city: "Pune", time: "2 hours ago" },
    { name: "John", city: "Bangalore", time: "5 minutes ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 4000); // show for 4 seconds

      setCurrentIndex((prev) => (prev + 1) % fakePurchases.length);
    }, 7000); // change popup every 7 seconds

    return () => clearInterval(interval);
  }, [fakePurchases.length]);

  const { name, city, time } = fakePurchases[currentIndex];

  return (
    <div className={`fixed bottom-6 left-6 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} bg-white shadow-lg border rounded-xl p-4 w-72 text-sm z-50`}>
      🛍️ <strong>{name}</strong> from <strong>{city}</strong> bought this <em>{time}</em>!
    </div>
  );
};

export default SalesPopup;
