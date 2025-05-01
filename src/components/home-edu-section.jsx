"use client"
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring } from "motion/react"
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function  HomeEduSection({
    categoryIndex,
    categoryTitle,
    educations,
    reverse = false
}){
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // element görünüm aralığı
      });

      const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

    useEffect(() => {
        console.log(scrollYProgress);
        
    }, [scrollYProgress])
    return(
        <div ref={ref} className={cn("flex items-center justify-between p-10", reverse ? "flex-row-reverse" : "flex-row", 
            categoryIndex %2 === 0 ? "bg-secondary" : "",
        )}>
            <div className="w-full">
                <EducationCategoryTitle title={categoryTitle} />
                <ul className={cn("grid gap-4", educations?.length > 4 ? "grid-cols-2" : "grid-cols-1")}>
                {educations?.map((item) => (
                    <li key={item.id} className="text-muted-foreground break-words">
                        {item.title}
                    </li>
                ))}
                </ul>
            </div>
            <motion.div
            style={{
                y: springY
            }}
            transition={{
                duration: 0.4,
            }} className="w-full">
                <Image src={"https://nebosan.com.tr/wp-content/uploads/2023/07/placeholder-26.png"} alt="kedi" width={600} height={400} className="object-cover" />
            </motion.div>
        </div>
    )
}

function EducationCategoryTitle({ title }) {
    const coloredText = title.split(" ").map((word, index) => {
      const isColoredText = word.includes("*");
      return (
        <span
          key={index}
          className={`${
            isColoredText ? "text-primary" : "text-inherit"
          }`}
        >
          {isColoredText ? word.replace("*", "") : word}{" "}
        </span>
      );
    });
    return <h1 className="text-4xl font-bold">{coloredText}</h1>;
  }
  