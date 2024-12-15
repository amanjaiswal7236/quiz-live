"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sidebar from '../../../components/Sidebar'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { CloudIcon, BarChartIcon, PencilIcon, ScaleIcon, ListOrderedIcon, ImageIcon } from 'lucide-react'
import { TutorialDialog } from './_components/tutorial-dialog'

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const welcomeRef = useRef<HTMLHeadingElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const recentlyViewedRef = useRef<HTMLDivElement>(null)
    const templatesRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)
    const tutorialsRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const userIconRef = useRef<HTMLDivElement>(null)

    const user = useUser();

    useEffect(() => {
        const timeline = gsap.timeline()

        // Animate sidebar
        // timeline.fromT(sidebarRef.current, {
        //     x: -100,
        //     opacity: 0,
        //     duration: 0.8,
        //     ease: "power3.out"
        // }).to(sidebarRef.current, {
        //     opacity: 1,
        // });

        timeline.from(welcomeRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4").to(welcomeRef.current, {
            opacity: 1, // Ensure opacity is set to 1
        }, "-=0.4");

        // Ensure buttonsRef and its children exist
        if (buttonsRef.current) {
            timeline.from(buttonsRef.current.children, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.4").to(buttonsRef.current?.children, {
                opacity: 1, // Ensure opacity is set to 1
            });
        }

        timeline.from(recentlyViewedRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.2").to(recentlyViewedRef.current, {
            opacity: 1, // Ensure opacity is set to 1
        });

        if (templatesRef.current) {
            gsap.from(templatesRef.current.children, {
                opacity: 1,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: templatesRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            })
        }

        if (featuresRef.current) {
            gsap.from(featuresRef.current.children, {
                opacity: 1,
                scale: 0.8,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            })
        }

        if (tutorialsRef.current) {
            gsap.from(tutorialsRef.current.children, {
                opacity: 1,
                x: -50,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: tutorialsRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            })
        }

    }, [])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const features = [
        { name: 'Word cloud', icon: CloudIcon, color: 'text-blue-500' },
        { name: 'Poll', icon: BarChartIcon, color: 'text-green-500' },
        { name: 'Open ended', icon: PencilIcon, color: 'text-yellow-500' },
        { name: 'Scales', icon: ScaleIcon, color: 'text-red-500' },
        { name: 'Ranking', icon: ListOrderedIcon, color: 'text-purple-500' },
        { name: 'Pin on Image', icon: ImageIcon, color: 'text-pink-500' },
    ]

    const [selectedTutorial, setSelectedTutorial] = useState<{ title: string; duration: string } | null>(null)

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div ref={sidebarRef} className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-10' : 'w-0'}`}>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            </div>
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="max-w-6xl mx-auto p-8">
                    <header className="bg-white shadow-sm mb-8">
                        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Welcome, {user.user?.fullName || "Guest"}</h1>
                            <div className="relative group">
                                <UserButton afterSignOutUrl='/' />
                            </div>
                        </div>
                    </header>
                    <div className="flex space-x-4 mb-8">
                        <Button asChild><Link href="/create">New Quiz</Link></Button>
                        <Button variant="outline">Start with AI</Button>
                        <Button variant="outline">Import presentation</Button>
                    </div>

                    <section className="mb-24">
                        <h2 className="text-2xl font-semibold mb-4">Recently viewed</h2>
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome to our quiz! 🎉</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">My first Quiz</p>
                                <p className="text-sm text-gray-400">Edited Sep 22, 2024</p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-24">
                        <h2 className="text-2xl font-semibold mb-4">Popular templates in Education</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {['Fun meeting kickstarter', 'Thesis check-in', 'Fun class icebreakers', 'Course evaluation survey'].map((template, index) => (
                                <Card key={index} className="transition-all duration-300 hover:border-purple-700 hover:scale-105 cursor-pointer" onClick={() => console.log(`Clicked on ${template}`)}>
                                    <CardContent className="p-4">
                                        <div className="h-32 bg-gray-200 mb-2 rounded"></div>
                                        <p className="text-sm font-medium">{template}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="mb-24">
                        <h2 className="text-2xl font-semibold mb-4">Popular features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {features.map((feature, index) => (
                                <Card key={index} className="transition-all duration-300 hover:border-purple-700 hover:scale-105 cursor-pointer" onClick={() => console.log(`Clicked on ${feature.name}`)}>
                                    <CardContent className="p-4 flex flex-col items-center">
                                        <feature.icon className={`h-16 w-16 mb-2 ${feature.color}`} />
                                        <p className="text-sm font-medium">{feature.name}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Get to know Quiz-Live</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: 'What is a Quiz-Live?', duration: '1 min read' },
                                { title: 'Creating your first Quiz-Live', duration: '7 min watch' },
                                { title: 'How to present', duration: '1 min read' },
                                { title: 'How participants join', duration: '2 min read' },
                                { title: 'Using Mentimeter with other tools', duration: '4 min watch' }
                            ].map((tutorial, index) => (
                                <Card key={index} className="transition-all duration-300 hover:border-purple-700 hover:scale-105 cursor-pointer" onClick={() => setSelectedTutorial(tutorial)}>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium mb-1">{tutorial.title}</h3>
                                        <p className="text-sm text-gray-500">{tutorial.duration}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {selectedTutorial && (
                            <TutorialDialog
                                isOpen={!!selectedTutorial}
                                onClose={() => setSelectedTutorial(null)}
                                title={selectedTutorial.title}
                                duration={selectedTutorial.duration}
                            />
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}