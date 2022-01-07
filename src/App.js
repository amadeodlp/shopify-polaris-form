import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import RegisterForm from "./Components/RegisterForm";
import { FooterHelp, Link } from "@shopify/polaris";
import { loadReCaptcha } from 'react-recaptcha-google'

function App() {
  loadReCaptcha()
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<RegisterForm/>} />
        </Routes>
        <FooterHelp>
                You can check out{' '}
                <Link url="https://shopify.com">Shopify guide</Link> for more information.
            </FooterHelp>
    </BrowserRouter>
  );
}

export default App;
