import React from "react";

// reactstrap components
import {Container} from "reactstrap";
import PropTypes from "prop-types";
import Footer from "./footer";

// core components

function NormalHeader({image, title, position}) {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });
    return (
        <>
            <div
                className="page-header-2 clear-filter page-header-small"
                filter-color="blue"
            >
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundPosition: position
                    }}
                    ref={pageHeader}
                >
                </div>
                <Container>
                    <h2 className="font-weight-600 title">{title}</h2>
                    {/*<p className="category">Photographer</p>*/}
                    {/*<div className="content">*/}
                    {/*    <div className="social-description">*/}
                    {/*        <h2>26</h2>*/}
                    {/*        <p>Comments</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="social-description">*/}
                    {/*        <h2>26</h2>*/}
                    {/*        <p>Comments</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="social-description">*/}
                    {/*        <h2>48</h2>*/}
                    {/*        <p>Bookmarks</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Container>
            </div>
        </>
    );
}

NormalHeader.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string
};

NormalHeader.defaultProps = {
    title: ``,
    image: require("../images/danah_profile.jpg"),
    position: "50% 26%"
};

export default NormalHeader;
