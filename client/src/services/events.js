import ActionsServer from '../flux/actions-server';
import axios from "axios";
import {devURL} from "./urls";

export default {

    getEvents() {
        const requestURL = devURL + "/events.php";
        axios({
            method: "GET",
            url: requestURL,
        }).then((response) => {
            if (response.data) {
                const results = response.data.data;
                ActionsServer.receiveEvents(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    addEvent(data) {
        const endpoint = '/add_event.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "add_event"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    editEvent(data) {
        const endpoint = '/edit_event.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "edit_event"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    deleteEvent(data) {
        const endpoint = '/delete_event.php';
        const requestURL = devURL + endpoint;
        const body = {id: data, action: "delete_event"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

}