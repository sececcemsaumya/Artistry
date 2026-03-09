import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaHeart, FaShoppingCart, FaEnvelope, FaUser } from 'react-icons/fa';
import axios from 'axios';

const SHIPPING_COST = 99;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Navigation handlers
  const handleclick = () => navigate('/');
  const aboutUs = () => navigate('/about');
  const artists = () => navigate('/artists');
  const navigateToArtworks = () => navigate('/artworks');
  const navigateToContact = () => navigate('/contact');
  const navigateToHome = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const navigateToWishlist = () => navigate('/wishlist');
  const navigateToCart = () => navigate('/cart');

  // Load cart and wishlist
  useEffect(() => {
    const token = localStorage.getItem('token');

    const loadCart = async () => {
      try {
        if (token) {
          const response = await axios.get('https://art-gallery-backend-2-oemw.onrender.com/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const cartData = Array.isArray(response.data?.cart) ? response.data.cart : [];
          setCart(cartData);
          sessionStorage.setItem('cart', JSON.stringify({ cart: cartData }));
        } else {
          const sessionCart = sessionStorage.getItem('cart');
          if (sessionCart) {
            try {
              const parsed = JSON.parse(sessionCart);
              setCart(Array.isArray(parsed?.cart) ? parsed.cart : []);
            } catch (e) {
              console.error('Error parsing cart:', e);
              setCart([]);
            }
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      }
    };

    const loadWishlist = () => {
      const sessionWishlist = sessionStorage.getItem('wishlist');
      if (sessionWishlist) {
        try {
          const parsed = JSON.parse(sessionWishlist);
          setWishlist(Array.isArray(parsed?.wishlist) ? parsed.wishlist : []);
        } catch (e) {
          console.error('Wishlist parsing error:', e);
          setWishlist([]);
        }
      }
    };

    loadCart();
    loadWishlist();
  }, []);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(totalAmount);
  }, [cart]);

  const removeFromCart = async (artId) => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.delete(`https://art-gallery-backend-2-oemw.onrender.com/api/cart/${artId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      const newCart = cart.filter(item => item?.id !== artId);
      setCart(newCart);
      sessionStorage.setItem('cart', JSON.stringify({ cart: newCart }));
    } catch (error) {
      console.error('Remove error:', error);
      alert(error.response?.data?.message || 'Removal failed');
    }
  };

 const handleCheckout = async () => {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      await axios.post('https://art-gallery-backend-2-oemw.onrender.com/api/orders', 
        { 
          items: cart,
          total: total 
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    }
    setCart([]);
    sessionStorage.removeItem('cart');
    alert('Order placed successfully!');
    navigate('/payment', { 
      state: { 
        amount: total + SHIPPING_COST 
      } 
    });
  } catch (error) {
    console.error('Checkout error:', error);
    alert(error.response?.data?.message || 'Checkout failed');
  }
};


  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  return (
    <div className="cart-page">
      <nav className="navbar glass-navbar">
        <div className="navbar-left" onClick={handleclick} style={{ cursor: 'pointer' }}>
          <span className="logo">🎨 Artistry</span>
        </div>
        <div className="navbar-center">
          <a onClick={handleclick}>Home</a>
          <a onClick={aboutUs}>About Us</a>
          <a onClick={artists}>Artists</a>
          <a onClick={navigateToArtworks}>ArtWorks</a>
          <a onClick={navigateToContact}>Contact</a>
          <a onClick={navigateToHome}>Logout</a>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" onClick={navigateToWishlist} title="Wishlist">
            <FaHeart color={wishlistCount > 0 ? "#fff" : "#fff"} size={22} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={navigateToCart} title="Cart">
            <FaShoppingCart color={cartCount > 0 ? "#fff" : "#fff"} size={22} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
      
        </div>
      </nav>

      <div className="cart-container">
        <div className="cart-grid">
          <h2 className="page-title">My Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <button className="browse-btn" onClick={() => navigate('/artworks')}>
                Browse Artworks
              </button>
            </div>
          ) : (
            cart.map((item) => (
              item && (
                <div className="cart-card" key={item.id}>
                  <div className="cart-img-container">
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={(e) => (e.target.src = '/api/placeholder/300/180?text=Image+Not+Available')}
                    />
                  </div>
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p className="artist-name">{item.artist}</p>
                    <p className="price">{'\u20B9'}{item.price}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              )
            ))
          )}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Items:</span>
            <span>{cart.length}</span>
          </div>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>{'\u20B9'}{total}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>{cart.length > 0 ? `\u20B9${SHIPPING_COST}` : '\u20B9' + 0}</span>
          </div>
          <hr />
          <div className="summary-item total-row">
            <span>Total:</span>
            <span className="total-amount">
              {'\u20B9'}{cart.length > 0 ? total + SHIPPING_COST : 0}
            </span>
          </div>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
          <p className="checkout-note">
            Secure checkout. All major cards accepted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
