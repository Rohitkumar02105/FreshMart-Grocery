import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Products could not be loaded. Please check the backend."))
      .finally(() => setLoading(false));
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.qty, 0),
    [cart]
  );

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item._id === product._id);

      if (existing) {
        return items.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...items, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link className="brand" to="/">
          FreshMart
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">Fresh groceries, fast delivery</p>
            <h1>Daily essentials delivered to your doorstep.</h1>
            <p>
              Shop fruits, dairy, bakery, grains, and vegetables from one simple
              FreshMart dashboard.
            </p>
          </div>
          <aside className="cart-summary">
            <span>Cart</span>
            <strong>{cart.length} items</strong>
            <p>Rs {cartTotal}</p>
          </aside>
        </section>

        <section className="store-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shop now</p>
              <h2>Popular products</h2>
            </div>
            <p>{products.length} products available</p>
          </div>

          {loading && <p className="notice">Loading products...</p>}
          {error && <p className="notice error">{error}</p>}

          <div className="product-container">
            {products.map((item) => (
              <article className="product-card" key={item._id || item.name}>
                <img src={item.image} alt={item.name} />
                <div className="product-info">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>Rs {item.price}</p>
                </div>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </article>
            ))}
          </div>
        </section>

        {cart.length > 0 && (
          <section className="cart-panel">
            <h2>Your cart</h2>
            {cart.map((item) => (
              <div className="cart-row" key={item._id}>
                <span>
                  {item.name} x {item.qty}
                </span>
                <strong>Rs {item.price * item.qty}</strong>
              </div>
            ))}
            <div className="cart-row total">
              <span>Total</span>
              <strong>Rs {cartTotal}</strong>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Products;
