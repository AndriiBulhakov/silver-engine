import NewsletterForm from "./ui/NewsletterForm"
// import SubscriptionForm from "./ui/SubscriptionForm"
import React from "react"

const Subscription = () => {
  return (
    <section className="lg:pt-[15.06rem] lg:pb-[13.81rem] sm:py-[11.75rem] xs:pt-[8.75rem] xs:pb-[6.19rem] flex justify-center">
      <div className="flex flex-col items-center gap-12 max-w-[40rem] text-center">
        <h2 className="text-headlines/h2 lg:mx-5 xs:mx-4">
          Oh, hey-let’s be inbox friends.
          <br />
          Get updates, offers and other news
        </h2>
        <NewsletterForm />
      </div>
    </section>
  )
}

export default Subscription
