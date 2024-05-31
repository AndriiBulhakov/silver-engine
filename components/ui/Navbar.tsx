"use client"
import { useState, useEffect, useRef } from "react"
import { Logo } from "@/components/ui/Logo"
import navStyles from "./NavbarMobile.module.css"
import { navLinks } from "@/data"
import gsap from "gsap"

function Navbar() {
  const [menuToggle, setMenuToggle] = useState<boolean>(false)
  const [navColor, setNavColor] = useState<boolean>(false)
  const navbar = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef<number>(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    const scrollingDown = currentScrollY > lastScrollY.current

    if (scrollingDown && currentScrollY > 100) {
      if (navbar.current) {
        gsap.to(navbar.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        })
      }
    } else {
      if (navbar.current) {
        gsap.to(navbar.current, { y: "0%", duration: 0.5, ease: "power2.out" })
      }
    }
    lastScrollY.current = currentScrollY
    setNavColor(currentScrollY > 100)
  }

  useEffect(() => {
    const onScroll = () => {
      handleScroll()
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (menuToggle) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [menuToggle])

  return (
    <nav
      ref={navbar}
      className={`flex flex-row items-center justify-between font-medium text-body/medium  lg:py-[0.8rem] lg:px-5 xs:p-4 fixed z-[100] top-0 left-0 right-0 ${
        navColor ? "nav-scroll" : ""
      }`}
    >
      <a
        href="/"
        className="without-underline navbar-logo relative z-10 lg:visible-translate-y-2 xs:visible-translate-y-0 lg:w-[11.8125rem] xs:w-[3.58075rem]"
      >
        <Logo type="nav" />
      </a>
      <div
        className={`navbar-menu__wrapper ${navStyles["navbar-menu__wrapper"]} ${
          menuToggle ? navStyles["is--active"] : ""
        }`}
      >
        <ul className="navbar flex  gap-8 items-center">
          {navLinks.map((item, i) => {
            return (
              <li
                key={i + 1}
                className={`${item.mobileOnly ? "xl:hidden xs:block" : ""} ${
                  item.icon ? "flex items-center gap-[0.38rem]" : ""
                }`}
              >
                {item.type === "button" ? (
                  <button className="btn btn-primary">{item.name}</button>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth <= 1024) {
                        setMenuToggle(!menuToggle)
                      }
                    }}
                  >
                    {item.name}
                  </a>
                )}{" "}
                {item.icon ? (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M2 8.86603C1.33333 8.48113 1.33333 7.51888 2 7.13397L11 1.93782C11.6667 1.55292 12.5 2.03405 12.5 2.80385L12.5 13.1962C12.5 13.966 11.6667 14.4471 11 14.0622L2 8.86603Z"
                        fill="#FF4800"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      <ul className="navbar flex gap-5 items-center relative z-10 xl:ml-0 xs:ml-auto">
        {navLinks.map((item, i) => {
          if (item.mobileOnly) {
            return (
              <li key={i + 1}>
                {item.type === "button" ? (
                  <a
                    href={item.href}
                    className="btn btn-primary without-underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a href={item.href} className="xl:block xs:hidden">
                    {item.name}
                  </a>
                )}
              </li>
            )
          }
          return null
        })}
      </ul>

      <button
        className={`xl:hidden xs:block self-stretch ${
          menuToggle ? "bg-gray-quinary" : "bg-white-background"
        }  p-4 ml-2 rounded-lg relative z-10 `}
        onClick={() => setMenuToggle(!menuToggle)}
      >
        <div className="flex flex-col gap-1.5 items-center justify-center w-6 h-6">
          <div
            className={`h-[0.09375rem] w-[1.375rem] rounded-lg bg-gray-primary ease-in-out duration-300 origin-center ${
              menuToggle ? "transform rotate-45 translate-y-[0.21875rem]" : ""
            }`}
          ></div>
          <div
            className={`h-[0.09375rem] w-[1.375rem] rounded-lg bg-gray-primary ease-in-out duration-300 origin-center ${
              menuToggle ? "transform -rotate-45 -translate-y-[0.21875rem]" : ""
            }`}
          ></div>
        </div>
      </button>
    </nav>
  )
}

export { Navbar }
