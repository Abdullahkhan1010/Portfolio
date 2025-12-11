"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, ChevronRight, ExternalLink, Star, Sparkles } from "lucide-react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { useTheme } from "next-themes"
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("#home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHeroSection, setIsHeroSection] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimer = useRef<NodeJS.Timeout | null>(null)
  const prevScrollY = useRef(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  // Theme animation hook for desktop
  const { ref: themeRef, toggleSwitchTheme } = useModeAnimation({
    duration: 700,
    easing: "ease-in-out",
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 2,
    isDarkMode: theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light")
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      
      // Determine scroll direction
      const newScrollDirection = position > prevScrollY.current ? 'down' : 'up'
      if (Math.abs(position - prevScrollY.current) > 10) {
        setScrollDirection(newScrollDirection)
      }
      prevScrollY.current = position
      
      setScrollPosition(position)

      // Check if we're in the hero section
      try {
        const heroSection = document.getElementById('home')
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom
          setIsHeroSection(heroBottom > 0)
        }
      } catch (error) {
        console.warn('Error checking hero section:', error);
      }

      // Set scrolling state to true and reset timer
      setIsScrolling(true)

      // Clear existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }

      // Set new timer to hide navbar after scrolling stops
      scrollTimer.current = setTimeout(() => {
        setIsScrolling(false)
      }, 2500) // Increased from 1000ms to 2500ms (2.5 seconds)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      try {
        const sections = document.querySelectorAll('section[id]')
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop - 100
          const sectionHeight = (section as HTMLElement).offsetHeight
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveLink(`#${section.getAttribute('id')}`)
          }
        })
      } catch (error) {
        console.warn('Error updating active link:', error);
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = async () => {
    await toggleSwitchTheme()
  }

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  const stars = [
    { x: "5%", y: "20%", size: 10, delay: 0 },
    { x: "80%", y: "15%", size: 8, delay: 1.5 },
    { x: "30%", y: "80%", size: 6, delay: 0.8 }
  ]

  // Determine navbar visibility class based on scroll, section, and scroll state
  const navbarVisibilityClass = 
    isHeroSection || (isScrolling && !isHeroSection) || scrollDirection === 'up'
      ? 'nav-visible' 
      : 'nav-hidden'

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-4 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${navbarVisibilityClass} hidden md:block`}
        suppressHydrationWarning
      >
        <div className="modern-navbar mx-auto max-w-full md:max-w-5xl xl:max-w-6xl" suppressHydrationWarning>
          <div className="nav-container flex items-center justify-between w-full px-4 py-2">
            <Link 
              href="/" 
              className="nav-logo-wrapper flex-shrink-0"
              onClick={() => setActiveLink("#home")}
              aria-label="Home"
              suppressHydrationWarning
            >
              <div className="nav-logo">
                <div className="nav-logo-shine"></div>
                <motion.div
                  className="nav-logo-inner optimize-animation"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center optimize-animation"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="nav-logo-text">A</span>
                    <motion.span 
                      className="absolute nav-logo-sparkle optimize-animation"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 1,
                        repeatDelay: 3
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30 optimize-animation"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8], 
                      opacity: [0.3, 0.5, 0.3] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{ filter: "blur(8px)" }}
                  />
                </motion.div>
              </div>
              <div className="nav-logo-text-container">
                <motion.span 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="nav-brand-text optimize-animation"
                >
                  Abdullah<span className="nav-brand-dot">  .</span>
                </motion.span>
              </div>
            </Link>
            <nav className="nav-links hidden md:flex flex-1 justify-center" aria-label="Main navigation">
              <div className="nav-links-track flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`nav-link ${activeLink === link.href ? 'nav-active' : ''}`}
                    aria-current={activeLink === link.href ? "page" : undefined}
                    suppressHydrationWarning
                  >
                    <div className="nav-link-highlight"></div>
                    <motion.span
                      className="nav-text optimize-animation"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                    </motion.span>
                    {activeLink === link.href && (
                      <motion.div
                        className="nav-indicator optimize-animation"
                        layoutId="navIndicator"
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      >
                        <motion.div 
                          className="nav-indicator-glow optimize-animation"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="nav-indicator-trail"></div>
                      </motion.div>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="nav-actions flex items-center gap-2 flex-shrink-0">
              <motion.button
                ref={themeRef}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(147, 51, 234, 0.15)" 
                }}
                whileTap={{ scale: 0.9 }}
                className="nav-theme-toggle optimize-animation"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                suppressHydrationWarning
              >
                <div className="nav-theme-toggle-rays"></div>
                {mounted && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center optimize-animation"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme === "dark" ? "dark" : "light"}
                        initial={{ opacity: 0, y: -10, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: 10, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="relative optimize-animation"
                      >
                        {theme === "dark" ? (
                          <>
                            <Sun className="h-4 w-4 text-yellow-400" />
                            <motion.div 
                              className="absolute inset-0 bg-yellow-400/20 rounded-full optimize-animation"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.1, 0.3]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4 text-primary" />
                            <motion.div 
                              className="absolute top-0 right-0 w-1 h-1 bg-primary/80 rounded-full optimize-animation"
                              animate={{
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.3, 0.8, 0.3]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-resume-wrapper optimize-animation hidden lg:block"
              >
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="nav-resume-btn"
                  asChild
                >
                  <Link href="https://drive.google.com/file/d/1T26Kq9ct7FUtCH04QM5JGDwv2-tw_1As/view?usp=sharing" target="_blank" rel="noopener noreferrer" suppressHydrationWarning>
                    <span className="relative z-10">Resume</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        ease: "easeInOut",
                        repeatDelay: 1 
                      }}
                      className="ml-1.5 relative z-10 optimize-animation"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </motion.div>
                    <span className="nav-resume-shine"></span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 rounded-full opacity-0 -z-10 nav-liquid-gradient optimize-animation"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0, opacity: 0.15 }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

