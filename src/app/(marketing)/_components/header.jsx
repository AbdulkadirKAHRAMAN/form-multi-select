"use client"
import ActionButton from "@/components/action-btn";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Header(){

    useEffect(() => {
        const header = document.getElementById('header');

        // Scroll olayını dinle
        window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.padding = '4px 0px';
        } else {
            header.style.removeProperty('padding');
        }
        });
        return () => document.removeEventListener('scroll', () => {});
    }, [])
    return(
        <header id="header"  className="fixed top-0 z-50 transition-all ease-in-out duration-200 w-full py-5 bg-foreground text-background">
            <div className="flex container mx-auto items-center justify-between">
                <div id="social-media">
                    <ul className="inline-flex items-center gap-2">
                        <li>Insta</li>
                        <li>LinkIn</li>
                    </ul>
                </div>
                <div id="logo">
                    <Image src="/logo-light.png" alt="logo" width={200} height={100} className="object-cover" />
                </div>
                <div id="action-btn">
                    <ActionButton />
                    
                </div>
            </div>
        </header>
    )
}