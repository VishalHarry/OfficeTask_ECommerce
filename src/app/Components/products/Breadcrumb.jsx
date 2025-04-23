import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb({ paths }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap text-sm">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1

          return (
            <li key={path.href} className="flex items-center">
              {index > 0 && <ChevronRight size={14} className="mx-2 text-muted-foreground" />}

              {isLast ? (
                <span className="font-medium truncate max-w-[200px]" aria-current="page">
                  {path.name}
                </span>
              ) : (
                <Link href={path.href} className="text-muted-foreground hover:text-foreground truncate max-w-[150px]">
                  {path.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
