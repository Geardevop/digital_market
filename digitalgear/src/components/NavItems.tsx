"use client"

import { PRODUCT_CATEGORY } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const NavItems =() =>{
    const [activeState, setActiveState] = useState<
    null | number
    >(null)

    useEffect(()=>{
        const handler = (e: KeyboardEvent) =>{
            if(e.key === 'Escape'){
                setActiveState(null)
            }
        }
        document.addEventListener("keydown", handler)
        //clean up fc
        return ()=>{
            document.addEventListener("keydown", handler)
        }
    }, [])

    const isAnyOpen = activeState !== null
    const navRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(navRef, ()=>setActiveState(null))

    return(
        // map catogory 
        <div className="flex gap-4 h-full" ref={navRef}>
          {PRODUCT_CATEGORY.map((category, i)=>{
            const handleOpen = () =>{
                if(activeState === i){
                    setActiveState(null)
                }else{
                    setActiveState(i)
                }
            }
            const isOpen = i === activeState
            return(
                <NavItem 
                  category={category} 
                  handleOpen={handleOpen} 
                  isOpen={isOpen} 
                  key={category.value} 
                  isAnyOpen={isAnyOpen}/>
            )
          })}
        </div>
    )
}
export default NavItems