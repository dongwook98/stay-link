export default async function DashboardRightPage() {
  await new Promise((resolve) => setTimeout(resolve, 3500))
  return (
    <div className="min-h-screen text-center flex flex-col justify-center font-semibold bg-rose-700 text-white">
      Dashboard Right Page
    </div>
  )
}
