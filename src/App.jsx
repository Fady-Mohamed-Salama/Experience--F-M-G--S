import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);


  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/category/:category" element={<CategoryProduct />}></Route>
        <Route path="/products/:id" element={<SingleProduct />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/cart"
          element={<ProtectedRoute><Cart location={location} getLocation={getLocation} /></ProtectedRoute>}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
