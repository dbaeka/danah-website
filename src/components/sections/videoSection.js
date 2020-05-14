import React, {useState} from "react";
import addedStyle from "../../styles/css/style-react.module.css"
import ReactPlayer from 'react-player'


// reactstrap components
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Container,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    NavItem,
    NavLink
} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

// core components

const VideoSection = () => {
    const [playing, setPlaying] = useState(true);
    const [url, setUrl] = useState("");

    return (
        <div id="videos"
             className="videos-entry"
             style={{backgroundColor: "#fff"}}
        >
            <Container>
                <div className="py-5">
                    <h3 className="text-center font-weight-600 mb-5">VIDEOS</h3>
                    <Row className="explore-entry">
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    {/*<a href="#test-modal" className="popup-modal"*/}
                                    {/*   onClick={() =>*/}
                                    {/*       setUrl("https://zeus.omsuk.com:5001/fsdownload/webapi/file_download.cgi/L8_Scale%20of%20Motivations.mp4?dlink=%222f44616e616820566964656f732f4c385f5363616c65206f66204d6f7469766174696f6e732e6d7034%22&noCache=1589423417678&_sharing_id=%22Yss95rLR6%22&api=SYNO.FolderSharing.Download&version=2&method=download&mode=download&stdhtml=false")*/}
                                    {/*   }*/}
                                    {/*>*/}
                                    <a href="https://www.youtube.com/watch?v=FaO2aPBJgZA" className="popup-youtube">
                                        <img
                                            className="vid-thumb"
                                            src={require("../../images/video2.png")}
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                {/*<a*/}
                                                {/*    className="text-white font-weight-500 popup-modal"*/}
                                                {/*    onClick={() =>*/}
                                                {/*        setUrl("https://zeus.omsuk.com:5001/fsdownload/webapi/file_download.cgi/L8_Scale%20of%20Motivations.mp4?dlink=%222f44616e616820566964656f732f4c385f5363616c65206f66204d6f7469766174696f6e732e6d7034%22&noCache=1589423417678&_sharing_id=%22Yss95rLR6%22&api=SYNO.FolderSharing.Download&version=2&method=download&mode=download&stdhtml=false")*/}
                                                {/*    }*/}
                                                {/*    href="#test-modal">*/}
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="https://www.youtube.com/watch?v=FaO2aPBJgZA">
                                                    Scales of
                                                    Motivation
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    <a href="https://www.youtube.com/watch?v=FaO2aPBJgZA" className="popup-youtube">
                                        <img
                                            className="vid-thumb"
                                            src={require("../../images/video1.png")}
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="https://www.youtube.com/watch?v=FaO2aPBJgZA">Danah's
                                                    Corporate
                                                    Highlights
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    {/*<a href="#test-modal" className="popup-modal"*/}
                                    {/*   onClick={() =>*/}
                                    {/*       setUrl("https://zeus.omsuk.com:5001/fsdownload/webapi/file_download.cgi/L2_PQT_4_Thriving%20on%20Chaos.mp4?dlink=%222f44616e616820566964656f732f4c325f5051545f345f5468726976696e67206f6e204368616f732e6d7034%22&noCache=1589424570081&_sharing_id=%22Yss95rLR6%22&api=SYNO.FolderSharing.Download&version=2&method=download&mode=download&stdhtml=false")*/}
                                    {/*   }*/}
                                    {/*>*/}
                                    <a href="https://www.youtube.com/watch?v=FaO2aPBJgZA" className="popup-youtube">
                                        <img
                                            className="vid-thumb"
                                            src={require("../../images/video3.png")}
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                {/*<a*/}
                                                {/*    className="text-white font-weight-500 popup-modal"*/}
                                                {/*    onClick={() =>*/}
                                                {/*        setUrl("https://zeus.omsuk.com:5001/fsdownload/webapi/file_download.cgi/L2_PQT_4_Thriving%20on%20Chaos.mp4?dlink=%222f44616e616820566964656f732f4c325f5051545f345f5468726976696e67206f6e204368616f732e6d7034%22&noCache=1589424570081&_sharing_id=%22Yss95rLR6%22&api=SYNO.FolderSharing.Download&version=2&method=download&mode=download&stdhtml=false")*/}
                                                {/*    }*/}
                                                {/*    href="#test-modal">*/}
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="https://www.youtube.com/watch?v=FaO2aPBJgZA">
                                                    Thriving on
                                                    Chaos
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/*<Button color="danger" onClick={toggle}>adaada</Button>*/}
                        <a className="popup-modal" href="#test-modal"
                           onClick={() => setPlaying(true)}
                        >
                        </a>

                        <div id="test-modal" className="white-popup-block mfp-hide">
                            <p>
                                <a className="popup-modal-dismiss font-weight-600 pr-3 pb-2 float-right"
                                   href="#"
                                   onClick={() => {
                                       setPlaying(false);
                                       setUrl("")
                                   }}
                                >x
                                </a>
                            </p>
                            <div className='player-wrapper'>
                                <ReactPlayer
                                    // ref={this.ref}
                                    className='react-player'
                                    width='100%'
                                    height='100%'
                                    url={url}
                                    // pip={pip}
                                    playing={playing}
                                    controls={true}
                                    // light={light}
                                    loop={false}
                                    // volume={volume}
                                    // muted={muted}
                                    onReady={() => console.log('onReady')}
                                    onStart={() => console.log('onStart')}
                                />
                            </div>
                        </div>

                        <Col className="text-center" xs="12">
                            <a href="/videos" className="link-purple">View more</a>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
};

export default VideoSection;
