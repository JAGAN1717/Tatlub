// // import { NextSeo, NextSeoProps } from "next-seo";
// import { NextSeo, NextSeoProps } from "next-seo/lib";
// import Head from 'next/head'
// interface SeoProps extends NextSeoProps {
//   url?: string;
//   images?: any[] | null;
//   // title?: any;
//   // description?:any;
// }

// const Seo = ({ title, description, images, url, ...props }: SeoProps) => {
//     return (
//       <NextSeo
//       title={title}
//       openGraph={{
//         ...(Boolean(url) && {
//           url: `${process.env.NEXT_PUBLIC_SITE_URL}/${url}`,
//         }),
//         title,
//         description,
//         ...(Boolean(images) && {
//           images: images?.map((item) => ({
//             url: item?.image?.original,
//             alt: item?.title,
//           })),
//         }),
//       }}
//       {...props}
//     />
//     );
//   };
  
//   export default Seo;


import React from 'react'
import Head from 'next/head'

const Seo = ({ title, description, keywords, ogImage, ogType, pathName }) => {
    // const { global } = useSelector((state) => state.globalSettings)
    // const origin =
    //     typeof window !== 'undefined' && window.location.origin
    //         ? window.location.origin
    //         : ''
    // const business_name = global?.business_name
    return (
        <Head>
            <title className='text-capitalize' >{title ?? 'Tatlub.com'}</title>
            {/*<meta name="description" content={description} />*/}

            {/*<!-- Google / Search Engine Tags -->*/}
            <meta itemProp="name" className='text-capitalize' content={title ?? 'Tatlub.com'} />
            <meta itemProp="description" content={description ?? ''} />
            <meta itemProp="image" content={ogImage} />
            <meta property="og:type" content="website" />

            {/*<!-- Facebook Meta Tags -->*/}
            <meta property="og:title" className='text-capitalize' content={title ?? 'Tatlub.com'} />
            <meta property="og:description" content={description ?? ''} />
            <meta property="og:image" content={ogImage ?? ""} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1080" />
            <meta property="og:image:height" content="608" />
            <meta property="og:url" content={pathName ?? ""} />
            <meta property="og:type" content="website" />

            {/*<!-- Twitter Meta Tags -->*/}
            <meta name="twitter:title" className='text-capitalize' content={title ?? 'Tatlub.com'} />
            <meta name="twitter:description" content={description ?? ""} />
            <meta name="twitter:image" content={ogImage ?? ""} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Seo
