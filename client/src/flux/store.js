import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import {EventEmitter} from "events";
import VideosAPI from "../services/videos";
import BooksAPI from "../services/books";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
    menuVisible: false,
    navItems: getSidebarNavItems(),
    videos: [],
    posts: [],
    books: [],
    images: [],
    total_images: 0,
    num_images_pages: 0,
    total_posts: 0,
    num_posts_pages: 0,
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
        this.editBook = this.editBook.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateBooks = this.updateBooks.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.editVideo = this.editVideo.bind(this);
        this.updateImages = this.updateImages.bind(this);
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
            case Constants.ADD_BOOK:
                this.addBook(action.data);
                break;
            case Constants.GET_BOOKS_RESPONSE:
                this.updateBooks(action.response);
                break;
            case Constants.DELETE_BOOK:
                this.deleteBook(action.data);
                break;
            case Constants.EDIT_BOOK:
                this.editBook(action.data);
                break;
            case Constants.GET_IMAGES_RESPONSE:
                this.updateImages(action.response);
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

    updateBooks(data) {
        _store.books = [];
        data.map((item, idx) => {
            _store.books.push(item);
        });
        this.emit(Constants.CHANGE);
    }


    updatePosts(data) {
        _store.posts = [];
        data.data.map((item, idx) => {
            _store.posts.push(item);
        });
        _store.total_posts = parseInt(data.total_items);
        _store.num_posts_pages = parseInt(data.total_pages);
        this.emit(Constants.CHANGE);
    }

    updateImages(data) {
        _store.images = [];
        data.data.map((item, idx) => {
            _store.images.push(item);
        });
        _store.total_images = parseInt(data.total_items);
        _store.num_images_pages = parseInt(data.total_pages);
        this.emit(Constants.CHANGE);
    }

    setPost(data) {
        for (let post of _store.posts) {
            if (post.id === data) {
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

    addBook(data) {
        //Write to database and then use promise to push to
        BooksAPI.addBook(data).then((response) => {
            if (response.data.state === 200) {
                _store.books = response.data.results;
                this.emit(Constants.CHANGE);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    editBook(data) {
        //Write to database and then use promise to push to
        BooksAPI.editBook(data).then((response) => {
            if (response.data.state === 200) {
                _store.books = response.data.results;
                this.emit(Constants.CHANGE);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteBook(data) {
        //Write to database and then use promise to push to
        BooksAPI.deleteBook(data).then((response) => {
            if (response.data.state === 200) {
                _store.books = response.data.results;
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
        return {
            items: _store.posts,
            count: _store.total_posts,
            pages: _store.num_posts_pages,
        };
    }

    getBooks() {
        return _store.books;
    }

    getImages() {
        return {
            items: _store.images,
            count: _store.total_images,
            pages: _store.num_images_pages,
        };
    }

    getCurrentPost() {
        return _store.currentPost;
    }


}

export default new

Store();
