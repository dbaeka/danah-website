import Constants from "./constants";
import AppDispatcher from "./dispatcher";

class ActionsServer {
    receiveVideos(response) {
        AppDispatcher.handleServerAction({
            actionType: Constants.GET_VIDEOS_RESPONSE,
            response: response
        });
    }
}


export default new ActionsServer();