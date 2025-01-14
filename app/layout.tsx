import type { Metadata } from "next"
import "./globals.css"
import LoadingOverlay from "./components/LoadingOverlay"
import { suisseMono } from "./components/fonts"
import Header from "./components/Header"
import CustomCursor from "./components/CustomCursor"
import ChatOverlay from "./components/ChatOverlay"

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

      <body className={`${suisseMono.className} antialiased bg-background h-screen flex flex-col`}>
        <Header />
        
        <main className="flex-grow overflow-hidden">
          {children}
        </main>

        <ChatOverlay />

        <LoadingOverlay />
        {/* <CustomCursor /> */}
      </body>
    </html>
  )
}
