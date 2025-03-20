'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from 'next/image'

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    // dragFree: true,
  }, [WheelGesturesPlugin()])
  
  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <div className="h-full animate-fade-in flex items-center">
      <div className="overflow-hidden flex-col justify-center items-center" ref={emblaRef}>
        <div className="flex gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              onClick={() => scrollTo(index)}
              className={`flex-[0_0_auto] cursor-pointer ${
                index === 0 ? 'ml-[calc(50%-min(300px,45vw))]' : ''
              } ${
                index === projects.length - 1 ? 'mr-[calc(50%-min(300px,45vw))]' : ''
              }`}
            >
              <ProjectCard {...project} index={index} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-5 opacity-50">
          <h1 className="text-sm block md:hidden">swipe →</h1>
          <h1 className="text-sm hidden md:block">← drag →</h1>
        </div>
      </div>

      <Image
        src="/images/statue.png"
        alt=""
        width={400}
        height={200}
        className="absolute bottom-0 -left-10 hidden lg:block"
      />
    </div>
  )
}

interface ProjectCardProps {
  tagline: string
  titleImage: string
  titleMarginAdjust?: number
  titleHeightAdjust?: number
  description: string
  colorBg: string
  colorFg: string
  link: string
  background: React.ReactNode
  showCreds?: boolean
}

function ProjectCard(props: ProjectCardProps & { index: number }) {
  return (
    <div 
      className="w-[min(600px,90vw)] h-[calc(100vh-150px)] flex-grow max-h-[600px] rounded-[20px] relative font-sans tracking-[-0.03em] select-none" 
      style={{ backgroundColor: props.colorBg, color: props.colorFg }}
    >
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        {props.background}
      </div>
      
      {/* Content layer */}
      <div className="relative z-10 p-6 flex flex-col items-start h-full">
        <p className="text-sm font-extralight">00{props.index + 1}</p>
        <h1 className="text-sm">{props.tagline}</h1>
        
        <div className="flex-[2]" /> {/* spacer */}

        <Image 
          src={`/images/${props.titleImage}`} 
          alt={props.titleImage} 
          width={500}
          height={100}
          className="w-auto h-auto" 
          loading="eager"
          priority={props.index === 0}
          style={{ 
            marginBottom: `${props.titleMarginAdjust || 0}px`,
            maxHeight: `${90 + (props.titleHeightAdjust || 0)}px`,
          }}
        />
        <h1 className="text-base mt-6 max-w-[370px] leading-[1.2]">
          {props.description}
        </h1>

        <div className="flex-1" /> {/* spacer */}
        
        <div className="flex items-center">
          {props.link ? (
            <a 
              href={props.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ backgroundColor: props.colorFg }}
              className="inline-block py-[5px] px-[16px] rounded-full text-[18px] text-black/60 border border-black/10 transition-opacity hover:opacity-80"
            >
              Try it out
            </a>
          ) : (
            <p className="text-sm">temporarily offline</p>
          )}

          {props.showCreds && (
            <p className="ml-3 text-[12px] opacity-80">
              u: guest@user.com<br/>p: password
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const projects: ProjectCardProps[] = [
  {
    tagline: 'AI voice recorder & memory',
    titleImage: 'spacebar-title.png',
    titleHeightAdjust: -5,
    description: 'Too long, didn\'t listen. Spacebar listens to conversations for you, turning them into beautifully organized records for later.',
    colorBg: '#3D05DD',
    colorFg: '#FCB0F3',
    link: 'https://spacebar.fm',
    background: <div className="w-full h-full flex items-start justify-end opacity-70">
      <Image 
        src="/images/spacebar-hero.jpg" 
        alt="" 
        width={360} 
        height={300} 
        loading="eager"
        className="z-10 mr-2 mt-5 md:mt-20 scale-75 md:scale-100 origin-top-right" 
      />
      <div className="absolute inset-0 bg-black rounded-[20px]" />
    </div>,
  },
  {
    tagline: 'Universal image recognition',
    titleImage: 'harvest-title.png',
    description: 'Magically pulls all the goodies from your photo library. Instagram screenshots become Spotify playlists, saved Google places, Letterboxd lists...',
    colorBg: '#30312D',
    colorFg: '#70993E',
    link: 'https://garden.harvestit.com',
    background: <div className="w-full flex justify-end opacity-90">
      <Image 
        src="/images/harvest-hero.png" 
        alt="" 
        width={260} 
        height={50} 
        loading="eager"
        className="mt-20 md:mt-12 mr-5 md:mr-10 scale-90 md:scale-100 origin-right" 
      />
    </div>,
    showCreds: true,
  },
  {
    tagline: 'AI family biographer',
    titleImage: 'memoir-title.png',
    titleHeightAdjust: -10,
    description: 'Your grandma deserves a wiki page. Record stories about the important people in you life, and automatically build living memoirs that will last forever.',
    colorBg: '#92261A',
    colorFg: '#F0B961',
    link: 'https://heymemoir.com',
    background: <div className="w-full flex justify-end opacity-90">
      <Image 
        src="/images/memoir-hero.png" 
        alt="" 
        width={180} 
        height={180} 
        loading="eager"
        className="z-10 mt-10 mr-5 md:mr-10 rotate-[10deg] scale-75 md:scale-100 origin-top-right" 
      />
    </div>,
  },
  {
    tagline: 'Opinionated chatbot',
    titleImage: 'dinnerparty-title.png',
    titleMarginAdjust: -15,
    description: 'Ugh. Chatbots give the same sterile, generic answers. Dinner Party is different. We forced AI to take divisive stances, drawing on the greatest thinkers of all time.',
    colorBg: '#0D2231',
    colorFg: '#3A98DC',
    link: 'https://party.spacebar.fm',
    background: <div className="w-full flex justify-end opacity-90">
      <Image 
        src="/images/dinnerparty-hero.png" 
        alt="" 
        width={250} 
        height={200} 
        loading="eager"
        className="mt-14 md:mt-20 mr-5 md:mr-10 scale-90 md:scale-100 origin-top-right" 
      />
    </div>,
  },
]
