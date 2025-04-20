import Footer from './Footer'
import Navbar from './Navbar'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer />
    </>
  )
}
