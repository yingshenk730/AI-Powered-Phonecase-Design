'use client'

const Flashing = () => {
  return (
    <span className="ml-1.5 flex items-center gap-1">
      <span className="animate-flashing w-1 h-1 bg-white rounded-full inline-block" />
      <span className="animate-flashing delay-100 w-1 h-1 bg-white rounded-full inline-block" />
      <span className="animate-flashing delay-200 w-1 h-1 bg-white rounded-full inline-block" />
    </span>
  )
}

export default Flashing
