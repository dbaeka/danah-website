import React, {useState} from 'react';
import {navigate} from "gatsby";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Row, Col,
    CarouselCaption, Container, Button
} from 'reactstrap';


const pic = <div id="image"
                 className="youtube-entry"
>
    <Container>
        <div className="py-5">
            <Row className="explore-entry text-center text-md-left">
                <Col xs="6" md="6" className="mb-5">
                    <div id="gallery" className="video-container">
                        <a
                            href="https://danahzohar.com/__wp/wp-content/uploads/2020/06/IMG_1545-rotated.jpg"
                        >
                            <img className="video"
                                 style={{
                                     height: "auto",
                                     width: "70%",
                                 }}
                                 src="https://danahzohar.com/__wp/wp-content/uploads/2020/06/IMG_1545-rotated.jpg">
                            </img>
                        </a>
                    </div>
                </Col>
                <Col xs="12" md="3" className="pt-5 pt-md-0 mt-auto mb-auto text-center">
                    <h4 className="font-weight-600 text-white mb-3">CHINA'S TOP INNOVATION MANAGEMENT THINKER OF 2018
                    </h4>
                    <h6 className="font-weight-600 text-white mb-3">WANT TO KNOW MORE ABOUT DANAH?</h6>
                    <Button className="font-weight-500" color="primary"
                            onClick={() => navigate("/about")}
                    >View More</Button>
                </Col>
            </Row>
        </div>
    </Container>
</div>;


const youtube = <div id="youtube"
                     className="youtube-entry"
>
    <Container>
        <div className="py-5">
            <Row className="explore-entry text-center text-md-left">
                <Col xs="6" md="6" className="mb-5">
                    <div className="video-container">
                        <iframe className="video" allowFullScreen
                                frameBorder="0"
                                title="Video Player"
                                src="https://cdn.jwplayer.com/players/4ybpITRW-YyEqzMHy.html"
                                id="fitvid0">
                        </iframe>
                    </div>
                </Col>
                <Col xs="12" md="6">
                    <h2 className="font-weight-600 text-white mb-3">WHAT IS SQ ASSESSMENT?</h2>
                    <p className="textblock text-white">
                        The work of Danah Zohar and Ian Marshall demonstrates the importance of spiritual
                        intelligence (SQ), which enables us to think “outside of the box” and to play with the
                        boundaries—to play an “infinite game”. SQ is a transformative intelligence that allows
                        us to break old paradigms and to invent new ones, to reframe problems and situations, to
                        dissolve old patterns and to be open to finding new ones.
                    </p>
                    {/*<Button className="font-weight-500" color="primary" onClick={() => navigate("/test")}>Click to Test*/}
                    {/*    Your SQ & Quantum Leadership Quotient*/}
                    {/*</Button>*/}
                </Col>
            </Row>
        </div>
    </Container>
</div>;

const videos = [
    {
        link: "https://cdn.jwplayer.com/players/UFV5fqGO-J84zf9GB.html",
        title: "Video Player",
        header: "The Guru and The CPO 1st Talk"
    },

];


const video = videos.map((item, idx) => (
    <div id=""
         className="youtube-entry"
         key={idx}
    >
        <Container>
            <div className="">
                <Row className="explore-entry text-center text-md-left">
                    <Col xs="7" md="9" className="">
                        <div className="video-container">
                            <iframe className="video" allowFullScreen
                                    frameBorder="0"
                                    title={item.title}
                                    src={item.link}
                            >
                            </iframe>
                        </div>
                    </Col>
                    <Col xs="12" md="3" className="pt-5 pt-md-0 mt-auto mb-auto text-center">
                        <h4 className="font-weight-600 text-white mb-3">{item.header}</h4>
                        <Button className="font-weight-500" color="primary"
                                onClick={() => navigate("/videos")}
                        >See More Videos</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
));


const items = [
    {
        id: 1,
        altText: 'Slide 1',
        caption: '',
        html: <Row className="m-auto pt-5">
            <div className="ml-auto mr-auto">
                <blockquote className="quote-1 text-uppercase text-left">
                    <p>a leading edge business thinker and leadership educator that uses science to transform the future
                        of business</p>
                    {/*<cite>Danah Zohar</cite>*/}
                </blockquote>
            </div>
        </Row>
    },
    {
        id: 2,
        altText: 'Slide 2',
        caption: '',
        html: video[0]
    },
    {
        id: 3,
        altText: 'Slide 3',
        caption: '',
        html: youtube
    },
    {
        id: 4,
        altText: 'Slide 4',
        caption: '',
        html: pic
    }
];

const CarouselEngine2 = (props) => {
    // let pageHeader = React.createRef();
    //
    // React.useEffect(() => {
    //     if (window.innerWidth > 991) {
    //         const updateScroll = () => {
    //             let windowScrollTop = window.pageYOffset / 3;
    //             pageHeader.current.style.transform =
    //                 "translate3d(0," + windowScrollTop + "px,0)";
    //         };
    //         window.addEventListener("scroll", updateScroll);
    //         return function cleanup() {
    //             window.removeEventListener("scroll", updateScroll);
    //         };
    //     }
    // });

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className={"custom-tag custom-tag-" + String(item.id)}
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                {item.html}
                <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption}/>
            </CarouselItem>
        );
    });

    return (
        <div
        >
            <style>
                {
                    `
                    .custom-tag-1 {
              max-width: 100%;
              filter: grayscale;
              background: url(${require("../images/danah_bg.jpeg")}) no-repeat 50% 20%;
            }
            `
                }
            </style>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                pause="hover"
                ride="carousel"
            >
                {/*<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>*/}
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
            </Carousel>
        </div>
    );
}

export default CarouselEngine2;