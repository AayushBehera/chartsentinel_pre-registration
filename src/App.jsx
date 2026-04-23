import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import CanvasWrapper from './components/three/CanvasWrapper'
import Hero from './sections/Hero/Hero'
import useExperienceStore from './store/useExperienceStore'

import Navbar from './components/ui/Navbar'
import WhatWeDo from './sections/WhatWeDo/WhatWeDo'
import Pricing from './sections/Pricing/Pricing'
import Process from './sections/Process/Process'
import WhyUs from './sections/WhyUs/WhyUs'
import Footer from './sections/Footer/Footer'
import PreRegistrationForm from './components/forms/PreRegistrationForm'
import AdminPanel from './components/admin/AdminPanel'
import UserProfile from './components/profile/UserProfile'

export default function App() {
  const setMouse = useExperienceStore((state) => state.setMouse)
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/')
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothing: 0.7 })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const handleMouseMove = (e) => {
      // Normalize mouse from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      lenis.destroy()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [setMouse])

  const renderContent = () => {
    const hash = currentRoute.split('?')[0]
    
    switch (hash) {
      case '#/register':
        return <PreRegistrationForm onSuccess={(result) => {
          setUserProfile(result)
          setTimeout(() => {
            window.location.hash = '#/profile'
          }, 2000)
        }} />
      case '#/admin':
        return <AdminPanel />
      case '#/profile':
        return userProfile ? (
          <UserProfile userId={userProfile.id} onClose={() => {
            setUserProfile(null)
            window.location.hash = '#/'
          }} />
        ) : (
          <PreRegistrationForm onSuccess={(result) => {
            setUserProfile(result)
            setTimeout(() => {
              window.location.hash = '#/profile'
            }, 2000)
          }} />
        )
      case '#/':
      default:
        return (
          <>
            <Navbar />
            <div className="relative z-10 w-full">
              <Hero />
              <WhatWeDo />
              <Pricing />
              <Process />
              <WhyUs />
              <Footer />
            </div>
          </>
        )
    }
  }

  return (
    <main className="bg-background-dark text-white selection:bg-primary selection:text-white">
      {currentRoute === '#/' && (
        <div className="fixed inset-0 z-0">
          <CanvasWrapper />
        </div>
      )}

      {renderContent()}
    </main>
  )
}
