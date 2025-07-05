
import { useUser, SignInButton } from "@clerk/clerk-react";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="text-center mt-10">Loading...</div>;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-100">
        <div className="bg-red-200 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">
            You must be signed in to access this page
          </h2>
          <SignInButton mode="modal">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
