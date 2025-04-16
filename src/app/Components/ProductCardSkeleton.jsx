export default function ProductCardSkeleton() {
    return (
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm animate-pulse">
        {/* Image Skeleton */}
        <div className="h-64 bg-gray-200"></div>
  
        {/* Content Skeleton */}
        <div className="p-4">
          {/* Category */}
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
  
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-3"></div>
  
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-8 ml-2"></div>
          </div>
  
          {/* Price */}
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
  
          {/* Buttons */}
          <div className="flex items-center justify-between">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 w-10 bg-gray-200 rounded ml-2"></div>
          </div>
        </div>
      </div>
    )
  }
  