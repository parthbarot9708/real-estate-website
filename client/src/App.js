import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import Navbar from "./components/Navbar";  // Import Navbar component

function App() {
  return (
    <Router>
      <Navbar />  {/* Include the Navbar at the top of the page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </Router>
  );
}

export default App;
