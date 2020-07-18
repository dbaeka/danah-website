import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
        <script type="text/javascript" src="/js/weglot.js">
        </script>
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />

            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js"></script>


            <link href="https://fonts.googleapis.com/css?family=Oswald:400" rel="stylesheet" property="stylesheet"
                  type="text/css" media="all"></link>

            {/*<link rel="stylesheet" type="text/css"*/}
            {/*      href="/assets/fonts/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css"></link>*/}
            {/*<link rel="stylesheet" type="text/css"*/}
            {/*      href="/assets/fonts/font-awesome/css/font-awesome.css"></link>*/}

            {/*<link rel="stylesheet" type="text/css" href="/assets/revcss/settings.css"></link>*/}
            {/* REVOLUTION LAYERS STYLES */}


            {/*<link rel="stylesheet" type="text/css" href="/assets/revcss/layers.css"></link>*/}

            {/* REVOLUTION NAVIGATION STYLES */}
            {/*<link rel="stylesheet" type="text/css" href="/assets/revcss/navigation.css"></link>*/}
            <link rel="stylesheet" type="text/css"
                  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            {/* FONT AND STYLE FOR BASIC DOCUMENTS, NO NEED FOR FURTHER USAGE IN YOUR PROJECTS*/}
            <link href="https://fonts.googleapis.com/css?family=Roboto%3A700%2C300"
                  rel="stylesheet" property="stylesheet" type="text/css" media="all"></link>
            {/*<link rel="stylesheet" type="text/css" href="/assets/css/noneed.css"></link>*/}
            {/* REVOLUTION JS FILES */}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/jquery.themepunch.tools.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/jquery.themepunch.revolution.min.js"></script>*/}

            {/* PARTICLES ADD-ON FILES */}
            {/*<link rel='stylesheet'*/}
            {/*      href='/js/revolution-addons/particles/css/revolution.addon.particles.css?ver=1.0.3'*/}
            {/*      type='text/css' media='all'></link>*/}
            {/*<script type='text/javascript'*/}
            {/*        src='/js/revolution-addons/particles/js/revolution.addon.particles.min.js?ver=1.0.3'></script>*/}

            {/* SLIDER REVOLUTION 5.0 EXTENSIONS  (Load Extensions only on Local File Systems !  The following part can be removed on Server for On Demand Loading) */}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.actions.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.carousel.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.kenburn.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.layeranimation.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.migration.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.navigation.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.parallax.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.slideanims.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/extensions/revolution.extension.video.min.js"></script>*/}
            {/*<script type="text/javascript"*/}
            {/*        src="/js/revstartsize.js">*/}
            {/*</script>*/}

            {/*<!-- Magnific Popup core CSS file -->*/}
            {/*<link rel="stylesheet" href="/assets/css/magnific-popup.css"/>*/}

            {/*<!-- Magnific Popup core JS file -->*/}
            <script src="/js/jquery.magnific-popup.js"></script>
            {props.headComponents}
        </head>
        <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{__html: props.body}}
        />
        {props.postBodyComponents}
        </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
