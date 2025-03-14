import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import propertyImage1 from "../images/home1.jpg";
import propertyImage2 from "../images/home2.jpg";
import propertyImage3 from "../images/home3.jpg";
import companyImage from "../images/company.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section with Company Image */}
      <section className="intro-section">
        <div className="intro-content">
          <img src={companyImage} alt="Company Building" className="intro-image" />
          <p className="company-description">
            Welcome to <span className="highlighted-text">Elite Residence</span>, your trusted partner in finding the perfect home.
            With over 10 years of experience, we specialize in luxury, modern, and suburban properties.
            Our mission is to provide top-tier real estate solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Hero Section with Text */}
      <section className="hero-text-section">
        <div className="hero-text-content">
          <h1>Find Your Dream Home</h1>
          <p>Browse through the best real estate listings today.</p>
          <button className="cta-button" onClick={() => navigate("/listings")}>Explore Listings</button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-properties-section">
        <h2>Featured Properties</h2>
        <div className="property-list">
          <div className="property-card">
            <img src={propertyImage1} alt="Detached House" />
            <h3>Detached House</h3>
            <p>$1,200,000</p>
            <button className="view-details-btn">View Details</button>
          </div>
          <div className="property-card">
            <img src={propertyImage2} alt="Townhouse" />
            <h3>Townhouse</h3>
            <p>$850,000</p>
            <button className="view-details-btn">View Details</button>
          </div>
          <div className="property-card">
            <img src={propertyImage3} alt="Apartment" />
            <h3>Apartment</h3>
            <p>$450,000</p>
            <button className="view-details-btn">View Details</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="client-testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-cards-container">
          <div className="testimonial-card">
            <p>"Absolutely the best real estate platform! Found my dream home in no time!"</p>
            <h4>- Sarah Johnson</h4>
          </div>
          <div className="testimonial-card">
            <p>"Seamless experience and great customer service. Highly recommended!"</p>
            <h4>- Michael Smith</h4>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Looking for a New Home?</h2>
        <p>We offer the best real estate options at the most affordable prices.</p>
        <button className="cta-button" onClick={() => navigate("/listings")}>Get Started Today</button>
      </section>
    </div>
  );
}

export default Home;
