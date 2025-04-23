export default function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className="min-h-screen flex flex-col justify-center z-50">
      <div className="flex gap-5 items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
      </div>
    </div>
  )
}
