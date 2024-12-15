"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sidebar from '../../../components/Sidebar'
import { UserCircle, Cloud, BarChart2, MessageCircle, Sliders, List, MapPin, Menu } from 'lucide-react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

gsap.registerPlugin(ScrollTrigger)

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const welcomeRef = useRef<HTMLHeadingElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const recentlyViewedRef = useRef<HTMLDivElement>(null)
    const templatesRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)
    const tutorialsRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const userIconRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     const timeline = gsap.timeline()

    //     if (sidebarRef.current) {
    //         timeline.from(sidebarRef.current, {
    //             x: -100,
    //             opacity: 0,
    //             duration: 0.8,
    //             ease: "power3.out"
    //         })
    //     }

    //     if (userIconRef.current) {
    //         timeline.from(userIconRef.current, {
    //             y: -50,
    //             opacity: 0,
    //             duration: 0.5,
    //             ease: "power3.out"
    //         }, "-=0.4")
    //     }

    //     if (welcomeRef.current) {
    //         timeline.from(welcomeRef.current, {
    //             y: -50,
    //             opacity: 0,
    //             duration: 0.8,
    //             ease: "power3.out"
    //         }, "-=0.4")
    //     }

    //     if (buttonsRef.current) {
    //         timeline.from(buttonsRef.current.children, {
    //             y: 20,
    //             opacity: 0,
    //             duration: 0.5,
    //             stagger: 0.2,
    //             ease: "power3.out"
    //         }, "-=0.4")
    //     }

    //     if (recentlyViewedRef.current) {
    //         timeline.from(recentlyViewedRef.current, {
    //             y: 50,
    //             opacity: 0,
    //             duration: 0.8,
    //             ease: "power3.out"
    //         }, "-=0.2")
    //     }

    //     if (templatesRef.current) {
    //         gsap.from(templatesRef.current.children, {
    //             opacity: 0,
    //             y: 50,
    //             duration: 0.8,
    //             stagger: 0.2,
    //             scrollTrigger: {
    //                 trigger: templatesRef.current,
    //                 start: "top bottom-=100",
    //                 toggleActions: "play none none reverse"
    //             }
    //         })
    //     }

    //     if (featuresRef.current) {
    //         gsap.from(featuresRef.current.children, {
    //             opacity: 0,
    //             scale: 0.8,
    //             duration: 0.5,
    //             stagger: 0.1,
    //             scrollTrigger: {
    //                 trigger: featuresRef.current,
    //                 start: "top bottom-=100",
    //                 toggleActions: "play none none reverse"
    //             }
    //         })
    //     }

    //     if (tutorialsRef.current) {
    //         gsap.from(tutorialsRef.current.children, {
    //             opacity: 0,
    //             x: -50,
    //             duration: 0.5,
    //             stagger: 0.1,
    //             scrollTrigger: {
    //                 trigger: tutorialsRef.current,
    //                 start: "top bottom-=100",
    //                 toggleActions: "play none none reverse"
    //             }
    //         })
    //     }

    // }, [])

    const features = [
        { name: 'Word cloud', icon: Cloud, color: 'text-purple-500', hoverColor: 'hover:bg-purple-100' },
        { name: 'Poll', icon: BarChart2, color: 'text-blue-500', hoverColor: 'hover:bg-blue-100' },
        { name: 'Open ended', icon: MessageCircle, color: 'text-green-500', hoverColor: 'hover:bg-green-100' },
        { name: 'Scales', icon: Sliders, color: 'text-yellow-500', hoverColor: 'hover:bg-yellow-100' },
        { name: 'Ranking', icon: List, color: 'text-red-500', hoverColor: 'hover:bg-red-100' },
        { name: 'Pin on Image', icon: MapPin, color: 'text-pink-500', hoverColor: 'hover:bg-pink-100' },
    ]

    const templates = [
        { name: 'Fun meeting kickstarter', image: '/meeting.avif' },
        { name: 'Thesis check-in', image: '/thesis.avif' },
        { name: 'Fun class icebreakers', image: '/class.avif' },
        { name: 'Course evaluation survey', image: '/evaluation.avif' },
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div ref={sidebarRef} className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="bg-white shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 text-gray-600 lg:hidden">
                                <Menu size={24} />
                            </button>
                            <h1 ref={welcomeRef} className="text-xl sm:text-2xl font-bold">Welcome, Aman Jaiswal</h1>
                        </div>
                        <div ref={userIconRef} className="relative group">
                            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label="User menu">
                                <UserButton />
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-8">
                            <button className="bg-black text-white px-4 py-2 rounded">New Menti</button>
                            <button className="bg-white text-black px-4 py-2 rounded border border-gray-300">Start with AI</button>
                            <button className="bg-white text-black px-4 py-2 rounded border border-gray-300">Import presentation</button>
                        </div>

                        <div ref={recentlyViewedRef} className="mb-12">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Recently viewed</h2>
                            <div className="bg-white p-4 rounded shadow">
                                <h3 className="text-lg sm:text-xl mb-2">Welcome to our quiz! 🎉</h3>
                                <p className="text-gray-600">My first Quiz</p>
                                <p className="text-sm text-gray-400">Edited Sep 22, 2024</p>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Popular templates in Education</h2>
                            <div ref={templatesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {templates.map((template, index) => (
                                    <div key={index} className="bg-white p-4 rounded shadow">
                                        <div className="h-32 mb-2 rounded overflow-hidden">
                                            <Image src={template.image} alt={template.name} width={600} height={400} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-sm font-medium">{template.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Popular features</h2>
                            <div ref={featuresRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`bg-white p-4 rounded shadow text-center transition-all duration-300 ease-in-out transform hover:scale-105 ${feature.hoverColor}`}
                                    >
                                        <feature.icon className={`w-8 h-8 mb-2 mx-auto ${feature.color}`} />
                                        <p className="text-sm font-medium">{feature.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Quick tutorials</h2>
                            <div ref={tutorialsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div ref={tutorialsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { title: 'What is a Menti?', duration: '1 min read' },
                                        { title: 'Creating your first Menti', duration: '7 min watch' },
                                        { title: 'How to present', duration: '1 min read' },
                                        { title: 'How participants join', duration: '2 min read' },
                                        { title: 'Using Mentimeter with other tools', duration: '4 min watch' }
                                    ].map((tutorial, index) => (
                                        <div key={index} className="bg-white p-4 rounded shadow">
                                            <h3 className="font-medium mb-1">{tutorial.title}</h3>
                                            <p className="text-sm text-gray-500">{tutorial.duration}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
