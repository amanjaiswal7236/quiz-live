import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    stepsRef.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: "back.out(1.7)",
        },
      )
    })
  }, [])

  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            ref={(el) => {
              stepsRef.current[step - 1] = el;
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
              step <= currentStep ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && <div className={`h-2 w-full ${step < currentStep ? "bg-green-500" : "bg-gray-300"}`} />}
        </div>
      ))}
    </div>
  )
}

