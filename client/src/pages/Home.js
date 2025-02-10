import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <img src="/images/company.jpg" alt="Company Building" className="hero-image" />
          <p className="company-info">
            Welcome to **Elite Residence**, your trusted partner in finding the perfect home.
            With over 10 years of experience, we specialize in luxury, modern, and suburban properties.
            Our mission is to provide top-tier real estate solutions tailored to your needs.
          </p>
        </div>
        <div className="hero-text">
          <h1>Find Your Dream Home</h1>
          <p>Browse through the best real estate listings today.</p>
          <button onClick={() => navigate("/listings")}>Explore Listings</button>
        </div>
      </section>

      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="property-list">
          <div className="property-card">
            <img src="/images/home1.jpg" alt="Property" />
            <h3>Luxury Villa</h3>
            <p>$1,200,000</p>
          </div>
          <div className="property-card">
            <img src="/images/home2.jpg" alt="Property" />
            <h3>Modern Homes</h3>
            <p>$850,000</p>
          </div>
          <div className="property-card">
            <img src="/images/home3.jpg" alt="Property" />
            <h3>Suburban House</h3>
            <p>$450,000</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div>
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

      <section className="cta">
        <h2>Looking for a New Home?</h2>
        <p>We offer the best real estate options at the most affordable prices.</p>
        <button onClick={() => navigate("/listings")}>Get Started Today</button>
      </section>
    </div>
  );
}

export default Home;
