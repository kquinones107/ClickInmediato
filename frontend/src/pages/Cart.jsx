import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate(); // Asegúrate de importar useNavigate desde react-router-dom
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">🛒 Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-sm text-blue-600 font-semibold">
                  Subtotal: ${item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="text-right mt-6 space-x-4 ">
            <p className="text-xl font-bold text-gray-800 mb-2">Total: ${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Vaciar carrito
            </button>
            <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;