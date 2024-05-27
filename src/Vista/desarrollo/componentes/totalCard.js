import React from 'react';

function TotalCard({ titulo, cantidad }) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 flex-1">
      <h2 className="text-lg font-semibold mb-2">{titulo}</h2>
      <div className="text-4xl font-bold">{cantidad}</div>
    </div>
  );
}

export default TotalCard;
