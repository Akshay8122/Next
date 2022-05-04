import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* Sidebar */}
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}

export default Home