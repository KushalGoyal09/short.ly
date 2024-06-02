import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
                <h2 className="text-center text-gray-700 text-xl font-semibold">Loading...</h2>
                <p className="text-center text-gray-500">Please wait while we load the content.</p>
            </div>
        </div>
    );
};

export default Loading;
