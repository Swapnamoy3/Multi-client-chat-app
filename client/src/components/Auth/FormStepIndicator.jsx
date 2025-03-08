import React from 'react';

export function FormStepIndicator({ step, title, isSelected }) {
    return (
        <div className={`flex items-center gap-4 ${!isSelected ? "opacity-70" : ""}`}>
            <div className="border border-white rounded-full w-10 h-10 flex items-center justify-center">{step}</div>
            <div className="flex flex-col">
                <span className="uppercase text-xs text-gray-200">Step {step}</span>
                <span className="uppercase font-semibold tracking-wider text-sm">{title}</span>
            </div>
        </div>
    );
}
