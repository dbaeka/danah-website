import React from "react"
import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Pagination, PaginationItem, PaginationLink} from "reactstrap"
import Store from "../flux/store";
import {Actions} from "../flux";
import Carousel, {Modal, ModalGateway} from "react-images";
import Gallery from 'react-photo-gallery'

class GalleryPage extends React.Component {

    constructor(props) {
        super(props);
        this.pageSize = 10;

        this.state = {
            pagesCount: 1,
            images: Store.getImages().items,
            currentImage: 0,
            currentPage: 0,
            viewerIsOpen: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        Actions.getImages(1);
    }

    onChange() {
        this.setState({
            ...this.state,
            pagesCount: Store.getImages().pages,
            images: Store.getImages().items,
        });
    }

    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            viewerIsOpen: false
        })
    };

    openLightbox = (event, {index}) => {
        this.setState({
            currentImage: index,
            viewerIsOpen: true
        })
    }

    handleClick(e, index) {
        e.preventDefault();
        Actions.getImages(index+1);
        this.setState({
            currentPage: index
        });

    }

    render() {
        const {images, currentPage} = this.state;
        const gallery = images && images.map((image) => {
                return {
                    src: image.source_url,
                    width: image.media_details.width,
                    height: image.media_details.height,
                    alt: image.title.rendered,
                }
            }
        )
        return (
            <DefaultLayout>
                <SEO title="Gallery"/>
                {/*<NormalHeader  position="50% 9%" image={require("../images/header2.jpg")} title="Experience Q's"/>*/}
                <div className="subpage mb-5">
                    <div className="section">
                        <Container>
                            <h3 className="title">Gallery</h3>
                            <div id="gallery">
                                <Gallery photos={(gallery && gallery)} onClick={this.openLightbox}>
                                </Gallery>
                                <ModalGateway>
                                    {this.state.viewerIsOpen ? (
                                        <Modal onClose={this.closeLightbox}>
                                            <Carousel
                                                currentIndex={this.state.currentImage}
                                                views={gallery.map(x => ({
                                                    ...x,
                                                    // srcset: x.srcSet,
                                                    caption: x.alt
                                                }))}
                                            />
                                        </Modal>
                                    ) : null}
                                </ModalGateway>
                                <div className="mt-4">
                                    <Pagination aria-label="Page navigation example">
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage - 1)}
                                                previous
                                                href="#"
                                            />
                                        </PaginationItem>
                                        {[...Array(this.state.pagesCount)].map((page, i) =>
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem disabled={currentPage >= this.state.pagesCount - 1}>
                                            <PaginationLink
                                                onClick={e => this.handleClick(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    };
}

export default GalleryPage
