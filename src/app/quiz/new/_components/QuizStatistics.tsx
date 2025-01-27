export default function QuizStatistics() {
    // This would typically fetch real data from your backend
    const stats = [
      { name: "Total Quizzes", value: 12 },
      { name: "Active Quizzes", value: 5 },
      { name: "Total Participants", value: 1024 },
      { name: "Avg. Completion Rate", value: "78%" },
    ]
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Statistics</h2>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.name} className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
  
  