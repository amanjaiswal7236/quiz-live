"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import Testimonial from '../components/Testimonial'
import Header from '../components/Header'

gsap.registerPlugin(ScrollTrigger)


export default function Home() {
  const headerRef = useRef(null)
  const heroRef = useRef(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const testimonialsSectionRef = useRef(null)
  const impressSectionRef = useRef(null)

  // useEffect(() => {
  //   gsap.from(headerRef.current, {
  //     y: -50,
      
  //     duration: 1,
  //     ease: "power3.out"
  //   })

  //   gsap.from(heroRef.current, {
      
  //     y: 50,
  //     duration: 1,
  //     delay: 0.5,
  //     ease: "power3.out"
  //   })

  //   gsap.from(testimonialsSectionRef.current, {
  //     opacity: 0,
  //     y: 50,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: testimonialsSectionRef.current,
  //       start: "top bottom-=100",
  //       toggleActions: "play none none reverse"
  //     }
  //   })

  //   gsap.from(impressSectionRef.current, {
  //     opacity: 0,
  //     y: 50,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: impressSectionRef.current,
  //       start: "top bottom-=100",
  //       toggleActions: "play none none reverse"
  //     }
  //   })
  // }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      
      <main className="flex-grow mt-20">
        <section ref={heroRef} className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            What will you ask<br />your audience?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Turn presentations into conversations with interactive polls
            that engage meetings and classrooms.
          </p>
          <Link href="/home" className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-800">
            Go to home
          </Link>
          <p className="mt-4 text-sm text-gray-500">No credit card needed</p>

          <div className="mt-16">
            <Image 
              src="/banner.avif" 
              alt="Mentimeter Interface" 
              width={800} 
              height={400} 
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
              How it works
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4">Get started in 3 steps</h2>
            <p className="text-xl text-gray-600">
              Mentimeter helps you create, interact, and analyse - let&apos;s see how!
            </p>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create",
                description: "Whatever youre looking to create, Mentimeter has the answer. Make your presentation in seconds from a template, or start from scratch, add an interactive slide, and you're all set!",
                bgColor: "bg-pink-100",
                imgSrc: "/HowItWorksCreate.png"
              },
              {
                title: "Interact",
                description: "When presenting your audience can easily join your presentation at Menti.com by entering your presentation unique code. You can both ask and receive questions, with instant results as you go.",
                bgColor: "bg-blue-100",
                imgSrc: "/HowItWorksInteract.png"
              },
              {
                title: "Analyze",
                description: "Track how your audience reacted to your presentation, with slide-by-slide details after you present. You have now access to valuable insights about the questions you asked.",
                bgColor: "bg-yellow-100",
                imgSrc: "/HowItWorksAnalyze.png"
              }
            ].map((step, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <div className={`${step.bgColor} p-6 h-48 relative`}>
                  <Image
                    src={step.imgSrc}
                    alt={step.title}
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-700 text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={testimonialsSectionRef} className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">What our users say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="I now use Mentimeter each month at my team meetings to take a pulse check, it&quot;s easy to setup, fun to use, and very informative!"
              name="Carl Powell"
              position="Head of Delivery - Cloud and Infrastructure, Sky"
              avatarSrc="/logo.svg"
            />
            <Testimonial
              quote="It&quot;s very helpful to make classes interactive and motivating!"
              name="Sandra Elizabeth Cobián Pozos"
              position="High School Teacher, Universidad de Guadalajara, México"
              avatarSrc="/logo.svg"
            />
            <Testimonial
              quote="Mentimeter helps to facilitate student-centered learning and create a fascinating environment for active learning."
              name="Bamidele Victor Ayodele"
              position="Lecturer, Universiti Teknologi PETRONAS"
              avatarSrc="/logo.svg"
            />
          </div>
        </section>

        <section ref={impressSectionRef} className="bg-purple-700 text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-8">Impress with Interactive Presentations</h2>
            <Link href="/home" className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-800">
              Go to home
            </Link>
          </div>
          <div className="absolute left-0 bottom-0 w-1/3 h-24 bg-purple-700 rounded-tr-full"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-24 bg-purple-700 rounded-tl-full"></div>
        </section>
      </main>

      <Footer />
    </div>
  )
}