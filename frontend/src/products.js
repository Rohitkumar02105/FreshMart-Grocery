import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://freshmart-hw7q.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* Navbar */}

      <div className="navbar">
        <h2>🛒 FreshMart</h2>

        <div>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </div>
      </div>

      {/* Title */}

      <h1 className="title">FreshMart Store</h1>

      {/* Products */}

      <div className="product-container">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
              alt={item.name}
            />

            <h2>{item.name}</h2>

            <p>₹{item.price}</p>

            <button
              onClick={() =>
                alert(item.name + " Added To Cart")
              }
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;