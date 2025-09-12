import React from 'react'
import { Globe } from "@/components/magicui/globe"
import { HyperText } from "@/components/magicui/hyper-text";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-light text-gray-900 -tracking-tighter" style={{ fontFamily: 'Gloock, serif' }}>
                About
              </h1>
              <div className="w-12 h-px bg-gray-900"></div>
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-xl">
                This web page is just to showcase my frontend and learn the implementation of (Websocket) socket.io.
              </p>
              
              <p className='text-xl'>
                Do not spam messages on this page.
              </p>
            </div>
          </div>

          {/* Globe Section */}
          <div className="mx-auto w-full max-w-lg">
            <div className="relative aspect-[1/1] w-full">
              <Globe className="absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About