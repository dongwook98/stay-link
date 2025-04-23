export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div className="min-h-screen text-center flex flex-col justify-center font-semibold bg-rose-500 text-white">
      Dashboard Main Page
    </div>
  )
}
