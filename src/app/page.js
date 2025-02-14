"use client";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Pricing from "./components/Pricing/Pricing";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="w-screen overflow-y-hidden">
      <Header />
      <Hero />
      <Pricing />
      <Footer />
    </div>
  );
}
