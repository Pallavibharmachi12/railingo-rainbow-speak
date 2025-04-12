
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            <span className="rainbow-text">About Railingo</span>
          </h1>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-lg mb-6 text-muted-foreground">
              Railingo is a next-generation railway announcement system designed to make train travel more accessible and convenient for passengers across India. Our platform leverages cutting-edge AI technology to deliver clear, contextually accurate announcements in multiple languages.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              We're on a mission to revolutionize the railway announcement experience by breaking down language barriers and ensuring that every passenger receives timely, accurate information in their preferred language. By combining AI-generated speech with contextual translation, we create announcements that sound natural and are easy to understand.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Key Technologies</h2>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• Advanced AI text generation for natural-sounding announcements</li>
              <li>• Contextual translation that preserves meaning across languages</li>
              <li>• Ultra-realistic text-to-speech in multiple languages with native accents</li>
              <li>• Real-time train status updates and announcement generation</li>
              <li>• Mobile-friendly interface with accessibility features</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Currently Supported Languages</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center">
                <span className="text-lg mr-2">🇬🇧</span>
                <span>English</span>
              </div>
              <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center">
                <span className="text-lg mr-2">🇮🇳</span>
                <span>हिन्दी (Hindi)</span>
              </div>
              <div className="px-4 py-2 bg-primary/10 rounded-full flex items-center">
                <span className="text-lg mr-2">🇮🇳</span>
                <span>తెలుగు (Telugu)</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              We're continuously working to expand our language offerings to serve more passengers. Our goal is to eventually support all major Indian languages as well as international languages for foreign travelers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-2">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <p className="text-muted-foreground mb-8">
              Email: <a href="mailto:contact@railingo.com" className="text-primary hover:underline">contact@railingo.com</a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="rainbow-gradient">
              <Link to="/announcements">Experience Announcements</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
