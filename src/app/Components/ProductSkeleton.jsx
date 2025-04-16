export default function ProductSkeleton() {
    return (
      <div className="border border-border rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-square bg-muted"></div>
        <div className="p-4 space-y-3">
          <div className="flex gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-muted-foreground/20"></div>
              ))}
          </div>
          <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
          <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
          <div className="h-8 bg-muted-foreground/20 rounded"></div>
        </div>
      </div>
    )
  }
  