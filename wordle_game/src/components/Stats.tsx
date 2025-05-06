import React from 'react'

const Stats:React.FC = () => {
  return (
      <>
      {/* Stats */}
     <div className="w-full p-6 bg-gray-900 dark:bg-gray-100">
            <h2 className="text-lg font-semibold mb-4 border-b">Your Stats</h2>
            <div className="space-y-2 text-sm text-gray-300 dark:text-gray-700">
            <div className="flex justify-between">
                <span>Games Played</span>
                <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between">
                <span>Win %</span>
                <span className="font-bold">75%</span>
            </div>
            <div className="flex justify-between">
                <span>Current Streak</span>
                <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between">
                <span>Max Streak</span>
                <span className="font-bold">6</span>
            </div>
            </div>
        </div>
     </>
  )
}

export default Stats;