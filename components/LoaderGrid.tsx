import cn from 'classnames'

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <>
      {[...Array(12)].map((e, i) => (
        <div
          key={i}
          className={cn(
            'rounded-md w-full h-72 md:h-64 bg-gray-100 animate-pulse object-fit z-[0]',
            className,
          )}
        />
      ))}
    </>
  )
}
