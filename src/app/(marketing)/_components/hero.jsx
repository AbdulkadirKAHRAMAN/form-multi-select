"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"
import Image from "next/image";

export default function Hero(){
    const { theme, setTheme } = useTheme();
    console.log(theme)
    return(
        <div className="bg-[url('/hero-bg.jpg')] relative bg-cover bg-bottom pt-20 text-background">
            <div className="flex items-center justify-between container mx-auto">
                <div className="flex flex-col gap-y-4 items-start justify-center">
                    <h1 className="text-[30px] font-medium">AkademiQ Staj ve Eğitim Programı</h1>
                    <h1 className="text-5xl font-medium">EKİM 2025'te YENİ DÖNEM BAŞLIYOR!</h1>
                    <div className="bg-primary text-primary-foreground text-2xl rounded-md px-2 py-1">
                        1000 Öğrenciye Karşılıksız Burs
                    </div>
                    <Button size="xl">Ön Kayıt</Button>
                </div>
                <div className="flex flex-col justify-end items-end">
                    <Image src="/kedi.png" alt="kedi" width={500} height={500} className="object-cover" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
				<svg xmlns="http://www.w3.org/2000/svg" fill="var(--secondary)" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" width="100%" height="50px" preserveAspectRatio="none">
                    <path display="none" d="M100,25.8V100H0V52.5c-4.9-6.8-9.5-13.8-15-19.7V101h125V20.9C106.3,22,103,23.7,100,25.8z"></path>
                    <path d="M100,100V0.8C77.8,21.4,71.3,70.5,38.6,70.5c-18.8,0-29.1-16.2-38.6-34V100H100z"></path>
                </svg>
            </div>
        </div>
    )
}