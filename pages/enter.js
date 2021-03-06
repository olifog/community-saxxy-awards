export default function Enter () {
  return (
    <div className="flex flex-col items-center">
      <div className="fixed h-screen w-full max-w-screen-md mx-auto bg-darkred-light z-0"></div>
      <div className="flex flex-col max-w-screen-md px-8 pt-20 pb-8 items-start">
        <div className="text-white z-10">
          {'Example entry text '.repeat(400)}
        </div>
      </div>
    </div>
  )
}
