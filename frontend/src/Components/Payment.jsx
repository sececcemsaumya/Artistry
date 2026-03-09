import React, { useState } from 'react';
import { FaCreditCard, FaUser, FaPhone, FaMapMarkerAlt, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentForm = ({ onPaymentSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvvCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = value.replace(/[^\d ]/g, '');
    } else if (name === 'expiryDate') {
      processedValue = value.replace(/[^\d/]/g, '');
    } else if (name === 'cvvCode') {
      processedValue = value.replace(/\D/g, '');
    }

    setFormData({ ...formData, [name]: processedValue });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (Object.values(formData).every(field => field.trim())) {
        setPaymentSuccess(true);
        onPaymentSuccess?.();

        setTimeout(() => {
          navigate('/artworks');
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage('Please fill in all required fields');
      }
    }, 1500);
  };

  return (
    <div className="payment-form-wrapper">
      <div className="payment-form-backdrop"></div>
      <div className="payment-form-card">
        {paymentSuccess ? (
          <div className="payment-success-message">
            <FaCheckCircle className="success-icon" />
            <h2>Payment Successful!</h2>
            <p>
              Thank you for your payment.<br />
              Redirecting to artworks...
            </p>
          </div>
        ) : (
          <form className="secure-payment-form" onSubmit={handleFormSubmit} autoComplete="off">
            <header className="payment-form-header">
              <h1 className="payment-form-title">Secure Payment</h1>
            </header>

            <section className="payment-form-section">
              <h2 className="section-label">Personal Information</h2>
              <div className="form-input-group">
                <FaUser className="input-field-icon" />
                <input
                  type="text"
                  className="payment-form-input"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-input-group">
                <FaPhone className="input-field-icon" />
                <input
                  type="tel"
                  className="payment-form-input"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-input-group">
                <FaMapMarkerAlt className="input-field-icon" />
                <input
                  type="text"
                  className="payment-form-input"
                  name="streetAddress"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
              </div>
            </section>

            <section className="payment-form-section">
              <h2 className="section-label">Payment Details</h2>
              <div className="form-input-group">
                <FaCreditCard className="input-field-icon" />
                <input
                  type="text"
                  className="payment-form-input"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="payment-form-row">
                <div className="form-input-group half-width-input">
                  <input
                    type="text"
                    className="payment-form-input"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-group half-width-input">
                  <FaLock className="input-field-icon" />
                  <input
                    type="text"
                    className="payment-form-input"
                    name="cvvCode"
                    placeholder="CVV"
                    value={formData.cvvCode}
                    onChange={handleInputChange}
                    maxLength={4}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </section>

            <div className="payment-summary-box">
              <div className="payment-summary-item">
                <span>Amount to pay:</span>
                <span className="payment-amount">₹{amount}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="payment-error-message">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="payment-submit-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>

            <div className="payment-security-notice">
              <FaLock className="security-lock-icon" />
              <span>256-bit SSL secured payment</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
