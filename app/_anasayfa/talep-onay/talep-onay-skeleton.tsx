import React from 'react'

export default function TalepOnaySkeleton() {
  return (
    <div className='flex flex-col items-center justify-center w-full p-4 space-y-8 animate-pulse'>
      {/* Summary Table */}
      <div className="w-full mb-6 bg-gray-200 p-4 rounded-lg">
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </th>
              <th className="px-4 py-2 text-left">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
