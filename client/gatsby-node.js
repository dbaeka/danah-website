/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const {slash} = require(`gatsby-core-utils`)

exports.createPages = async ({actions, graphql, reporter}) => {
    const {createPage} = actions

    const bookTemplate = require.resolve(`./src/templates/bookTemplate.js`);
    // const postTemplate = path.resolve(`./src/templates/post.js`);

    const result = await graphql(`
    {
      allBooksJson {
        edges {
          node {
             slug
          }
        }
      }
    }
  `)

    //   // query content for WordPress posts
    //   const wpresult = await graphql(`
    //   query {
    //     allWordpressPost {
    //       edges {
    //         node {
    //           id
    //           slug
    //         }
    //       }
    //     }
    //   }
    // `)

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allBooksJson.edges.forEach(({node}) => {
        createPage({
            path: node.slug,
            component: bookTemplate,
            context: {
                // additional data can be passed via context
                slug: node.slug,
            },
        })
    })

    // wpresult.data.allWordpressPost.edges.forEach(edge => {
    //     createPage({
    //         // will be the url for the page
    //         path: edge.node.slug,
    //         // specify the component template of your choice
    //         component: slash(postTemplate),
    //         // In the ^template's GraphQL query, 'id' will be available
    //         // as a GraphQL variable to query for this posts's data.
    //         context: {
    //             id: edge.node.id,
    //         },
    //     })
    // })
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/admin/)) {
        page.matchPath = "/admin/*"
        // Update the page.
        createPage(page)
    }
}