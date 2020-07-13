import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import WPAPI from "../services/wordpress";
import VideosAPI from "../services/videos";
import BooksAPI from "../services/books";
import EventsAPI from "../services/events";

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

    addBook(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_BOOK,
            data: data
        });
    }

    editBook(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.EDIT_BOOK,
            data: data
        });
    }

    deleteBook(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.DELETE_BOOK,
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


    getImages(index) {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_IMAGES,
            data: index,
        });
        WPAPI.getImages(index);
    }

    getBooks() {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_BOOKS,
        });
        BooksAPI.getBooks();
    }

    getPosts(index) {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_POSTS,
            data: index,
        });
        WPAPI.getPosts(index);
    }

    getSinglePost(index) {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_SINGLE_POST,
            data: index
        });
        WPAPI.getSinglePost(index);
    }

    addEvent(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_EVENT,
            data: data
        });
    }

    editEvent(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.EDIT_EVENT,
            data: data
        });
    }

    deleteEvent(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.DELETE_EVENT,
            data: data
        });
    }

    getEvents() {
        AppDispatcher.handleViewAction({
            actionType: Constants.GET_EVENTS,
        });
        EventsAPI.getEvents();
    }
}


export default new Actions();