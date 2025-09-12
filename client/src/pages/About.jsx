import React from 'react'
import { Globe } from "@/components/magicui/globe"
import { HyperText } from "@/components/magicui/hyper-text";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 -tracking-tighter text-center lg:text-left" style={{ fontFamily: 'Gloock, serif' }}>
                About
              </h1>
              <div className="w-12 h-px bg-gray-900 mx-auto lg:mx-0"></div>
            </div>
            
            <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed text-center lg:text-left">
              <p className="text-lg md:text-xl">
                This web page is just to showcase my frontend and learn the implementation of (Websocket) socket.io.
              </p>
              
              <p className='text-lg md:text-xl'>
                Do not spam messages on this page.
              </p>
            </div>
          </div>

          {/* Globe Section */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative aspect-[1/1] w-full max-w-sm md:max-w-lg">
              <Globe className="absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About