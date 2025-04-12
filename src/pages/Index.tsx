
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import LanguageShowcase from "@/components/home/LanguageShowcase";
import TrainStatusTicker from "@/components/common/TrainStatusTicker";
import { dataService } from "@/lib/data";
import { useEffect, useState } from "react";
import { Train } from "@/types";

const Index = () => {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    const loadTrains = async () => {
      try {
        const fetchedTrains = await dataService.getTrains();
        setTrains(fetchedTrains);
      } catch (error) {
        console.error("Failed to load trains:", error);
      }
    };

    loadTrains();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TrainStatusTicker trains={trains} />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <LanguageShowcase />
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
