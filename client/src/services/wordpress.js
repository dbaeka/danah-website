import ActionsServer from '../flux/actions-server';
import axios from "axios";
import {wpURL} from "./urls";

export default {

    getPosts() {
        const requestURL = wpURL + "/wp-json/wp/v2/posts";
        axios({
            method: "GET",
            url: requestURL,
        }).then((response) => {
            if (response.data) {
                const results = {
                    data: response.data,
                    total_pages: response.headers["x-wp-totalpages"],
                    total_items: response.headers["x-wp-total"],
                }
                ActionsServer.receivePosts(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    getImages(index) {
        const requestURL = wpURL + "/wp-json/wp/v2/media?media_type=image&page=" + index;
        axios({
            method: "GET",
            url: requestURL,
        }).then((response) => {
            if (response.data) {
                const results = {
                    data: response.data,
                    total_pages: response.headers["x-wp-totalpages"],
                    total_items: response.headers["x-wp-total"],
                }
                ActionsServer.receiveImages(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },
}