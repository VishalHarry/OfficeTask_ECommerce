// src/app/login/LoginForms.jsx (Client Component)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {toast} from "sonner"

export default function LoginForms() {
  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="user">User Login</TabsTrigger>
        <TabsTrigger value="admin">Admin Login</TabsTrigger>
      </TabsList>
      
      <TabsContent value="user">
        <UserLoginForm />
      </TabsContent>
      
      <TabsContent value="admin">
        <AdminLoginForm />
      </TabsContent>
    </Tabs>
  );
}

function UserLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // toast({
    //   title: "Login successful!",
    //   description: "Welcome back to EDUKAN.",
    // });
    
    toast.success("Login successful!")

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign in
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account? </span>
        <Link href="/signup" className="font-medium text-primary hover:text-primary/90 transition-colors">
          Sign up
        </Link>
      </div>
    </form>
  );
}

function AdminLoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // toast({
    //   title: "Admin login successful!",
    //   description: "Welcome back to EDUKAN admin panel.",
    // });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="admin-username" className="block text-sm font-medium">
          Admin Username
        </label>
        <Input
          id="admin-username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="admin-password" className="block text-sm font-medium">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="admin-code" className="block text-sm font-medium">
          Admin Access Code
        </label>
        <Input
          id="admin-code"
          name="adminCode"
          type="password"
          required
          value={formData.adminCode}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign in as Admin
            </>
          )}
        </Button>
      </div>
    </form>
  );
}