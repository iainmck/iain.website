import { Inter } from "next/font/google"
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ["latin"] })

export const suisseMono = localFont({ 
  src: [
    {
      path: '../../public/fonts/SuisseIntlMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SuisseIntlMono-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
})
