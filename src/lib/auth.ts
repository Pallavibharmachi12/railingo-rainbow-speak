import { User } from "@/types";

// Mock user data
const USERS: User[] = [
  {
    id: "1",
    email: "admin@railingo.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@railingo.com",
    name: "Regular User",
    role: "user",
  }
];

// Mock authentication service
export const authService = {
  currentUser: null as User | null,

  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user by email (simple mock, no password verification)
    const user = USERS.find(user => user.email === email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In a real app, you would verify the password here

    // Mock successful login
    if (password === "password") {
      authService.currentUser = user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  },

  logout: async (): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear user from local storage
    localStorage.removeItem("user");
    authService.currentUser = null;
  },

  register: async (email: string, password: string, name: string): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = USERS.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create new user (in a real app, this would be stored in a database)
    const newUser: User = {
      id: String(USERS.length + 1),
      email,
      name,
      role: "user", // New users default to regular user role
    };

    // Mock adding user to database
    USERS.push(newUser);
    
    // Auto login after registration
    authService.currentUser = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return newUser;
  },

  getCurrentUser: (): User | null => {
    // If we already have a current user, return it
    if (authService.currentUser) {
      return authService.currentUser;
    }
    
    // Otherwise, try to get it from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        authService.currentUser = user;
        return user;
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        localStorage.removeItem("user");
      }
    }
    
    return null;
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === "admin";
  },
};
