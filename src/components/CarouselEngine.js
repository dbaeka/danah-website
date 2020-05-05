import React from 'react';

class CarouselEngine extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/js/overexposure.js";
        script.async = true;
        script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }

    scriptLoaded() {

    }

    render() {
        return (
            <div id="rev_slider_348_1_wrapper" className="rev_slider_wrapper fullscreen-container"
                 data-alias="overexposure"
                 data-source="gallery" style={{background: "transparent", padding: "0px"}}>
                {/* START REVOLUTION SLIDER 5.4.3.3 fullscreen mode */}
                <div id="rev_slider_348_1" className="rev_slider fullscreenbanner" style={{display: "none"}}
                     data-version="5.4.3.3">
                    <ul>
                        {/* SLIDE 1*/}
                        <li data-index="rs-968" data-transition="brightnesscross" data-slotamount="default"
                            data-hideafterloop="0" data-hideslideonmobile="off" data-easein="default"
                            data-easeout="default"
                            data-masterspeed="default"
                            data-thumb={require("../lib/rev-slider/assets/images/exp_bg1-100x50.jpg")} data-rotate="0"
                            data-saveperformance="off" data-title="Slide" data-param1="" data-param2="" data-param3=""
                            data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9=""
                            data-param10="" data-description="">
                            {/* MAIN IMAGE */}
                            <img src={require("../lib/rev-slider/assets/images/dummy.png")} alt=""
                                 data-lazyload={require("../lib/rev-slider/assets/images/exp_bg1.jpg")}
                                 data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat"
                                 data-bgparallax="6" className="rev-slidebg" data-no-retina/>
                            {/* LAYERS */}
                            <div id="rrzm_968" className="rev_row_zone rev_row_zone_middle" style={{zIndex: "11"}}>

                                {/* LAYER NR. 1 */}
                                <div className="tp-caption   rs-parallaxlevel-4"
                                     id="slide-968-layer-7"
                                     data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                     data-y="['middle','middle','middle','middle']" data-voffset="['0','0','0','0']"
                                     data-width="none"
                                     data-height="none"
                                     data-whitespace="nowrap"

                                     data-type="row"
                                     data-columnbreak="2"
                                     data-responsive_offset="on"
                                     data-responsive="off"
                                     data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                     data-margintop="[0,0,0,0]"
                                     data-marginright="[0,0,0,0]"
                                     data-marginbottom="[0,0,0,0]"
                                     data-marginleft="[0,0,0,0]"
                                     data-textalign="['inherit','inherit','inherit','inherit']"
                                     data-paddingtop="[0,0,0,0]"
                                     data-paddingright="[50,50,30,30]"
                                     data-paddingbottom="[0,0,0,0]"
                                     data-paddingleft="[50,50,30,30]"

                                     style={{
                                         zIndex: "5",
                                         whiteSpace: "nowrap",
                                         fontSize: "20px",
                                         lineHeight: "22px",
                                         fontWeight: "400",
                                         color: "#ffffff",
                                         letterSpacing: "0px"
                                     }}>
                                    {/* LAYER NR. 2 */}
                                    <div className="tp-caption  "
                                         id="slide-968-layer-8"
                                         data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                         data-y="['top','top','top','top']" data-voffset="['100','100','100','100']"
                                         data-width="none"
                                         data-height="none"
                                         data-whitespace="nowrap"

                                         data-type="column"
                                         data-responsive_offset="on"
                                         data-responsive="off"
                                         data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                         data-columnwidth="50%"
                                         data-verticalalign="top"
                                         data-margintop="[0,0,0,0]"
                                         data-marginright="[0,0,0,0]"
                                         data-marginbottom="[0,0,0,0]"
                                         data-marginleft="[0,0,0,0]"
                                         data-textalign="['inherit','inherit','inherit','inherit']"
                                         data-paddingtop="[0,0,0,0]"
                                         data-paddingright="[20,20,0,0]"
                                         data-paddingbottom="[0,0,0,0]"
                                         data-paddingleft="[0,0,0,0]"

                                         style={{zIndex: "6", width: "100%"}}>
                                        {/* LAYER NR. 3 */}
                                        <div className="tp-caption   tp-resizeme"
                                             id="slide-968-layer-2"
                                             data-x="['left','left','left','left']" data-hoffset="['0','53','53','42']"
                                             data-y="['top','top','top','top']" data-voffset="['0','123','123','122']"
                                             data-letterspacing="['5','5','5','3']"
                                             data-width="none"
                                             data-height="none"
                                             data-whitespace="['normal','nowrap','nowrap','nowrap']"

                                             data-type="text"
                                             data-responsive_offset="on"

                                             data-frames='[{"delay":"+990","speed":2000,"frame":"0","from":"opacity:0;","color":"#e5452b","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","color":"transparent","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                             data-margintop="[0,0,0,0]"
                                             data-marginright="[0,0,0,0]"
                                             data-marginbottom="[24,28,21,21]"
                                             data-marginleft="[0,0,0,0]"
                                             data-textalign="['inherit','inherit','inherit','inherit']"
                                             data-paddingtop="[0,0,0,0]"
                                             data-paddingright="[0,0,0,0]"
                                             data-paddingbottom="[0,0,0,0]"
                                             data-paddingleft="[0,0,0,0]"

                                             style={{
                                                 zIndex: "7",
                                                 whiteSpace: "normal",
                                                 fontSize: "17px",
                                                 lineHeight: "24px",
                                                 fontWeight: "400",
                                                 color: "#000000",
                                                 letterSpacing: "5px",
                                                 display: "block",
                                                 fontFamily: "Oswald",
                                                 textTransform: "uppercase"
                                             }}>
                                            ALAN WATTS
                                        </div>

                                        {/* LAYER NR. 4 */}
                                        <div className="tp-caption   tp-resizeme"
                                             id="slide-968-layer-1"
                                             data-x="['left','left','left','left']" data-hoffset="['0','50','50','40']"
                                             data-y="['top','top','top','top']" data-voffset="['0','170','170','167']"
                                             data-fontsize="['60','50','40','40']"
                                             data-lineheight="['90','75','60','60']"
                                             data-letterspacing="['15','15','10','7']"
                                             data-width="['100%','100%','561','401']"
                                             data-height="none"
                                             data-whitespace="normal"
                                             data-type="text"
                                             data-responsive_offset="on"
                                             data-frames='[{"delay":"+290","split":"chars","splitdelay":0.05000000000000000277555756156289135105907917022705078125,"speed":2000,"split_direction":"forward","frame":"0","from":"opacity:0;","color":"#000000","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","color":"transparent","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                             data-margintop="[0,0,0,0]"
                                             data-marginright="[0,0,0,0]"
                                             data-marginbottom="[30,31,26,26]"
                                             data-marginleft="[0,0,0,0]"
                                             data-textalign="['inherit','inherit','inherit','inherit']"
                                             data-paddingtop="[0,0,0,0]"
                                             data-paddingright="[0,0,0,0]"
                                             data-paddingbottom="[0,0,0,0]"
                                             data-paddingleft="[0,0,0,0]"

                                             style={{
                                                 zIndex: "8",
                                                 minWidth: "100%px",
                                                 maxWidth: "100%px",
                                                 whiteSpace: "normal",
                                                 fontSize: "60px",
                                                 lineHeight: "90px",
                                                 fontWeight: "400",
                                                 color: "#e5452b",
                                                 letterSpacing: "15px",
                                                 display: "block",
                                                 fontFamily: "Oswald",
                                                 textTransform: "uppercase"
                                             }}>
                                            I OWE MY SOLITUDE TO OTHER PEOPLE.
                                        </div>

                                        {/* LAYER NR. 5 */}
                                        <div className="tp-caption tp-shape tp-shapewrapper  tp-resizeme"
                                             id="slide-968-layer-3"
                                             data-x="['left','left','left','left']" data-hoffset="['0','53','53','42']"
                                             data-y="['top','top','top','top']" data-voffset="['0','440','498','373']"
                                             data-width="50"
                                             data-height="1"
                                             data-whitespace="['normal','nowrap','nowrap','nowrap']"

                                             data-type="shape"
                                             data-responsive_offset="on"

                                             data-frames='[{"delay":"+1490","speed":2000,"frame":"0","from":"sX:0;opacity:0;","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                             data-margintop="[0,0,0,0]"
                                             data-marginright="[0,0,0,0]"
                                             data-marginbottom="[0,0,0,0]"
                                             data-marginleft="[0,0,0,0]"
                                             data-textalign="['inherit','inherit','inherit','inherit']"
                                             data-paddingtop="[0,0,0,0]"
                                             data-paddingright="[0,0,0,0]"
                                             data-paddingbottom="[0,0,0,0]"
                                             data-paddingleft="[0,0,0,0]"

                                             style={{zIndex: "9", display: "block", backgroundColor: "rgb(0,0,0)"}}>

                                        </div>
                                    </div>

                                    {/* LAYER NR. 6 */}
                                    <div className="tp-caption"
                                         id="slide-968-layer-9"
                                         data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                         data-y="['top','top','top','top']" data-voffset="['100','100','100','100']"
                                         data-width="none"
                                         data-height="none"
                                         data-whitespace="nowrap"
                                         data-type="column"
                                         data-responsive_offset="on"
                                         data-responsive="off"
                                         data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                         data-columnwidth="50%"
                                         data-verticalalign="top"
                                         data-margintop="[0,0,0,0]"
                                         data-marginright="[0,0,0,0]"
                                         data-marginbottom="[0,0,0,0]"
                                         data-marginleft="[0,0,0,0]"
                                         data-textalign="['inherit','inherit','inherit','inherit']"
                                         data-paddingtop="[0,0,0,0]"
                                         data-paddingright="[0,0,0,0]"
                                         data-paddingbottom="[0,0,0,0]"
                                         data-paddingleft="[0,0,0,0]"

                                         style={{zIndex: "10", width: "100%"}}>

                                    </div>
                                </div>

                                {/* LAYER NR. 7 */}
                                <div className="tp-caption rs-parallaxlevel-5"
                                     id="slide-968-layer-10"
                                     data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                     data-y="['middle','middle','middle','middle']" data-voffset="['0','0','0','0']"
                                     data-width="none"
                                     data-height="none"
                                     data-whitespace="nowrap"

                                     data-type="row"
                                     data-columnbreak="2"
                                     data-responsive_offset="on"
                                     data-responsive="off"
                                     data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                     data-margintop="[0,0,0,0]"
                                     data-marginright="[0,0,0,0]"
                                     data-marginbottom="[0,0,0,0]"
                                     data-marginleft="[0,0,0,0]"
                                     data-textalign="['inherit','inherit','inherit','inherit']"
                                     data-paddingtop="[0,0,0,0]"
                                     data-paddingright="[50,50,30,30]"
                                     data-paddingbottom="[0,0,0,0]"
                                     data-paddingleft="[50,50,30,30]"

                                     style={{
                                         zIndex: "11",
                                         whiteSpace: "nowrap",
                                         fontSize: "20px",
                                         lineHeight: "22px",
                                         fontWeight: "400",
                                         color: "#ffffff",
                                         letterSpacing: "0px"
                                     }}>
                                    {/* LAYER NR. 8 */}
                                    <div className="tp-caption  "
                                         id="slide-968-layer-11"
                                         data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                         data-y="['top','top','top','top']" data-voffset="['100','100','100','100']"
                                         data-width="none"
                                         data-height="none"
                                         data-whitespace="nowrap"

                                         data-type="column"
                                         data-responsive_offset="on"
                                         data-responsive="off"
                                         data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                         data-columnwidth="50%"
                                         data-verticalalign="top"
                                         data-margintop="[0,0,0,0]"
                                         data-marginright="[0,0,0,0]"
                                         data-marginbottom="[0,0,0,0]"
                                         data-marginleft="[0,0,0,0]"
                                         data-textalign="['inherit','inherit','inherit','inherit']"
                                         data-paddingtop="[0,0,0,0]"
                                         data-paddingright="[0,0,0,0]"
                                         data-paddingbottom="[0,0,0,0]"
                                         data-paddingleft="[0,0,0,0]"

                                         style={{zIndex: "12", width: "100%"}}>
                                    </div>

                                    {/* LAYER NR. 9 */}
                                    <div className="tp-caption  "
                                         id="slide-968-layer-12"
                                         data-x="['left','left','left','left']" data-hoffset="['100','100','100','100']"
                                         data-y="['top','top','top','top']" data-voffset="['100','100','100','100']"
                                         data-width="none"
                                         data-height="none"
                                         data-whitespace="nowrap"

                                         data-type="column"
                                         data-responsive_offset="on"
                                         data-responsive="off"
                                         data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                         data-columnwidth="50%"
                                         data-verticalalign="top"
                                         data-margintop="[0,0,0,0]"
                                         data-marginright="[0,0,0,0]"
                                         data-marginbottom="[0,0,0,0]"
                                         data-marginleft="[0,0,0,0]"
                                         data-textalign="['inherit','inherit','inherit','inherit']"
                                         data-paddingtop="[0,0,0,0]"
                                         data-paddingright="[0,0,0,0]"
                                         data-paddingbottom="[0,0,0,0]"
                                         data-paddingleft="[20,20,0,0]"

                                         style={{zIndex: "13", width: "100%"}}>
                                        {/* LAYER NR. 10 */}
                                        <div className="tp-caption   tp-resizeme"
                                             id="slide-968-layer-4"
                                             data-x="['left','left','left','left']"
                                             data-hoffset="['0','540','814','633']"
                                             data-y="['top','top','top','top']" data-voffset="['0','440','410','298']"
                                             data-fontsize="['15','14','14','14']"
                                             data-width="100%"
                                             data-height="none"
                                             data-whitespace="normal"

                                             data-type="text"
                                             data-responsive_offset="on"

                                             data-frames='[{"delay":"+1990","speed":2000,"frame":"0","from":"opacity:0;","color":"#e5452b","to":"o:1;","ease":"Power4.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","color":"transparent","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                                             data-margintop="[0,0,40,40]"
                                             data-marginright="[0,0,0,0]"
                                             data-marginbottom="[40,40,40,40]"
                                             data-marginleft="[0,0,0,0]"
                                             data-textalign="['inherit','inherit','inherit','inherit']"
                                             data-paddingtop="[0,0,0,0]"
                                             data-paddingright="[0,0,0,0]"
                                             data-paddingbottom="[0,0,0,0]"
                                             data-paddingleft="[0,0,0,0]"

                                             style={{
                                                 zIndex: "14",
                                                 minWidth: "100%px",
                                                 maxWidth: "100%px",
                                                 whiteSpace: "normal",
                                                 fontSize: "15px",
                                                 lineHeight: "30px",
                                                 fontWeight: "400",
                                                 color: "#000000",
                                                 letterSpacing: "3px",
                                                 display: "block", fontFamily: "Oswald", textTransform: "uppercase"
                                             }}>
                                            Some believe all that parents, tutors, and kindred believe.
                                            They take their principles by inheritance, and defend them as they would
                                            their
                                            estates, because they are born heirs to them.
                                        </div>

                                        {/* LAYER NR. 11 */}
                                        <a className="tp-caption rev-btn  tp-resizeme"
                                           href="https://revolution.themepunch.com/direct-customer-benefits/"
                                           target="_blank" id="slide-968-layer-5"
                                           data-x="['left','left','left','left']" data-hoffset="['0','540','53','42']"
                                           data-y="['top','top','bottom','bottom']" data-voffset="['0','600','53','42']"
                                           data-width="none"
                                           data-height="none"
                                           data-whitespace="['normal','nowrap','nowrap','nowrap']"

                                           data-type="button"
                                           data-actions=''
                                           data-responsive_offset="on"

                                           data-frames='[{"delay":"+1990","speed":2000,"frame":"0","from":"opacity:0;fbr:0%;","to":"o:1;fbr:100;","ease":"Power4.easeInOut"},{"delay":"wait","speed":2000,"frame":"999","to":"opacity:0;fbr:0%;","ease":"Power4.easeInOut"},{"frame":"hover","speed":"500","ease":"Power3.easeInOut","to":"o:1;rX:0;rY:0;rZ:0;z:0;fbr:90%;","style":"c:rgba(255,255,255,1);bs:solid;bw:0 0 0 0;"}]'
                                           data-margintop="[0,0,0,0]"
                                           data-marginright="[0,0,0,0]"
                                           data-marginbottom="[0,0,0,0]"
                                           data-marginleft="[0,0,0,0]"
                                           data-textalign="['inherit','inherit','inherit','inherit']"
                                           data-paddingtop="[0,0,0,0]"
                                           data-paddingright="[50,50,50,50]"
                                           data-paddingbottom="[0,0,0,0]"
                                           data-paddingleft="[50,50,50,50]"

                                           style={{
                                               zIndex: "15",
                                               whiteSpace: "normal",
                                               fontSize: "15px",
                                               lineHeight: "60px",
                                               fontWeight: "400",
                                               color: "rgba(255,255,255,1)",
                                               letterSpacing: "5px",
                                               display: "inline-block",
                                               fontFamily: "Oswald",
                                               textTransform: "uppercase",
                                               backgroundColor: "rgb(229,69,43)",
                                               borderColor: "rgba(0,0,0,1)",
                                               outline: "none",
                                               boxShadow: "none",
                                               boxSizing: "border-box",
                                               MozBoxSizing: "border-box",
                                               WebkitBoxSizing: "border-box",
                                               cursor: "pointer",
                                               textDecoration: "none"
                                           }}>
                                            GET THIS SLIDER </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="tp-bannertimer tp-bottom" style={{height: "10px", background: "rgb(229,69,43)"}}>
                    </div>
                </div>
                {/* END REVOLUTION SLIDER */}
            </div>
        )
    }
}

export default CarouselEngine;