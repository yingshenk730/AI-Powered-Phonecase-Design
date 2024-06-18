import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className=" bg-white h-14 relative">
      <div className=" border-t border-gray-200 " />
      <MaxWidthWrapper>
        <div className="h-full flex  justify-center items-center">
          <p className="text-sm text-muted-foreground">
            &copy;{new Date().getFullYear()}Ying.dev All rights reserved
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
