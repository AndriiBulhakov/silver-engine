import React, { useEffect, useState, useRef, useCallback } from "react"
import Video from "./Video"
import Lottie from "react-lottie"
import { useInView } from "react-intersection-observer"
import animationData1 from "../../public/assets/lottie/finalround_comp01.json"
import animationData2 from "../../public/assets/lottie/finalround_comp02.json"
import animationData3 from "../../public/assets/lottie/finalround_comp03.json"
import animationData4 from "../../public/assets/lottie/finalround_comp04.json"
import animationData5 from "../../public/assets/lottie/finalround_comp05.json"
import animationData1mob from "../../public/assets/lottie/finalround_comp01_mob.json"
import animationData2mob from "../../public/assets/lottie/finalround_comp02_mob.json"
import animationData3mob from "../../public/assets/lottie/finalround_comp03_mob.json"
import animationData4mob from "../../public/assets/lottie/finalround_comp04_mob.json"
import animationData5mob from "../../public/assets/lottie/finalround_comp05_mob.json"

type AnimationData = {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  layers: any[]
}

type TabContentProps = {
  tabs: { video: string }[]
  activeTab: number
}

const animationDataArray: AnimationData[] = [
  animationData1 as AnimationData,
  animationData2 as AnimationData,
  animationData3 as AnimationData,
  animationData4 as AnimationData,
  animationData5 as AnimationData,
]

const animationDataArrayMobile: AnimationData[] = [
  animationData1mob as AnimationData,
  animationData2mob as AnimationData,
  animationData3mob as AnimationData,
  animationData4mob as AnimationData,
  animationData5mob as AnimationData,
]

const TabContent: React.FC<TabContentProps> = ({ tabs, activeTab }) => {
  const [video, setVideo] = useState<string>(tabs[activeTab].video)
  const tabContentRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationDataArray[activeTab],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      lottieRef.current.play()
      videoRef.current?.play()
    } else {
      lottieRef.current.pause()
      videoRef.current?.pause()
    }
  }, [inView])

  useEffect(() => {
    setVideo(tabs[activeTab].video)
  }, [activeTab, tabs])

  return (
    <div
      ref={tabContentRef}
      className="relative sm:mx-5 xs:mx-4 overflow-hidden"
    >
      <Video
        ref={videoRef}
        key={video}
        src={video}
        className="position absolute z-[1] sm:w-[19.3%] sm:h-[33%] object-cover sm:left-[5.6%] sm:top-[14%] sm:rounded-[1.875rem] md:block xs:hidden"
      />
      <Lottie options={defaultOptions} ref={lottieRef} />
    </div>
  )
}

export default TabContent
