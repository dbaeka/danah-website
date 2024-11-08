# DANAH WEBSITE

This is the repository for the DANAH website. The website is built using Gatsby.

Please use Node Version: 12.xx

## Getting Started
1. Clone the repository
2. Run `npm install -g gatsby-cli@2`
3. Run `npm install -g yarn`
4. cd into `client` directory
5. Run `sudo rm -rf node_modules`
6. Run `rm yarn.lock`
7. Run `yarn install --ignore-engines`
8. Run `npm run compile-sass`
9. Run `npm run compile-sass2`
10. Run `npm run minify-sass`
11. Run `npm run develop` for development or `npm run build` for production. Build files for prod are located in `client/public` folder

## Folder Structure
- `client/src` - Contains all the source code for the website
- `client/src/components` - Contains all the components used in the website
- `client/src/pages` - Contains all the pages for the website. This is where most changes will occur
- `client/public` - Contains the build files for the website
- `_wp` - Contains the wordpress related functions and admin control for the website'
