import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import  Link  from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'

const perks = [
  {
    name: "Instant delivery"
  }
]

export default function Home() {
  return (
    <>
    <MaxWidthWrapper >
      <div className='py-20 mx-auto text-center flex flex-col items-center mx-w-3xl'>
        <h1 className='text-4xl font-bold tracking-tigh text-grey-900 sm:text-6xl'>
          Your marketplace for hight-quality{' '}
          <span className='text-blue-600'>digital assets</span>
          .
        </h1>
        <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
          Welcome to Digitalgear. Every asset on our platform will be good
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <Link href='/products' className={buttonVariants()}> Browse Threading</Link>
          <Button variant='ghost'>Our quality promise &rarr;</Button>
        </div>
      </div>
      {/* Todo list product*/}
    </MaxWidthWrapper>
    <section className='border-t border-gray-200 bg-grey-500'>
      <MaxWidthWrapper className='py-20'>
        <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
          
        </div>
      </MaxWidthWrapper>
    </section>
    </>
  )
}
