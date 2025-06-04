import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });

    // Redirect to /artworks after 2 seconds
    setTimeout(() => {
      navigate('/artworks');
    }, 2000); // 2000ms = 2 seconds
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>
        {submitted ? (
          <div className="contact-success">
            <FaEnvelope size={36} color="#2d8f5e" />
            <p>Thank you for contacting us! We will get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <label>
              Name<span className="required">*</span>
              <FaUser className="contact-icon" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </label>
            <label>
              Email<span className="required">*</span>
              <FaEnvelope className="contact-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </label>
            <label>
              Phone
              <FaPhone className="contact-icon" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                maxLength={15}
              />
            </label>
            <label>
              Message<span className="required">*</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
              />
            </label>
            {error && <div className="contact-error">{error}</div>}
            <button className="contact-btn" type="submit">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
