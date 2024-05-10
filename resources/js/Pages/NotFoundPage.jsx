import React from "react";
import ErrorImage from "@/../../resources/images/404.png";

export default function NotFoundPage() {
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
                Oops! Page not found
            </h1>
            <p className="text-xl text-gray-600 mb-4">
                The page you are looking for might have been removed or is
                temporarily unavailable.
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
