import React from "react"
import SEO from "../components/seo"
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail';
import DefaultLayout from "../layout/default";
import {Container, Row} from "reactstrap"
import {graphql, StaticQuery} from "gatsby";


class Videos extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            selectedVideo: {
                "videoURL": "https://content.jwplatform.com/videos/Vtu1dSlp-i2EnZnVO.mp4",
                "snippet": {
                    "title": "The Guru & The CPO 1st Talk",
                    "description": "",
                    "thumbnail": "https://content.jwplatform.com/thumbs/Vtu1dSlp-640.jpg"
                }
            },
            playing: false,
            selectedIndex: 0
        };
    }

    render() {
        const query = graphql`
            {
                videos:   allVideosJson {
                    edges {
                        node {
                            videoURL
                            snippet {
                                description
                                thumbnail
                                title
                            }
                        }
                    }
                }
            }
        `;

        return (
            <DefaultLayout>
                <SEO title="Videos"/>
                {/*<NormalHeader title="Videos"/>*/}
                <div className="subpage mb-4">
                    <div className="section">
                        <Container>
                            <h3 className="title">Videos</h3>

                            <StaticQuery
                                query={query}
                                render={data => {
                                    return (
                                        <Row>
                                            <VideoDetail
                                                video={this.state.selectedVideo}
                                                isPlaying={play => this.setState({
                                                    playing: play
                                                })}
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
                                                videos={data.videos.edges}
                                            />
                                        </Row>
                                    )
                                }}
                            />
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
};
export default Videos
