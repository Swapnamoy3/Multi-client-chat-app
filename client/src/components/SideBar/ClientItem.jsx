import React from 'react';

export function ClientItem({ name, status, type, onClick }) {
    let bgColor = "bg-white"; // Default for direct conversation
    let borderColor = "border-gray-100";

    if (type === "broadcast") {
        bgColor = "bg-blue-100"; // Light blue for broadcast
        borderColor = "border-blue-300";
    } else if (type === "multicast") {
        bgColor = "bg-green-100"; // Light green for multicast
        borderColor = "border-green-300";
    }

    return (
        <div
            onClick={onClick}
            className={`p-4 border-b ${borderColor} hover:bg-gray-50 cursor-pointer ${bgColor}`}>
            <div className="flex items-center space-x-3">
                <img src="https://loremflickr.com/40/40/avatar" alt={name} className="w-8 h-8 rounded-full" />
                <div>
                    <h3 className="font-medium text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{status}</p>
                </div>
            </div>
        </div>
    );
}
