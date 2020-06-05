import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((node, idx) => {
        return (
            <VideoListItem
                onUserSelected={props.onVideoSelect}
                setSelectedIndex={props.setSelectedIndex}
                selectedIndex={props.selectedIndex}
                key={idx}
                id={idx}
                video={node}/>
        );
    });

    return (
        <ul className="col-md-4 list-group mt-4 mt-md-0">
            {videoItems}
        </ul>
    );
};

export default VideoList;