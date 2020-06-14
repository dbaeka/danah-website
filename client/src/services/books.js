import ActionsServer from '../flux/actions-server';
import axios from "axios";
import {devURL} from "./urls";

export default {

    getBooks() {
        const requestURL = devURL + "/books.php";
        axios({
            method: "GET",
            url: requestURL,
        }).then((response) => {
            if (response.data) {
                const results = response.data.data;
                ActionsServer.receiveBooks(results);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    addBook(data) {
        const endpoint = '/add_book.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "add_book"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    editBook(data) {
        const endpoint = '/edit_book.php';
        const requestURL = devURL + endpoint;
        const body = {...data, action: "edit_book"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

    deleteBook(data) {
        const endpoint = '/delete_book.php';
        const requestURL = devURL + endpoint;
        const body = {id: data, action: "delete_book"}
        return axios({
            method: "POST",
            url: requestURL,
            data: body,
        })
    },

}