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
              {index > 0 && <ChevronRight size={14} className="mx-2 text-pink-400" />}

              {isLast ? (
                <span className="font-medium truncate max-w-[200px] text-pink-700" aria-current="page">
                  {path.name}
                </span>
              ) : (
                <Link href={path.href} className="text-pink-400 hover:text-pink-600 truncate max-w-[150px] transition-colors">
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
