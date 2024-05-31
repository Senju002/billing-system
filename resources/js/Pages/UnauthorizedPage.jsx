import React from "react";
import ErrorImage from "@/../../resources/images/Unauthorized.png";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-96">
                <img
                    src={ErrorImage}
                    alt="404 Error"
                    className="w-full h-full mb-8"
                />
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mb-4">
                You're Unauthorized !
            </h1>
            <p className="text-xl text-gray-600 mb-4">
                You do not have permission to access this page.
            </p>
            <a
                href="/"
                className="text-lg text-primary font-bold hover:underline"
            >
                Go back to homepage
            </a>
        </div>
    );
}
