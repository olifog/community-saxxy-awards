import { NextSeo } from 'next-seo'

export default function Rules () {
  return (
    <>
      <NextSeo
        title="Rules"
        description="Rules for the first annual Community Saxxy Awards. This short film competition is run by the TF2 community, for the TF2 community- enter today!"
        openGraph={{
          type: 'website',
          url: 'https://saxxys.com/rules',
          title: 'Rules | Community Saxxy Awards',
          description: 'Rules for the first annual Community Saxxy Awards. This short film competition is run by the TF2 community, for the TF2 community- enter today!',
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
          {'Example rules text '.repeat(400)}
        </div>
      </div>
    </>
  )
}
