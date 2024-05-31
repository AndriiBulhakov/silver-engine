import Image from "next/image"
import logo from "../../public/assets/images/full-logo.svg"
import mobileLogo from "../../public/assets/images/short-logo.svg"

const Logo = ({ className, type }: { className?: string; type: string }) => {
  return (
    <>
      <Image
        src={logo}
        alt="logo"
        loading="lazy"
        className={`${className} ${
          type === "nav" ? "lg:block xs:hidden" : "xs:block"
        }`}
        width={189}
        height={28}
      />
      <Image
        src={mobileLogo}
        alt="logo"
        loading="lazy"
        className={`${className} ${
          type === "nav" ? "lg:hidden xs:block" : "xs:hidden"
        }`}
        width={58}
        height={50}
      />
    </>
  )
}

export { Logo }
