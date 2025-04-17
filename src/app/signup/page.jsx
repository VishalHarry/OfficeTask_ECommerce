import SignupForm from "../Components/SignupForm"


export const metadata = {
  title: "Sign Up | EDUKAN",
  description: "Create a new account to start shopping with us.",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Join us and start shopping today</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
