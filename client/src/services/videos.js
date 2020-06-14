import ActionsServer from '../flux/actions-server';
import axios from "axios";
import {devURL} from "./urls";

export default {

    getVideos() {
        const requestURL = devURL + "/videos.php";
        axios({
            method: "GET",
            url: requestURL,
        }).then((response) => {
            if (response.data) {
                const results = response.data.data;
                ActionsServer.receiveVideos(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    addVideo(data) {
        const endpoint = '/add_video.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "add_video"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    editVideo(data) {
        const endpoint = '/edit_video.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "edit_video"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    deleteVideo(data) {
        const endpoint = '/delete_video.php';
        const requestURL = devURL + endpoint;
        const body = {id: data, action: "delete_video"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

}