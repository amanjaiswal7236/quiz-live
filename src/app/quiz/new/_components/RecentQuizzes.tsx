export default function RecentQuizzes() {
    // This would typically fetch real data from your backend
    const recentQuizzes = [
      { id: 1, title: "JavaScript Basics", participants: 45, date: "2023-05-15" },
      { id: 2, title: "React Hooks", participants: 32, date: "2023-05-12" },
      { id: 3, title: "CSS Flexbox", participants: 28, date: "2023-05-10" },
    ]
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Quizzes</h2>
        <ul className="divide-y divide-gray-200">
          {recentQuizzes.map((quiz) => (
            <li key={quiz.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{quiz.title}</p>
                  <p className="text-sm text-gray-500">{quiz.participants} participants</p>
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                  {new Date(quiz.date).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  