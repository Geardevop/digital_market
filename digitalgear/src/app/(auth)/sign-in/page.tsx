"use client"
import { Icons } from "@/components/Icon"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import {toast} from 'sonner'
import { ZodError } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
const Page = () =>{
    const searchParams = useSearchParams()
    const isSeller = searchParams.get("as") === 'seller'
    const origin = searchParams.get("origin")

    const continueAsSeller = () =>{
        router.push("?as=seller")
    }
    const continueAsBuyer = () =>{
        router.replace("sign-in", undefined)
    }
    const { 
        register ,
        handleSubmit, 
        formState:{errors
    }} = useForm<TAuthCredentialsValidator>({
        resolver : zodResolver(AuthCredentialsValidator),

    })

    const router = useRouter()

    const {mutate :singIn, isLoading} = trpc.auth.signIn.useMutation({
        onSuccess: ()=>{
            toast.success("Sign in successful")
            router.refresh()
            if(origin){
                router.push(`${origin}`)
                return
            }
            if(isSeller){
                router.push('/sell')
                return
            }
            router.push("/")
        },
        onError: (err) =>{
            if(err.data?.code === 'UNAUTHORIZED'){
                toast.error("Invalid email or password")
            }
        }
    })
    const onSubmit = ({
        email,
        password,
    }:TAuthCredentialsValidator) =>{
        singIn({email, password})
    }

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-enter">
                        <Icons.logo className="h-20 w-20"></Icons.logo>
                        <h1 className="text-2xl font-bold">
                            Sing in to your {isSeller ? "seller": "account"}
                        </h1>
                        <Link 
                            href="/sing-up"
                            className={buttonVariants({
                                variant: 'link',
                                className : 'gap-1.5'
                            })}
                        >
                            Don&apos;t have an account
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    {...register("email")}
                                        className={cn({
                                        "focus-visible:ring-red-500":errors.email
                                    })}
                                    placeholder="you@email.com"/>
                                    {errors?.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )} 
                                </div>

                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                    {...register("password")}
                                    type="password"
                                        className={cn({
                                        "focus-visible:ring-red-500":errors.password
                                    })}
                                    placeholder="Password"/>
                                    {errors?.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )} 
                                </div>

                                <Button>Sign in</Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div 
                            aria-hidden
                            className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>
                        {isSeller ? (
                            <Button onClick={continueAsBuyer} variant='secondary' disabled={isLoading}>Continue as customer</Button>
                        ):(
                            <Button onClick={continueAsSeller} variant='secondary' disabled={isLoading}>Continue as seller</Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}
export default Page