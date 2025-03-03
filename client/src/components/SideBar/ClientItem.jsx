import React from 'react';

export function ClientItem({ name, status, type, onClick, selected }) {
    let bgColor = "bg-white";
    let borderColor = "border-gray-200";
    let textColor = "text-gray-800";
    let iconBg = "bg-gray-300";
    let translateX = "translate-x-0";
    
    if (type === "broadcast") {
        bgColor = "bg-blue-50";
        borderColor = "border-blue-400";
        iconBg = "bg-blue-500";
    } else if (type === "multicast") {
        bgColor = "bg-green-50";
        borderColor = "border-green-400";
        iconBg = "bg-green-500";
    }
    
    if (selected) {
        bgColor = "bg-yellow-100";
        borderColor = "border-yellow-500";
        textColor = "text-yellow-900";
        iconBg = "bg-yellow-500";
        translateX = "translate-x-2";
    }
    
    return (
        <div
            onClick={onClick}
            className={`flex items-center p-4 border-l-4 ${borderColor} rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 transform ${bgColor} ${translateX}`}
        >
            <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-white font-bold`}>C</div>
            <div className="ml-3">
                <h3 className={`font-semibold ${textColor}`}>{name}</h3>
                <p className="text-sm text-gray-500">{status}</p>
            </div>
        </div>
    );
}
