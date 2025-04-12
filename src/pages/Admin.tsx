
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/");
    } else if (!user) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
