import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import {EventEmitter} from "events";
import VideosAPI from "../services/videos";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
    menuVisible: false,
    navItems: getSidebarNavItems(),
    videos: [],
    posts: [],
    currentPost: null,
};

class Store extends EventEmitter {
    constructor() {
        super();

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.addVideo = this.addVideo.bind(this);
        this.updateVideos = this.updateVideos.bind(this);
        this.setPost = this.setPost.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);
        this.editVideo = this.editVideo.bind(this);
        AppDispatcher.register(this.registerActions.bind(this));
    }

    registerActions({action}) {
        switch (action.actionType) {
            case Constants.TOGGLE_SIDEBAR:
                this.toggleSidebar();
                break;
            case Constants.ADD_VIDEO:
                this.addVideo(action.data);
                break;
            case Constants.GET_VIDEOS_RESPONSE:
                this.updateVideos(action.response);
                break;
            case Constants.DELETE_VIDEO:
                this.deleteVideo(action.data);
                break;
            case Constants.EDIT_VIDEO:
                this.editVideo(action.data);
                break;
            case Constants.GET_POSTS_RESPONSE:
                this.updatePosts(action.response);
                break;
            case Constants.SET_POST:
                this.setPost(action.data);
                break;
            default:
                return true;
        }
    }


    addChangeListener(callback) {
        this.on(Constants.CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE, callback);
    }

    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(Constants.CHANGE);
    }

    updateVideos(data) {
        _store.videos = [];
        data.map((item, idx) => {
            _store.videos.push(item);
        });
        this.emit(Constants.CHANGE);
    }

    updatePosts(data) {
        _store.posts = [];
        data.map((item, idx) => {
            _store.posts.push(item);
        });
        this.emit(Constants.CHANGE);
    }

    setPost(data) {
        for (let post of _store.posts) {
            if (post.id === data){
                _store.currentPost = post;
                break;
            }
        }
        this.emit(Constants.CHANGE);
    }

    addVideo(data) {
        //Write to database and then use promise to push to
        VideosAPI.addVideo(data).then((response) => {
            if (response.data.state === 200) {
                _store.videos = response.data.results;
                this.emit(Constants.CHANGE);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    editVideo(data) {
        //Write to database and then use promise to push to
        VideosAPI.editVideo(data).then((response) => {
            if (response.data.state === 200) {
                _store.videos = response.data.results;
                this.emit(Constants.CHANGE);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteVideo(data) {
        //Write to database and then use promise to push to
        VideosAPI.deleteVideo(data).then((response) => {
            if (response.data.state === 200) {
                _store.videos = response.data.results;
                this.emit(Constants.CHANGE);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    getMenuState() {
        return _store.menuVisible;
    }

    getSidebarItems() {
        return _store.navItems;
    }

    getVideos() {
        return _store.videos;
    }

    getPosts() {
        return _store.posts;
    }

    getCurrentPost() {
        return _store.currentPost;
    }


}

export default new

Store();
