
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardView from "@/components/carbon/DashboardView";
import FootprintCalculator from "@/components/carbon/FootprintCalculator";
import CarbonMarketplace from "@/components/carbon/CarbonMarketplace";
import TransactionHistory from "@/components/carbon/TransactionHistory";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const CarbonTracker = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Carbon Credit Manager</h1>
        <p className="text-muted-foreground mb-6">
          Track, reduce, and trade carbon credits using blockchain and AI
        </p>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calculator">Footprint Calculator</TabsTrigger>
            <TabsTrigger value="marketplace">Carbon Marketplace</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-6">
            <DashboardView />
          </TabsContent>
          <TabsContent value="calculator" className="mt-6">
            <FootprintCalculator />
          </TabsContent>
          <TabsContent value="marketplace" className="mt-6">
            <CarbonMarketplace />
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default CarbonTracker;
