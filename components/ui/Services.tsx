"use client"

import { useRef, useLayoutEffect } from "react"
import ServicesList from "./ServicesList"
import BackgroundBubbles from "./BackgroundBubbles"
import Image from "next/image"
import gsap from "gsap"

type ServicesProps = {
  subtitleBackgroundColor: string
  subtitleTextColor: string
  subtitle: string
  subtitleIcon: string
  title: string
  buttonText: string
  buttonLink: string
  tabsContent: object[]
  type: string
  image: string
  additionalImage?: string
}

const Services = ({
  subtitleBackgroundColor,
  subtitleTextColor,
  subtitle,
  subtitleIcon,
  title,
  buttonText,
  buttonLink,
  tabsContent,
  type,
  image,
  additionalImage,
}: ServicesProps) => {
  const container = useRef<HTMLDivElement | null>(null)
  const imageAnimation = useRef(null)
  const additionalImageAnimation = useRef(null)

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!container.current) return

      const { clientX, clientY } = event
      const { width, height, left, top } =
        container.current.getBoundingClientRect()

      const xPos = (clientX - left) / width
      const yPos = (clientY - top) / height

      if (imageAnimation.current) {
        gsap.to(imageAnimation.current, {
          y: (yPos - 0.5) * 20,
          ease: "power2.out",
        })
      }

      if (additionalImage && additionalImageAnimation.current) {
        gsap.to(additionalImageAnimation.current, {
          y: (yPos - 0.5) * 30,
          ease: "power2.out",
        })
      }
    }

    const currentContainer = container.current
    if (currentContainer) {
      currentContainer.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [additionalImage])

  let tab

  if (type === "horizontal") {
    tab = (
      <div
        ref={container}
        className="horizontal-tab flex items-stretch self-stretch h-full gap-20"
      >
        <div className="lg:max-w-[35.4rem] xs:w-full w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div
                className={`rounded-[2rem] py-3 px-4 mb-12 flex items-center justify-center gap-2 ${subtitleBackgroundColor} ${subtitleTextColor}`}
              >
                <Image
                  src={subtitleIcon}
                  alt=""
                  className="w-5"
                  width={15}
                  height={12}
                />
                <h3>{subtitle}</h3>
              </div>
            </div>
            <h2 className="text-headlines/h2 mb-12 w-full">{title}</h2>
          </div>
          <div className="w-full relative z-10 overflow-hidden lg:hidden xs:flex flex-col items-end justify-center lg:min-h-auto sm:min-h-[41.2rem] xs:min-h-[21.8rem] mb-12">
            <BackgroundBubbles
              position="absolute"
              className="z-[-1] rounded-lg rotate-180 overflow-hidden"
              overlayClassName="rounded-lg overflow-hidden"
            />
            <Image
              ref={imageAnimation}
              src={image}
              alt={subtitle}
              loading="lazy"
              className="absolute bottom-[-8%] left-[15%] h-[105%] max-w-none max-h-none w-auto rotate-[-13.477deg]"
              width={1169.191}
              height={774.875}
            />
            {additionalImage && (
              <Image
                ref={additionalImageAnimation}
                src={additionalImage}
                alt={subtitle}
                loading="lazy"
                className="absolute z-[2] sm:top-[29.59%] xs:top-[31%] left-[30%] rotate-[-13.477deg]"
                width={826}
                height={99}
              />
            )}
          </div>
          <div>
            <ServicesList tabList={tabsContent} type={type}></ServicesList>
            <a href={buttonLink} className="btn btn-primary mt-12">
              {buttonText}
            </a>
          </div>
        </div>
        <div className="w-full relative z-10 overflow-hidden lg:flex xs:hidden flex-col items-end justify-center">
          <BackgroundBubbles
            position="absolute"
            className="z-[-1] rounded-lg rotate-180 overflow-hidden"
            overlayClassName="rounded-lg overflow-hidden"
          />
          <img
            ref={imageAnimation}
            src={image}
            alt={subtitle}
            width={1169.191}
            height={774.875}
            loading="lazy"
            className="absolute bottom-[-4%] left-[16.255%] lg:min-h-[100%] sm:min-h-[100%] max-w-none rotate-[-13.477deg]"
          />
          {additionalImage && (
            <img
              ref={additionalImageAnimation}
              src={additionalImage}
              alt={subtitle}
              width={826}
              height={99}
              loading="lazy"
              className="absolute z-[2] left-[26.978%] top-[30.542%] h-[20.777%] w-auto max-w-none rotate-[-13.477deg]"
            />
          )}
        </div>
      </div>
    )
  } else if (type === "vertical") {
    tab = (
      <div
        ref={container}
        className="horizontal-tab radius-[2rem] h-full bg-white-background flex flex-col items-start justify-between"
      >
        <div
          className={`rounded-[2rem] py-3 px-4 mb-6 flex items-center justify-center gap-2 ${subtitleBackgroundColor} ${subtitleTextColor}`}
        >
          <Image
            src={subtitleIcon}
            alt=""
            className="w-5"
            width={15}
            height={12}
          />
          <h3 className="">{subtitle}</h3>
        </div>
        <div className="flex items-end justify-between self-stretch mb-12">
          <h2 className="text-headlines/h2 lg:max-w-[57.778vw] xs:w-full">
            {title}
          </h2>
          <a
            href={buttonLink}
            className="btn btn-primary mt-12 lg:inline-block xs:hidden"
          >
            {buttonText}
          </a>
        </div>
        <div className="mb-12 lg:flex-1 self-stretch relative rounded-[0.5rem] z-10 overflow-hidden lg:h-auto sm:h-[41.2rem] xs:h-[21.8rem]">
          <BackgroundBubbles
            position="absolute"
            className="z-[-1] rotate-180 rounded-lg overflow-hidden"
            overlayClassName="rounded-lg overflow-hidden"
          />
          <div className="absolute left-[50%] translate-x-[-50%] lg:translate-y-[0%] lg:top-[9%] lg:w-[80.539%] lg:h-[91%] sm:w-[86.557%] sm:h-[49.162%] xs:top-[50%] xs:translate-y-[-50%] xs:w-[90.994%] xs:h-[49.162%]">
            <Image
              ref={imageAnimation}
              src={image}
              alt={subtitle}
              loading="lazy"
              className="absolute lg:top-[9.002%] xs:top-[50%] left-[50%] lg:translate-y-[0%] xs:translate-y-[-50%] translate-x-[-50%] w-[100%]"
              width={1076}
              height={672}
            />
            {additionalImage && (
              <Image
                ref={additionalImageAnimation}
                src={additionalImage}
                alt={subtitle}
                loading="lazy"
                className="absolute z-10 lg:rounded-[1rem] lg:top-[14.25rem] lg:left-[20.725%] lg:w-[76.766%] sm:left-[20%] sm:w-[79%] sm:top-[28.729%] xs:left-[20%] xs:w-[79%] xs:top-[30%]"
                width={826}
                height={107}
              />
            )}
          </div>
        </div>
        <ServicesList tabList={tabsContent} type={type}></ServicesList>
        <a
          href={buttonLink}
          className="btn btn-primary mt-12 lg:hidden xs:block"
        >
          {buttonText}
        </a>
      </div>
    )
  }

  return tab
}

export default Services
