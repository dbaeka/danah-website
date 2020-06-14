import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedin, faFacebookF, faTwitter, faWhatsapp,} from '@fortawesome/free-brands-svg-icons'

import {
    FacebookShareButton,
    FacebookIcon,
    GooglePlusShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
} from 'react-share';


const Share = ({socialConfig, tags}) => (
    <div className="post-social">
        <h4><b>Share on Social Media</b></h4>
        <div>
        <FacebookShareButton url={socialConfig.config.url} className="button is-outlined is-rounded facebook">
            <FacebookIcon size={32}  />
            <span className="ml-1 text">Facebook</span>
        </FacebookShareButton>
        <TwitterShareButton url={socialConfig.config.url} className="button is-outlined is-rounded twitter"
                            title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')}
                            hashtags={tags}>
            <TwitterIcon size={32}  />
            <span className="ml-1 text">Twitter</span>
        </TwitterShareButton>
        {/*<GooglePlusShareButton url={socialConfig.config.url} className="button is-outlined is-rounded googleplus" >*/}
        {/*	<span className="icon">*/}
        {/*		<FontAwesomeIcon icon={['fab', 'google-plus-g']} />*/}
        {/*	</span>*/}
        {/*    <span className="text">Google+</span>*/}
        {/*</GooglePlusShareButton>*/}
        <LinkedinShareButton url={socialConfig.config.url} className="button is-outlined is-rounded linkedin"
                             title={socialConfig.config.title}>
            <LinkedinIcon size={32}  />
            <span className="ml-1 text">LinkedIn</span>
        </LinkedinShareButton>
        {/*<RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >*/}
        {/*	<span className="icon">*/}
        {/*		<FontAwesomeIcon icon={['fab', 'reddit-alien']} />*/}
        {/*	</span>*/}
        {/*    <span className="text">Reddit</span>*/}
        {/*</RedditShareButton>*/}
        <WhatsappShareButton url={socialConfig.config.url} className="button  whatsapp"
                             title={socialConfig.config.title}>
            <WhatsappIcon size={32}  />
            <span className="ml-1 text">WhatsApp</span>
        </WhatsappShareButton>
        </div>
    </div>
);

Share.propTypes = {
    socialConfig: PropTypes.shape({
        twitterHandle: PropTypes.string.isRequired,
        config: PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
    tags: [],
};

export default Share;