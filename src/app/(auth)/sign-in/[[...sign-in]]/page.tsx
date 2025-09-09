import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-screen w-screen fixed bg-gray-500 z-50'>
      <div className='flex items-center justify-center min-h-screen'>
        <SignIn />
      </div>
    </div>
  )
}