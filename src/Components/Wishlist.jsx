import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaEnvelope, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Navigation functions
  const handleclick = () => {
    navigate('/');
  };

  const aboutUs = () => {
    navigate('/about');
  };

  const artists = () => {
    navigate('/artists');
  };

  const navigateToArtworks = () => {
    navigate('/artworks');
  };

  const navigateToContact = () => {
    navigate('/contact');
  };

  const navigateToHome = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navigateToWishlist = () => {
    navigate('/wishlist');
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  // Load wishlist and cart on component mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/wishlist', {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          });
          
          const wishlistData = Array.isArray(response.data?.wishlist) 
            ? response.data.wishlist 
            : [];
          
          setWishlist(wishlistData);
          sessionStorage.setItem('wishlist', JSON.stringify({ wishlist: wishlistData }));
        } else {
          const sessionWishlist = sessionStorage.getItem('wishlist');
          if (sessionWishlist) {
            try {
              const parsed = JSON.parse(sessionWishlist);
              setWishlist(Array.isArray(parsed?.wishlist) ? parsed.wishlist : []);
            } catch (e) {
              console.error('Error parsing wishlist:', e);
              setWishlist([]);
            }
          }
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlist([]);
      }
    };

    const loadCart = () => {
      try {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(Array.isArray(parsedCart) ? parsedCart : []);
        }
      } catch (e) {
        console.error('Cart parsing error:', e);
        setCart([]);
      }
    };

    loadWishlist();
    loadCart();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async (artId) => {
    try {
      const token = localStorage.getItem('token');
      const updatedWishlist = wishlist.filter(item => item?.id !== artId);
      
      if (!token) {
        setWishlist(updatedWishlist);
        sessionStorage.setItem('wishlist', JSON.stringify({ wishlist: updatedWishlist }));
        return;
      }

      await axios.delete(`http://localhost:3000/api/wishlist/${artId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist(updatedWishlist);
      sessionStorage.setItem('wishlist', JSON.stringify({ wishlist: updatedWishlist }));
    } catch (error) {
      console.error('Remove error:', error);
      alert(error.response?.data?.message || 'Removal failed');
    }
  };

  // Add to cart
  const addToCart = async (artwork) => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.post('http://localhost:3000/api/cart', 
          { artwork },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // Sync with sessionStorage for guests
      const sessionCart = sessionStorage.getItem('cart');
      let currentCart = [];
      if (sessionCart) {
        const parsed = JSON.parse(sessionCart);
        currentCart = Array.isArray(parsed?.cart) ? parsed.cart : [];
      }
      if (!currentCart.some(item => item.id === artwork.id)) {
        const newCart = [...currentCart, artwork];
        sessionStorage.setItem('cart', JSON.stringify({ cart: newCart }));
        setCart(newCart);
        alert(`${artwork.title} added to cart!`);
      } else {
        alert('Already in cart!');
      }
    } catch (error) {
      console.error('Cart error:', error);
      alert('Error adding item to cart');
    }
  };

  // Count calculations
  const wishlistCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  return (
    <div className="wishlist-page">
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

      {/* Rest of the component remains the same */}
      <div className="wishlist-container">
        <h2 className="page-title">My Wishlist</h2>
        {wishlistCount === 0 ? (
          <div className="empty-wishlist">
            <h3>Your wishlist is empty</h3>
            <button className="browse-btn" onClick={() => navigate('/artworks')}>
              Browse Artworks
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist?.map((item) => (
              item && (
                <div className="wishlist-card" key={item.id}>
                  <div className="wishlist-img-container">
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={(e) => (e.target.src = '/api/placeholder/300/180?text=Image+Not+Available')}
                    />
                  </div>
                  <div className="wishlist-info">
                    <h3>{item.title}</h3>
                    <p className="artist-name">{item.artist}</p>
                    <p className="price">₹{item.price}</p>
                    <div className="wishlist-actions">
                      <button className="add-cart-btn" onClick={() => addToCart(item)}>
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
