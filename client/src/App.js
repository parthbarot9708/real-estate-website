import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-24 px-4"> {/* Top padding to avoid overlap with fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment/:listingId" element={<BookAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
