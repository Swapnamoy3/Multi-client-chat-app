import React from 'react'


function ClientItem() {
    return(
        <div class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
            <div class="flex items-center space-x-3">
                <img src="https://loremflickr.com/40/40/avatar" alt="Client 1" class="w-8 h-8 rounded-full"/>
                <div>
                    <h3 class="font-medium text-gray-800">Client 1</h3>
                    <p class="text-sm text-gray-500">Online</p>
                </div>
            </div>
        </div>
    )
}

export default function SideBar() {
  return (
        <div class="w-1/4 bg-white border-r border-gray-200">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-800">Active Clients</h2>
            </div>
            <div class="overflow-y-auto h-[calc(100vh-4rem)]">
                {/* <!-- Client Items --> */}
                <ClientItem/>
                {/* <!-- Repeat client items as needed --> */}
            </div>
        </div>
  )
}
