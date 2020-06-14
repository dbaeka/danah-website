import React from 'react';

const VideoListItem = (props) => {
    const video = props.video;
    const onUserSelected = props.onUserSelected;
    const imageUrl = video.thumb_url;
    const setSelectedIndex = props.setSelectedIndex;
    const active = props.id === props.selectedIndex;
    return (
        <li onClick={() => {
            setSelectedIndex(props.id);
            onUserSelected(video)
        }
        }
            className={"list-group-item " + ((active) ? "active" : "")}
        >
            <div className="video-list media">
                <div className="media-first m-auto">
                    <span className="media-scope">▶</span>
                </div>
                <div className="media-left ml-2 mr-2">
                    <img alt="" className="media-object" src={imageUrl}/>
                </div>
                <div className="media-body m-auto">
                    <div className="media-heading font-weight-bold">{video.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;