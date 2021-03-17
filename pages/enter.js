import { NextSeo } from 'next-seo'

export default function Enter () {
  return (
    <>
      <NextSeo
        title="Enter"
        description="Enter the first annual Community Saxxy Awards here! This short film competition is by the TF2 community, for the TF2 community."
        openGraph={{
          type: 'website',
          url: 'https://saxxys.com/enter',
          title: 'Enter | Community Saxxy Awards',
          description: 'Enter the first annual Community Saxxy Awards here- a short film contest by the TF2 community, for the TF2 community.',
          images: [
            {
              url: 'https://saxxys.com/public/embedimage.png',
              width: 1200,
              height: 628,
              alt: 'Community Saxxy Awards'
            }
          ]
        }}
      />
      <div className="flex flex-col max-w-screen-md px-8 pt-20 items-start">
        <div className="text-white z-10">
          {'Example entry text '.repeat(400)}
        </div>
      </div>
    </>
  )
}
