import cn from 'classnames'

interface Props {
  title: string
  children: React.ReactNode
  isShow: boolean
}

export default function FilterLayout({ children, title, isShow }: Props) {
  return (
    <div
      className={cn(
        'absolute top-80 sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl z-10',
        {
          hidden: !isShow,
        },
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  )
}
