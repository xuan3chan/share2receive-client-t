const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto px-1 md:px-10 space-y-6 animate-pulse">
      {/* Tiêu đề skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Stats Summary skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-sm shadow-md p-5">
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Biểu đồ và bộ lọc skeleton */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-[800px]"></div>
        </div>
        <div className="h-[300px] bg-gray-200 rounded"></div>
      </div>

      {/* Grid 2 cột skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton
