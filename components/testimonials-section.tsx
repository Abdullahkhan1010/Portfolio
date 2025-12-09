"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { ClientOnly } from "./client-only"

// Define an interface for the star objects
interface StarProps {
  id: string;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

const testimonials = [
  {
    id: 1,
    content:
      "Abdullah delivered an exceptional high-performance portfolio for Manzil Media with stunning animations and impressive Lighthouse scores. His technical expertise and attention to detail exceeded our expectations.",
    name: "Hasnat",
    title: "Manzil Media",
    avatar: "👨",
  },
  {
    id: 2,
    content:
      "Working with Abdullah was fantastic. He built our fitness platform with perfect functionality, WooCommerce integration, and beautiful design. Our customers love the seamless experience he created.",
    name: "Ali",
    title: "Fight House",
    avatar: "👨",
  },
  {
    id: 3,
    content:
      "Abdullah's expertise in Shopify development transformed our store. He optimized performance to 90+ PageSpeed, implemented custom modules, and managed our inventory flawlessly. Highly recommended!",
    name: "Sidra",
    title: "Magasin Daata",
    avatar: "👩",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  // Fix: Explicitly type the stars state
  const [stars, setStars] = useState<StarProps[]>([])
  const [isMounted, setIsMounted] = useState(false)

  const STAR_COUNT = 12; // Lowered for performance

  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const memoizedStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
        id: `star-${i}`,
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 97}%`,
        size: Math.floor(Math.random() * 5) + 2,
        delay: i * 0.09,
        duration: 5 + (i % 9)
      }))
      setStars(memoizedStars)
    }
  }, [isMounted])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-12 md:py-24 relative overflow-visible">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      {/* Animated glowing background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.13, 0.22, 0.13] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.11, 0.18, 0.11] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Client-side rendered stars - hide some on mobile */}
        <ClientOnly>
          {stars.map((star, index) => (
            <motion.div
              key={star.id}
              className={index > 6 ? 'hidden sm:block absolute' : 'absolute'}
              style={{
                top: star.top,
                left: star.left,
                pointerEvents: "none",
                willChange: 'transform, opacity',
                contain: 'layout paint',
                backfaceVisibility: 'hidden'
              }}
              animate={{
                opacity: [0.18, 0.7, 0.18],
                scale: [1, 1.25, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
              }}
            >
              <Star className={`w-${star.size} h-${star.size} text-primary/40 drop-shadow`} />
            </motion.div>
          ))}
        </ClientOnly>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 md:mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 via-blue-500/10 to-cyan-500/10 text-primary text-xs md:text-base font-semibold mb-3 shadow backdrop-blur-sm tracking-wide">
            <span className="inline-flex items-center gap-1 md:gap-2">
              <Star className="w-3 h-3 md:w-4 md:h-4 animate-pulse text-primary" />
              Testimonials
            </span>
          </div>
          <h2 className="text-xl md:text-4xl font-bold font-poppins text-center mb-2">
            What <span className="text-gradient animate-gradient-move">Clients Say</span>
          </h2>
          <motion.div
            className="mx-auto mt-2 mb-6 h-1 w-16 md:w-24 rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-500 shadow-lg"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ originX: 0.5 }}
          />
          <p className="text-center text-xs md:text-base text-muted-foreground max-w-2xl mt-2 px-2">
            Here’s what people I’ve worked with have to say about my work and collaboration.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="flex flex-col items-center justify-center w-full px-2">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80, damping: 18 }}
            className="relative w-full max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-background/90 via-primary/10 to-blue-100/10 dark:from-background/80 dark:via-primary/10 dark:to-blue-900/10 shadow-2xl border border-primary/10 p-4 md:p-14 flex flex-col items-center backdrop-blur-xl"
          >
            {/* Quotation mark background on top left (not clipped) */}
            <motion.div
              className="absolute -top-4 -left-4 md:-top-6 md:-left-6 pointer-events-none select-none z-0 scale-75 md:scale-100"
              initial={{ opacity: 0.10, scale: 0.8 }}
              animate={{ opacity: 0.16, scale: 1 }}
              transition={{ duration: 0.7 }}
              aria-hidden="true"
            >
              <Quote className="w-16 h-16 md:w-20 md:h-20 text-primary/10" />
            </motion.div>
            {/* Animated quote icon */}
            <motion.div
              className="absolute -top-5 left-1/25 -translate-x-1/2 bg-gradient-to-br from-primary/90 to-blue-500/80 rounded-full p-2 md:p-3 shadow-lg"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Quote className="w-5 h-5 md:w-8 md:h-8 text-white drop-shadow" />
            </motion.div>
            {/* Testimonial text */}
            <motion.p
              className="text-sm md:text-xl text-center text-muted-foreground font-medium mb-4 md:mb-8 mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              "{testimonials[activeIndex].content}"
            </motion.p>
            {/* Animated stars */}
            <div className="flex gap-1 mb-4 md:mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-400"
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }}
                >
                  <Star className="w-3 h-3 md:w-5 md:h-5 drop-shadow" />
                </motion.span>
              ))}
            </div>
            {/* Avatar and info */}
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <motion.div
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-blue-500/20 text-4xl md:text-5xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {testimonials[activeIndex].avatar}
              </motion.div>
              <span className="font-bold text-sm md:text-lg text-primary">{testimonials[activeIndex].name}</span>
              <span className="text-xs md:text-sm text-muted-foreground">{testimonials[activeIndex].title}</span>
            </div>
            {/* Animated border accent - animate from center to both ends */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] overflow-hidden rounded-b-3xl pointer-events-none">
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 shadow-lg"
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={{ scaleX: 1, originX: 0.5 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Navigation - make more touch-friendly on mobile */}
          <div className="flex items-center justify-center gap-3 md:gap-6 mt-6 md:mt-10">
            <motion.button
              onClick={prevTestimonial}
              className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg transition-all flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${activeIndex === i
                    ? "bg-primary shadow"
                    : "bg-primary/20"
                    }`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            <motion.button
              onClick={nextTestimonial}
              className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg transition-all flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

