
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Train } from "lucide-react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || password !== confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
      return;
    }

    try {
      setIsSubmitting(true);
      await register(email, password, name);
    } catch (error) {
      console.error("Registration error:", error);
      // Toast notification is handled in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <Train size={36} className="text-primary mr-2" />
          <CardTitle className="text-3xl font-bold rainbow-text">Railingo</CardTitle>
        </div>
        <CardDescription className="text-center">
          Create an account to access Railingo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordsMatch(e.target.value === confirmPassword);
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordsMatch(e.target.value === password);
              }}
              required
              className={!passwordsMatch ? "border-red-500" : ""}
            />
            {!passwordsMatch && (
              <p className="text-sm text-red-500">Passwords do not match</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full rainbow-gradient"
            disabled={
              isSubmitting ||
              !name ||
              !email ||
              !password ||
              !confirmPassword ||
              !passwordsMatch
            }
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <div className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
