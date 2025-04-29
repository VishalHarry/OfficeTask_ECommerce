// src/app/login/LoginForms.jsx (Client Component)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import {toast} from "sonner"

export default function LoginForms() {
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
    
    toast.success("Login successful!")
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-pink-950 dark:text-pink-100">
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
          className="transition-all focus-visible:ring-pink-300/30 border-pink-200 dark:border-pink-800"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-pink-950 dark:text-pink-100">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-300 dark:hover:text-pink-200 transition-colors"
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
          className="transition-all focus-visible:ring-pink-300/30 border-pink-200 dark:border-pink-800"
        />
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex items-center justify-center gap-2"
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
        <span className="text-pink-600/70 dark:text-pink-300/70">Don&apos;t have an account? </span>
        <Link href="/signup" className="font-medium text-pink-600 hover:text-pink-700 dark:text-pink-300 dark:hover:text-pink-200 transition-colors">
          Sign up
        </Link>
      </div>
    </form>
  );
}