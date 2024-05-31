"use client"

import { useState } from "react"
import { tabContent } from "@/data"
import TabList from "./ui/TabList"
import dynamic from "next/dynamic"

const TabContent = dynamic(() => import("./ui/TabContent"), {
  ssr: false,
})

function Chat() {
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <section id="interview-copilot">
      <div className="mx-auto max-w-[68.625rem]">
        <TabList
          tabContent={tabContent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabContent tabs={tabContent} activeTab={activeTab} />
      </div>
    </section>
  )
}

export default Chat
