import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "~/components/ui/button"

type MakeLiveDialogProps = {
  onConfirm: (isLive: boolean) => void
  onCancel: () => void
}

export default function MakeLiveDialog({ onConfirm, onCancel }: MakeLiveDialogProps) {
  const dialogRef = useRef(null)

  useEffect(() => {
    gsap.from(dialogRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          ref={dialogRef}
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Make Quiz Live?
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to make this quiz live? It will be immediately available for participants.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button onClick={() => onConfirm(true)} className="w-full sm:col-start-2">
              Make Live
            </Button>
            <Button onClick={onCancel} variant="secondary" className="mt-3 sm:mt-0 sm:col-start-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

