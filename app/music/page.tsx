import Image from "next/image"

export default function Music() {
  return (
    <div className="h-full w-full animate-fade-in flex flex-col gap-10 items-center justify-center p-10">
      <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
        <p className="flex-1 text-center text-lg">coming<br/>soon</p>
        <div className="relative">
          <Image src="/images/music.png" alt="" width={400} height={400} />
          <div className="absolute top-0 left-0 w-full h-full border-[6px] border-[#E9D1A9] pointer-events-none" />
          <p className="absolute -bottom-[20px] right-0 opacity-50 text-xs">c. 2022</p>
        </div>
        <div className="flex-1 flex justify-center">
          <a href="https://soundcloud.com/iainmckenzie" target="_blank" rel="noopener noreferrer">
            <Image src="/images/soundcloud.png" alt="" width={35} height={35} />
          </a>
        </div>
      </div>
    </div>
  )
}
