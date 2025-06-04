import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:3000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(ordersResponse.data);

        // Fetch wishlist count
        const wishlistResponse = await axios.get('http://localhost:3000/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlistCount(wishlistResponse.data.wishlist?.length || 0);

        // Fetch cart count
        const cartResponse = await axios.get('http://localhost:3000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartCount(cartResponse.data.cart?.length || 0);

      } catch (error) {
        console.error('Data fetch error:', error);
      }
    };

    fetchData();
  }, [navigate]);

  // Navigation handlers
  const handleNavigation = {
    home: () => navigate('/'),
    about: () => navigate('/about'),
    artists: () => navigate('/artists'),
    artworks: () => navigate('/artworks'),
    wishlist: () => navigate('/wishlist'),
    cart: () => navigate('/cart'),
    contact: () => navigate('/contact'),
    logout: () => {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <div className="orders-container"> {/* Add this wrapper div */}
      <nav className="navbar glass-navbar">
        <div className="navbar-left" onClick={handleNavigation.home}>
          <span className="logo">🎨 Artistry</span>
        </div>
        <div className="navbar-center">
          <a onClick={handleNavigation.home}>Home</a>
          <a onClick={handleNavigation.about}>About Us</a>
          <a onClick={handleNavigation.artists}>Artists</a>
          <a onClick={handleNavigation.artworks}>ArtWorks</a>
          <a onClick={handleNavigation.contact}>Contact</a>
          <a onClick={handleNavigation.logout}>Logout</a>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" onClick={handleNavigation.wishlist} title="Wishlist">
            <FaHeart color="#fff" size={22} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={handleNavigation.cart} title="Cart">
            <FaShoppingCart color="#fff" size={22} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <div className="orders-page">
        <h2 className="page-title">Order History</h2>
        <div className="orders-grid">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-img-container">
                  <img src={order.items[0]?.img} alt={order.items[0]?.title} />
                </div>
                <div className="order-info">
                  <h3>{order.items[0]?.title}</h3>
                  <div className="order-artist">{order.items[0]?.artist}</div>
                  <div className="order-price">₹{order.items[0]?.price}</div>
                  <div className="order-status">Status: {order.status}</div>
                  <div className="order-total">Total: ₹{order.total}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
