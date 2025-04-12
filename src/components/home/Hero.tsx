
import React from "react";
import { Button } from "@/components/ui/button";
import { Train } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-primary/10">
            <Train className="h-6 w-6 text-primary mr-2" />
            <span className="font-medium">Next-gen Railway Announcements</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="rainbow-text">Railingo Rainbow Speak</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience smart, multilingual railway announcements in real-time. 
            Crystal clear audio in English, Hindi, Telugu, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rainbow-gradient">
              <Link to="/announcements">Listen to Announcements</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="train-animation-container absolute bottom-0 left-0 w-full h-16">
        <div className="absolute bottom-0 left-0 w-full border-t-2 border-dashed border-muted-foreground"></div>
        <div className="animate-train-move absolute bottom-2">
          <Train size={48} className="text-rainbow-blue" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
