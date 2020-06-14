import React from "react"
import SEO from "../components/seo"
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail';
import DefaultLayout from "../layout/default";
import {Container, Row} from "reactstrap"
import {graphql, StaticQuery} from "gatsby";
import Store from "../flux/store";
import {Actions} from "../flux";


class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: Store.getVideos(),
            selectedVideo: (Store.getVideos().length > 0) ? Store.getVideos()[0] : null,
            playing: false,
            selectedIndex: 0
        };

        this.onChange = this.onChange.bind(this);
    }


    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        Actions.getVideos();
    }

    onChange() {
        this.setState({
            ...this.state,
            videos: Store.getVideos(),
            selectedVideo: (Store.getVideos().length > 0) ? Store.getVideos()[0] : null,
        });
    }


    render() {
        const {videos} = this.state;

        return (
            <DefaultLayout>
                <SEO title="Videos"/>
                {/*<NormalHeader title="Videos"/>*/}
                <div className="subpage mb-4">
                    <div className="section">
                        <Container>
                            <h3 className="title">Videos</h3>
                            <Row>
                                <VideoDetail
                                    video={this.state.selectedVideo}
                                    isPlaying={play => this.setState({
                                        playing: play
                                    })}
                                    moveNext={() => {
                                        const currentIndex = this.state.selectedIndex;
                                        const num = this.state.videos.length;
                                        if ((currentIndex + 1) < num) {
                                            this.setState({
                                                selectedIndex: currentIndex + 1,
                                                playing: true,
                                                selectedVideo: this.state.videos[currentIndex + 1]
                                            })
                                        }
                                    }}
                                    playing={this.state.playing}
                                />
                                <VideoList
                                    onVideoSelect={userSelected => this.setState({
                                        selectedVideo: userSelected,
                                        playing: true
                                    })}
                                    setSelectedIndex={index => this.setState({
                                        selectedIndex: index,
                                    })}
                                    selectedIndex={this.state.selectedIndex}
                                    videos={this.state.videos}
                                />
                            </Row>
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
};
export default Videos
