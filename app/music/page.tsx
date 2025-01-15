import Image from "next/image"

export default function Music() {
  return (
    <div className="h-full w-full animate-fade-in flex flex-col gap-10 items-center justify-center">
      <div className="w-full flex gap-10 items-center justify-center">
        <p className="flex-1 text-center text-lg">coming<br/>soon</p>
        <div className="relative w-[400px]">
          <Image src="/images/music.png" alt="" width={400} height={400} />
          <div className="absolute top-0 left-0 h-[400px] w-full border-[6px] border-[#E9D1A9] pointer-events-none" />
          <p className="text-right w-full opacity-50 mt-1 text-xs">c. 2022</p>
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
