import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => (
  <tr>
    <td className="border px-4 py-2">{item.title}</td>
    <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
    <td className="border px-4 py-2">
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
        className="w-16 text-center"
      />
    </td>
    <td className="border px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
    <td className="border px-4 py-2">
      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Remove
      </button>
    </td>
  </tr>
);

export default CartItem;
