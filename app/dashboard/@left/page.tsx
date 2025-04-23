export default async function DashboardLeftPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div className="min-h-screen text-center flex flex-col justify-center font-semibold bg-rose-300 ">
      Dashboard Left Page
    </div>
  )
}
