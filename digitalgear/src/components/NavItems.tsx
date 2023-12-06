"use client"

import { PRODUCT_CATEGORY } from "@/config"
import { useState } from "react"
import NavItem from "./NavItem"

const NavItems =() =>{
    const [activeState, setActiveState] = useState<
    null | number
    >(null)

    const isAnyOpen = activeState !== null
    return(
        // map catogory 
        <div className="flex gap-4 h-full">
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