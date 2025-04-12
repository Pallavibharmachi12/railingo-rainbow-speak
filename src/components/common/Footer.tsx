
import React from "react";
import { Link } from "react-router-dom";
import { Train, Facebook, Twitter, Instagram, Youtube, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t py-10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Train size={24} className="text-primary mr-2" />
              <span className="text-2xl font-bold rainbow-text">Railingo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-generation, AI-powered multilingual railway announcements for modern train stations.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Youtube" className="text-muted-foreground hover:text-primary">
                <Youtube size={18} />
              </a>
              <a href="#" aria-label="Github" className="text-muted-foreground hover:text-primary">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-muted-foreground hover:text-primary">
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-muted-foreground" />
                <a href="mailto:contact@railingo.com" className="text-muted-foreground hover:text-primary">
                  contact@railingo.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  English 🇬🇧
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  हिन्दी 🇮🇳
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  తెలుగు 🇮🇳
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Railingo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
