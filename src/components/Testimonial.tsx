import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface TestimonialProps {
    quote: string
    name: string
    position: string
    avatarSrc: string
  }
  
  export default function Testimonial({ quote, name, position, avatarSrc }: TestimonialProps) {
    const testimonialRef = useRef(null)
  
    // useEffect(() => {
    //   gsap.from(testimonialRef.current, {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: testimonialRef.current,
    //       start: "top bottom-=100",
    //       toggleActions: "play none none reverse"
    //     }
    //   })
    // }, [])
  
    return (
      <div ref={testimonialRef} className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">"{quote}"</p>
        <div className="flex items-center">
          <Image
            src={avatarSrc}
            alt={`Avatar of ${name}`}
            width={50}
            height={10}
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
      </div>
    )
  }