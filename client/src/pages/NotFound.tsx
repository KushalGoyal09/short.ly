import * as React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100">
      <div className="max-w-md px-4 py-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          to="/"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
