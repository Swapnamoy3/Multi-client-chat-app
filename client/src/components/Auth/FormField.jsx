import React from 'react';

export function FormField({ label, id, type, placeholder, onChange, onBlur, name, ref, error }) {
    console.log(name);
    console.log(error);
    return (
        <div>
            <label for={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
            {/* <!-- Example of an error message:  */}
            {error && <p className="text-red-500 text-sm mt-1">{error.type}</p>}
        </div>
    );
}
