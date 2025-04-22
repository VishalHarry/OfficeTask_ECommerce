
export const metadata = {
  title: "Login | EDUKAN",
  description: "Login to your account to access your orders, wishlist, and more.",
};


import LoginForms from "../Components/LoginForms";



export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 mb-6 rounded-full bg-gradient-to-r from-primary to-purple-600 p-1">
            <img
              src="https://png.pngtree.com/template/20190927/ourmid/pngtree-e-commerce-logo-template-image_311731.jpg"
              alt="Eduan Logo"
              className="h-full w-full rounded-full object-cover"
            />
          </div>


        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
          <LoginForms />
        </div>
      </div>
    </div>
  );
}