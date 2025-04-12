
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, LogOut, Menu, Moon, Settings, Sun, Train, User, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-3 px-4 md:px-6 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Train size={24} className="text-primary mr-2" />
            <span className="text-2xl font-bold rainbow-text">Railingo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              isActive("/") ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/announcements"
            className={`text-sm font-medium ${
              isActive("/announcements") ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Announcements
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium ${
                isActive("/admin") ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className={`text-sm font-medium ${
              isActive("/about") ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            About
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2" title="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button variant="ghost" size="icon" className="ml-2" title="Change language">
            <Globe size={18} />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2 flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center w-full">
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rainbow-gradient ml-2">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2" title="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Train size={24} className="text-primary mr-2" />
                  <span className="text-2xl font-bold rainbow-text">Railingo</span>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`text-lg font-medium ${isActive("/") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/announcements"
                  className={`text-lg font-medium ${isActive("/announcements") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Announcements
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`text-lg font-medium ${isActive("/admin") ? "text-primary" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/about"
                  className={`text-lg font-medium ${isActive("/about") ? "text-primary" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>

              <div className="mt-auto">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center mb-4">
                      <User size={20} className="mr-2" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        Settings
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500"
                      onClick={async () => {
                        setIsMobileMenuOpen(false);
                        await handleLogout();
                      }}
                    >
                      <LogOut size={18} className="mr-2" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button asChild className="rainbow-gradient w-full" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full"
                      variant="outline"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
