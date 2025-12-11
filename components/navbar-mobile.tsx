"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, ChevronRight, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation"

export function NavbarMobile() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("#home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Theme animation hook for mobile only
  const { ref: mobileThemeRef, toggleSwitchTheme: toggleMobileTheme } = useModeAnimation({
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    try {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
      } else {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      }
    } catch (error) {
      console.warn('Error managing body scroll:', error);
    }
    
    return () => {
      try {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      } catch (error) {
        console.warn('Error resetting body scroll:', error);
      }
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
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

  const toggleMobileThemeHandler = async () => {
    await toggleMobileTheme()
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

  return (
    <>
      <header
        className="fixed top-4 left-0 right-0 z-50 w-full md:hidden"
        suppressHydrationWarning
      >
        <div className="modern-navbar mx-auto max-w-full" suppressHydrationWarning>
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
                <div className="nav-logo-inner">
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="nav-logo-text">A</span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    style={{ filter: "blur(8px)" }}
                  />
                </div>
              </div>
              <div className="nav-logo-text-container">
                <span className="nav-brand-text">
                  Abdullah<span className="nav-brand-dot">  .</span>
                </span>
              </div>
            </Link>
            <div className="nav-actions flex items-center gap-2 flex-shrink-0">
              <button
                ref={mobileThemeRef}
                onClick={toggleMobileThemeHandler}
                className="nav-theme-toggle w-9 h-9 rounded-full flex items-center justify-center bg-background/50 hover:bg-background/80 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                suppressHydrationWarning
              >
                {mounted && (
                  <>
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-primary" />
                    )}
                  </>
                )}
              </button>
              <button
                className="nav-menu-trigger"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="nav-hamburger">
                  <span className="nav-hamburger-line" />
                  <span className="nav-hamburger-line" />
                  <span className="nav-hamburger-line" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-[85%] sm:w-[280px] bg-background/95 backdrop-blur-md z-50 nav-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="nav-mobile-pattern"></div>
            <div className="p-5 flex flex-col h-full relative z-10">
              <div className="flex justify-between items-center">
                <div className="nav-logo-mobile">
                  <div className="nav-logo-shine"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="nav-logo-text">A</span>
                    <div 
                      className="absolute inset-0 bg-primary/30 rounded-full"
                      style={{ filter: "blur(8px)" }}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="!border-0 hover:bg-transparent relative group nav-close-btn"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 group-hover:text-primary transition-colors" />
                </Button>
              </div>
              <div className="mt-6 sm:mt-10 flex-1">
                <nav className="space-y-2.5" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link 
                        href={link.href}
                        className={`nav-mobile-link ${activeLink === link.href ? 'nav-mobile-active' : ''}`}
                        onClick={() => {
                          setActiveLink(link.href)
                          setIsMobileMenuOpen(false)
                        }}
                        aria-current={activeLink === link.href ? "page" : undefined}
                        suppressHydrationWarning
                      >
                        <div className="nav-mobile-link-content">
                          <div className="nav-mobile-dot"></div>
                          <span>{link.label}</span>
                        </div>
                        <div>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        {activeLink === link.href && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-primary/5 rounded-lg -z-10" />
                        )}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="mt-auto pb-5">
                <div className="nav-mobile-footer">
                  <Button 
                    size="sm" 
                    className="w-full nav-mobile-resume group"
                    asChild
                  >
                    <Link href="https://drive.google.com/file/d/1T26Kq9ct7FUtCH04QM5JGDwv2-tw_1As/view?usp=sharing" target="_blank" rel="noopener noreferrer" suppressHydrationWarning>
                      <span className="relative z-10">View Resume</span>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary/80 via-blue-600/80 to-primary/80 rounded-lg opacity-90 -z-0"
                      />
                      <span className="nav-mobile-resume-shine"></span>
                    </Link>
                  </Button>
                  <div className="flex justify-center mt-5">
                    <button
                      ref={mobileThemeRef}
                      onClick={toggleMobileThemeHandler}
                      className="nav-theme-toggle-mobile"
                      suppressHydrationWarning
                    >
                      {mounted && (theme === "dark" ? 
                        <span className="flex items-center">Switch to Light <Sun className="h-4 w-4 ml-2 text-yellow-400" /></span> : 
                        <span className="flex items-center">Switch to Dark <Moon className="h-4 w-4 ml-2 text-primary" /></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
