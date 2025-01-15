import type { Metadata } from "next"

import "./globals.css"
import LoadingOverlay from "./components/LoadingOverlay"
import { suisseMono, inter } from "./components/fonts"
import Header from "./components/Header"
import CustomCursor from "./components/CustomCursor"
import ChatOverlay from "./components/ChatOverlay"
import Chat from "./components/Chat"

export const metadata: Metadata = {
  title: "iain mckenzie",
  description: "portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
      </head>

      <body className={`${suisseMono.variable} ${inter.variable} font-mono antialiased bg-background h-screen flex flex-col overflow-hidden`}>
        <Header />
        
        <main className="flex-grow overflow-hidden">
          {children}
        </main>

        {/* <ChatOverlay /> */}
        <Chat className="w-[800px] max-w-[80vw] h-[600px] max-h-[70vh] absolute right-[5vw] top-[100px]" />

        <LoadingOverlay />
        {/* <CustomCursor /> */}
      </body>
    </html>
  )
}
