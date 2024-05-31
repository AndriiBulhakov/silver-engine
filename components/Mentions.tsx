"use client"

import SectionsHeader from "./ui/SectionHeader"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import Carousel from "./ui/Carousel"
import { EmblaOptionsType } from "embla-carousel"
import Image from "next/image"

interface Mention {
  id: string
  cmsLocaleId: string
  lastPublished: string | null
  lastUpdated: string
  createdOn: string
  isArchived: boolean
  isDraft: boolean
  fieldData: {
    quote: string
    name: string
    logo: {
      fileId: string
      url: string
      alt: string | null
    }
    slug: string
  }
}

const OPTIONS: EmblaOptionsType = {
  loop: true,
  containScroll: false,
  align: "center",
}

const Mentions = () => {
  const [mentionsSlides, setMentionsSlides] = useState<JSX.Element[]>([])
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    const fetchMentions = async () => {
      try {
        const response = await axios.get("/api/mentions")
        const mentions: Mention[] = response.data.items

        const slides = mentions.map((mention: Mention, index: number) => (
          <div
            key={index}
            className="flex flex-col items-start self-start sm:max-w-[19.4rem] xs:max-w-[16.8rem] text-wrap"
          >
            <h3 className="quote-title text-headlines/h3 text-blue-secondary mb-6">
              {mention.fieldData.quote}
            </h3>
            <p className="text-body/medium text-pink-secondary mb-10">
              {mention.fieldData.name}
            </p>
            <img
              src={mention.fieldData.logo.url}
              alt={mention.fieldData.name}
              className="max-h-12"
            />
          </div>
        ))

        setMentionsSlides(slides)
      } catch (error) {
        console.error("Failed to fetch mentions:", error)
      }
    }

    fetchMentions()
  }, [])

  return (
    <section className="sm:px-5 xs:px-4">
      <div className="relative py-[5.5rem] rounded-[2rem] overflow-hidden flex flex-col items-center gap-20">
        <SectionsHeader
          title="Groundbreaking innovation for interviewees, as featured on"
          subtitle="We're Humble to Mention"
          textColor="text-blue-secondary"
          className="px-12"
        />
        <Carousel
          options={OPTIONS}
          slides={mentionsSlides}
          gap={57}
          stopOnHover={true}
        />
        <Image
          src="/assets/images/mentions-bg.webp"
          alt="CTA Background"
          loading="lazy"
          className="absolute top-0 right-0 left-0 bottom-0 min-w-[100%] min-h-[100%] object-cover max-w-none"
          width={1083}
          height={718}
        />
      </div>
    </section>
  )
}

export default Mentions
