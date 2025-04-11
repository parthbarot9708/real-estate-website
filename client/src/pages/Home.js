import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertyImage1 from "../images/home1.jpg";
import propertyImage2 from "../images/home2.jpg";
import propertyImage3 from "../images/home3.jpg";
import companyImage from "../images/company.jpg";

import "../styles.css";

const testimonials = [
  { quote: "Absolutely the best real estate platform! Found my dream home in no time!", name: "Sarah Johnson" },
  { quote: "Seamless experience and great customer service. Highly recommended!", name: "Michael Smith" },
  { quote: "I couldn’t have asked for a better home-buying experience. Excellent team!", name: "Emma Williams" }
];

const properties = [
  { title: "Modern Apartment", price: "$550,000", image: propertyImage1 },
  { title: "Luxury Villa", price: "$2,000,000", image: propertyImage2 },
  { title: "Cozy Townhouse", price: "$750,000", image: propertyImage3 }
];

function Home() {
  const navigate = useNavigate();
  const [randomTestimonial, setRandomTestimonial] = useState(testimonials[0]);
  const [randomProperty, setRandomProperty] = useState(properties[0]);

  useEffect(() => {
    setRandomTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)]);
    setRandomProperty(properties[Math.floor(Math.random() * properties.length)]);
  }, []);

  return (
    <div>
      {/* Hero Section with Company Image */}
      <section
  className="intro-section bg-cover bg-center h-[70vh] flex items-center justify-center relative animate-fadeZoom"
  style={{ backgroundImage: `url(${companyImage})` }}
>
  <div className="absolute bg-black opacity-50 inset-0"></div>
  <div className="intro-content text-white text-center z-10 p-8 animate__animated animate__fadeIn">
    <p className="company-description text-lg font-semibold typewriter-effect">
      Welcome to <span className="highlighted-text text-yellow-400">Elite Residence</span>, 
      your trusted partner in finding the perfect home.
    </p>
  </div>
</section>


      {/* Hero Section with Typewriter Text */}
      <section className="hero-text-section py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center animate__animated animate__fadeInUp">
<div className="hero-text-content px-4 max-w-3xl mx-auto">
  {/* Glowing flicker effect only on H1 */}
  <h1 className="relative w-full xl:text-6xl md:text-5xl text-4xl sm:tracking-[10px] tracking-[5px] uppercase text-center leading-[0.85em] outline-none animate-dimlight box-reflect">
    Find Your Dream Home
  </h1>
  
  {/* Other elements fade in smoothly */}
  <p className="text-xl mt-6 mb-4 animate__animated animate__fadeIn delay-500">
    Your journey to the perfect home begins here! Whether you're looking for a modern apartment, a luxurious villa, or a cozy townhouse, we have a wide range of properties to suit every lifestyle and budget.
  </p>
  <p className="text-lg mb-8 animate__animated animate__fadeIn delay-700">
    Our expert team ensures a seamless home-buying experience, offering professional guidance, virtual tours, and personalized recommendations. Explore top-rated properties, compare prices, and make confident decisions with Elite Residence.
  </p>

  {/* Button with pulsing effect */}
 
</div>
 <button 
    className="cta-button bg-yellow-500 text-black py-3 px-6 rounded-full text-lg hover:bg-yellow-600 transition-all duration-300 animate__animated animate__pulse animate__infinite"
    onClick={() => navigate("/listings")}
  >
    Explore Listings
  </button>
</section>


      {/* Featured Properties Section */}
      <section className="featured-properties-section py-16 bg-gray-100 text-center animate__animated animate__fadeIn">
        <h2 className="text-3xl font-semibold mb-6">Featured Properties</h2>
        <div className="property-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <div className="property-card bg-white p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <img src={randomProperty.image} alt={randomProperty.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{randomProperty.title}</h3>
            <p className="text-lg text-gray-700 mb-4">{randomProperty.price}</p>
            <button className="view-details-btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300">View Details</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section class="client-testimonials py-16 bg-gray-200 text-center">
<h2 class="text-3xl font-semibold mb-6">What Our Clients Say</h2>
<div class="testimonial-cards-container flex flex-wrap justify-center gap-6">
  <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-xs relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <p class="text-lg mb-4">"Absolutely the best real estate platform! Found my dream home in no time!"</p>
    <h4 class="text-xl font-semibold">- Sarah Johnson</h4>
    <div class="border-animate absolute inset-0 border-2 border-transparent"></div>
  </div>
  
  <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-xs relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <p class="text-lg mb-4">"Seamless experience and great customer service. Highly recommended!"</p>
    <h4 class="text-xl font-semibold">- Michael Smith</h4>
    <div class="border-animate absolute inset-0 border-2 border-transparent"></div>
  </div>
  
  <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-xs relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <p class="text-lg mb-4">"I couldn’t have asked for a better home-buying experience. Excellent team!"</p>
    <h4 class="text-xl font-semibold">- Emma Williams</h4>
    <div class="border-animate absolute inset-0 border-2 border-transparent"></div>
  </div>
  
  <div class="testimonial-card bg-white p-6 rounded-lg shadow-lg max-w-xs relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <p class="text-lg mb-4">"Elite Residence made the process so easy and stress-free. I love my new home!"</p>
    <h4 class="text-xl font-semibold">- David Brown</h4>
    <div class="border-animate absolute inset-0 border-2 border-transparent"></div>
  </div>
</div>
</section>

      {/* Call-to-Action Section */}
      <section className="call-to-action py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-semibold mb-4">Looking for a New Home?</h2>
        <p className="text-lg mb-8">We offer the best real estate options at the most affordable prices.</p>
        <button className="cta-button bg-yellow-500 text-black py-3 px-6 rounded-full text-lg hover:bg-yellow-600 transition-all duration-300"
                onClick={() => navigate("/listings")}>Get Started Today</button>
      </section>
    </div>
  );
}

export default Home;
