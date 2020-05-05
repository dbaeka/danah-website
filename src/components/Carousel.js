import React from "react";

// reactstrap components
import {Button, Container} from "reactstrap";
import addedStyle from "../styles/css/style-react.module.css"
import CarouselEngine from "./CarouselEngine";

// core components

const Carousel = () => {
    return (
        <>
            <div className={addedStyle.pageHeader + " " + addedStyle.pageHeaderSmall}>
                <CarouselEngine/>
            </div>
        </>
    );
}

export default Carousel;
