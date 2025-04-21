export function FullPageLoader() {
  return (
    <div className="fixed w-full inset-x-0 h-screen bg-black/60 z-50 flex flex-col justify-center top-0">
      <div className="animate-spin w-10 h-10 rounded-full text-gray-400 border-[4px] border-t-transparent border-current m-auto" />
    </div>
  )
}
