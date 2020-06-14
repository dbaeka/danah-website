module.exports = {
    siteMetadata: {
        title: `Danah Zohar`,
        description: ``,
        author: `@dbaeka`,
    },
    pathPrefix: "",
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                // name: `books`,
                path: `${__dirname}/src/data/`,
                // ignore: [`**/\.*`], // ignore files starting with a dot
                plugins: [
                    `gatsby-transformer-json`
                ]
            },
        },
        // {
        //     resolve: `gatsby-source-wordpress`,
        //     options: {
        //         // your WordPress source
        //         baseUrl: `danahzohar.com/__wp/wp-json/wp/v2`,
        //         protocol: `https`,
        //         // is it hosted on wordpress.com, or self-hosted?
        //         hostingWPCOM: false,
        //         // does your site use the Advanced Custom Fields Plugin?
        //         useACF: false
        //     }
        // },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
