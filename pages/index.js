import Image from 'next/image'

export default function Home () {
  return (
    <div className="flex flex-col max-w-screen-md px-8 pt-20 pb-8 items-start">
      <div className="self-center pointer-events-none">
        <Image
          src="/main.png"
          height={500}
          width={500}
        />
      </div>
      <div className="text-white z-10">
        {'Example text '.repeat(400)}
      </div>
    </div>
  )
}
