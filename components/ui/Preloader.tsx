"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloaderElement = preloaderRef.current

    const hidePreloader = () => {
      if (document.readyState === "complete") {
        gsap.to(preloaderElement, {
          y: "-100%",
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
          onComplete: () => {
            preloaderElement?.remove()
          },
        })
      }
    }

    if (document.readyState === "complete") {
      hidePreloader()
    } else {
      document.addEventListener("readystatechange", (e) => {
        if (document.readyState === "complete") {
          hidePreloader()
          console.log("Preloader hidden")
        } else {
          console.log("Preloader not hidden")
        }
      })
    }

    return () => {
      document.removeEventListener("readystatechange", hidePreloader)
    }
  }, [])

  return (
    <div
      ref={preloaderRef}
      className="fixed top-0 left-0 right-0 bottom-0 h-screen z-[9999] bg-red-primary preloader flex justify-center items-center"
    ></div>
  )
}

export default Preloader
