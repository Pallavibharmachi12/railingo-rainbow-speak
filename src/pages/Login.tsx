
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LoginForm from "@/components/authentication/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
