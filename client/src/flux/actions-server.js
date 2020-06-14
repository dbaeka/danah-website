import Constants from "./constants";
import AppDispatcher from "./dispatcher";

class ActionsServer {
    receiveVideos(response) {
        AppDispatcher.handleServerAction({
            actionType: Constants.GET_VIDEOS_RESPONSE,
            response: response
        });
    }

    receivePosts(response) {
        AppDispatcher.handleServerAction({
            actionType: Constants.GET_POSTS_RESPONSE,
            response: response
        });
    }

    receiveBooks(response) {
        AppDispatcher.handleServerAction({
            actionType: Constants.GET_BOOKS_RESPONSE,
            response: response
        });
    }
}


export default new ActionsServer();