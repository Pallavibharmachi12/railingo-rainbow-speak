
import React from "react";
import { Clock, Globe, MessageSquare, Mic, Volume2 } from "lucide-react";

const Features: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="rainbow-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designed for modern railway stations and tech-savvy passengers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multilingual Support</h3>
            <p className="text-muted-foreground">
              Announcements available in multiple languages including English, Hindi, and Telugu, with more languages coming soon.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <Volume2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Generated Voice</h3>
            <p className="text-muted-foreground">
              Ultra-realistic text-to-speech in native accents for clear and natural-sounding announcements.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
            <p className="text-muted-foreground">
              Get instant train status updates with automatic announcements for arrivals, departures, delays, and platform changes.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Contextual Translations</h3>
            <p className="text-muted-foreground">
              Smart translations that maintain meaning and context across languages, not just word-for-word.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Admin Dashboard</h3>
            <p className="text-muted-foreground">
              Powerful tools for station masters to create and manage announcements with easy train status updates.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center rainbow-gradient mb-5">
              <Train className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Station Guide</h3>
            <p className="text-muted-foreground">
              Engaging interface with animated train routes, interactive tickers, and a fun station master mascot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
