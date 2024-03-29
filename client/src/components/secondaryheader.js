import React from "react";

// reactstrap components
import {Container} from "reactstrap";

// core components

function SecondaryHeader() {
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
                className="page-header clear-filter page-header-small"
                filter-color="blue"
            >
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../images/danah_profile.jpg") + ")"
                    }}
                    ref={pageHeader}
                >
                </div>
                <Container>
                    <div className="photo-container">
                        <img alt="..." src={require("../images/danah_profile.jpg")}/>
                    </div>
                    <h3 className="title">Danah Zohar</h3>
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

export default SecondaryHeader;
