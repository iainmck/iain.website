'use client'
import useEmblaCarousel from 'embla-carousel-react'

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    //dragFree: true
  })
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <div className="h-full animate-fade-in">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {colors.map((color, index) => (
            <div 
              key={index} 
              onClick={() => scrollTo(index)}
              className={`flex-[0_0_auto] cursor-pointer ${
                index === 0 ? 'ml-[calc(50%-300px)]' : ''
              } ${
                index === colors.length - 1 ? 'mr-[calc(50%-300px)]' : ''
              }`}
            >
              <div
                className="w-[min(600px,90vw)] h-[600px] rounded-xl"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
