// import { Auth } from "../components/auth"
import { HomeButtons } from "../components/homebuttons"
import { NexxusTemplate } from "../components/nexxustemplate"
import TextReveal from "../components/ui/text-reveal"
import { Footer } from "./footer"


import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { MoveDown } from "lucide-react";

export const NexxusHome = () => {
    return <div>
        <div className="grid grid-cols-2 b-20">
            <NexxusTemplate />
            <div className=" items-center justify-center place-content-center bg-black">
                <HomeButtons />
            </div>

        </div>
        <div className="flex -mt-20 items-center justify-center">
            <div
                className={cn(
                    "group rounded-full border border-black/5 bg-neutral-50 text-base text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 animate-bounce",
                )}
            >
                <AnimatedShinyText className="inline-flex items-center col-span-2 justify-center px-4 py-1 transition ease-out hover:text-grey hover:duration-200 hover:dark:text-black ">
                    <span>✨ Keep scrolling down for more</span>
                    <MoveDown className="w-5 h-3 size-3 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
            </div>
        </div>
        <div className="z-10 -mt-55 flex min-h-64 items-center justify-center  bg-black dark:bg-white">
            <TextReveal text="Nexxus just got smarter: Dive into a world where advanced AI delivers sharper, more intuitive responses, revolutionizing every post you share." />
        </div>
        <Footer />
    </div>

}