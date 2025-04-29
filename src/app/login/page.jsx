
export const metadata = {
  title: "Login | EDUKAN",
  description: "Login to your account to access your orders, wishlist, and more.",
};


import Image from "next/image";
import LoginForms from "../Components/LoginForms";



export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 mb-6 rounded-full bg-gradient-to-r from-primary to-pink-400 p-1">
            <div className="relative w-full h-full">
              <Image
                src="/"
                alt="Eduan Logo"
                width={500}  // Adjust this width based on your layout
                height={500} // Adjust this height based on your layout (to maintain a square shape for the rounded full effect)
                className="object-cover rounded-full"
              />
            </div>
          </div>


        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-pink-600">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground text-pink-400">Sign in to your account to continue</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
          <LoginForms />
        </div>
      </div>
    </div>
  );
}