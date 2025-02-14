"use client";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className="w-screen overflow-y-hidden">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
