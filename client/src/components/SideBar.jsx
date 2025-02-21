import React from 'react'


function ClientItem({ name, status, type }) {
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
        <div className={`p-4 border-b ${borderColor} hover:bg-gray-50 cursor-pointer ${bgColor}`}>
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




export default function SideBar() {
  return (
        <div class="w-1/4 bg-white border-r border-gray-200">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-800">Active Clients</h2>
            </div>
            <div class="overflow-y-auto h-[calc(100vh-4rem)]">
                {/* <!-- Client Items --> */}
                <ClientItem name={"swap"} status={"Offline"} type = {'direct'}/>
                {/* <!-- Repeat client items as needed --> */}
            </div>
        </div>
  )
}
