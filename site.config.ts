export const config = {
    siteMeta: {
        title: 'microcms-blog-with-next',
        description: 'microcms-blog-with-next'
    },
    siteRoot: process.env.NODE_ENV === 'production' ? process.env.SITEROOT : 'http://localhost:3000',
    apiKey: process.env.MICROCMS_APIKEY,
    serviceId: process.env.SERVICE_ID,
    headerLinks: [

    ]
};