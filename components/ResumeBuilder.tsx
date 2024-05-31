import Services from "./ui/Services"
import StickySection from "./ui/StickySection"
import { resumeBuilderContent } from "@/data"

const ResumeBuilder = () => {
  return (
    <StickySection sectionClassName="lg:pb-5 xs:pb-0" id="ai-resume-builder">
      <Services
        tabsContent={resumeBuilderContent}
        subtitleBackgroundColor="bg-red-primary"
        subtitleTextColor="text-blue-secondary"
        subtitle="AI Resume Builder"
        subtitleIcon="/assets/images/ai-resume-builder.svg"
        title="Generate a hireable resume with ease in one-click."
        buttonText="Launch Resume Builder"
        buttonLink="#"
        type="horizontal"
        image="/assets/images/sticky-tabs/ats-optimized.webp"
      />
    </StickySection>
  )
}

export default ResumeBuilder
