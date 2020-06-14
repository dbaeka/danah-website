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
                const results = response.data;
                ActionsServer.receivePosts(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },
}