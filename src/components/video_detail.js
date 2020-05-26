import React, {useState} from 'react';
import ReactPlayer from 'react-player'

const VideoDetail = (props) => {
    const isPlaying = props.isPlaying;
    let player = null;
    const playing = props.playing;
    const video = props.video;

    if (!video) {
        return <div className="col-md-8">Loading...</div>;
    }

    const url = video.videoURL;


    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9 player-wrapper">
                <ReactPlayer
                    ref={_player => player = _player}
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
                    onPause={() => {
                        isPlaying(false);
                    }}
                    // onReady={() => console.log('onReady')}
                    // onStart={() => console.log('onStart')}
                />
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;