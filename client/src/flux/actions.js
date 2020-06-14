import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import WPAPI from "../services/wordpress";
import VideosAPI from "../services/videos";

class Actions {
    addVideo(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_VIDEO,
            data: data
        });
    }

    editVideo(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.EDIT_VIDEO,
            data: data
        });
    }

    deleteVideo(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.DELETE_VIDEO,
            data: data
        });
    }

    toggleMenu() {
        AppDispatcher.handleViewAction({
            actionType: Constants.TOGGLE_SIDEBAR,
        });
    }

    getVideos() {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_VIDEOS,
        });
        VideosAPI.getVideos();
    }

    getPosts() {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_POSTS,
        });
        WPAPI.getPosts();
    }

    setPost(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.SET_POST,
            data: data
        });
    }

}


export default new Actions();