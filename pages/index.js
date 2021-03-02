import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-md mx-auto bg-darkred-light px-4 py-4">
      <div className="self-center">
        <Image 
          src="/main.png"
          height={500}
          width={500}
        />
      </div>
    </div>
  )
}
