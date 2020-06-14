import Constants from "./constants";
import AppDispatcher from "./dispatcher";
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

}


export default new Actions();