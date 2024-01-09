'use client'
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload.types";

const AddToCartButton = ({product}:{product:Product})=>{
    const { addItem } = useCart()
    const [isSuccess, setIsSuccess] = useState<Boolean>(false)
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setIsSuccess(false)
        }, 2000)

        return ()=> clearTimeout(timeOut)
    },[isSuccess])
    return(
        <Button 
        onClick={()=>{
            addItem(product)
            setIsSuccess(true)
        }}
        size='lg'
        className="w-full">{isSuccess ? "Added!" : 'Add to Cart'}</Button>
    )
}
export default AddToCartButton;