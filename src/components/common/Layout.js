import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

import logolaby from '../../assets/logo_labyrinth_white.png'
// Styles
import "../../styles/app.css";

import aff1 from "../../assets/flyers/labyrinth1.png"
import aff2 from "../../assets/flyers/pyjama_party.png"
import aff3 from "../../assets/flyers/uncle_waffle.png"

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    return <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">
            <div className="viewport-top">
                {/* The main header section on top of the screen */}
                <header
                    className="site-head"
                    style={{
                        ...(site.cover_image && {
                           
                        }),
                    }}
                >
                    <div className="container">
                        <div className="site-mast">
                            <div className="site-mast-left">
                                <Link to="/">
                                    {site.logo ? (
                                        <img
                                            className="site-logo"
                                            src={logolaby}
                                            alt={site.title}
                                        />
                                    ) : (
                                        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt={site.title} />
                                    )}
                                </Link>
                            </div>
                            <div className="site-mast-right">
                                {site.twitter && (
                                    <a
                                        href={twitterUrl}
                                        className="site-nav-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="site-nav-icon"
                                            src="/images/icons/twitter.svg"
                                            alt="Twitter"
                                        />
                                    </a>
                                )}
                                {site.facebook && (
                                    <a
                                        href={facebookUrl}
                                        className="site-nav-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="site-nav-icon"
                                            src="/images/icons/facebook.svg"
                                            alt="Facebook"
                                        />
                                    </a>
                                )}
                                <a
                                    className="site-nav-item"
                                    href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="site-nav-icon"
                                        src="/images/icons/rss.svg"
                                        alt="RSS Feed"
                                    />
                                </a>
                            </div>
                        </div>
                        {isHome ? (
                            <div className="site-banner">
                                <h1 style={{paddingBottom:"20px"}} className="site-banner-title">
                                    Le design sensible et sucré qui fait effet
                                </h1>
    
                            </div>
                        ) : null}
                        <nav className="site-nav">
                            <div className="site-nav-left">
                                        <Link className="site-nav-item" to="/">Portfolio</Link>
                                        <Link className="site-nav-item" to="/about">Author</Link>
    </div>
                            <div className="site-nav-right">
                                <Link
                                    className="site-nav-button"
                                    to="/about"
                                >
                                    About
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="site-main">
                 
                    {isHome ? (
    <section className="flyer-gallery container">
        <div className="gallery-grid">
            <img src={aff1} alt="Affiche Pyjama Party" />
            <img src={aff2} alt="Affiche Labyrinth" />
            <img src={aff3} alt="Affiche Uncle Waffle" />
            {/* Ajoute d'autres ici */}
        </div>
    </section>
) : (
    <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}> Who i am ?</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.2rem", lineHeight: "1.8" }}>
            I'm Nelxie ADISSO. I'm a junior graphic designer passionate about textures, soft colors, and powerful messages.
            I create visuals that are gentle, impactful, and emotionally resonant.
            Labyrinth is my creative playground. ✨
        </p>
        <p style={{ fontSize: "1.1rem", marginTop: "2rem" }}>
            📍 Bénin • 💻 Available in remote • 💌 steenaadisso@gmail.com
        </p>
    </div>
)}

                    
                </main>
            </div>

            <div className="viewport-bottom">
                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <div className="site-foot-nav container">
                        <div className="site-foot-nav-left">
                            <Link to="/">Labyrinth</Link> © 2025
                           
                        </div>
                        <div className="site-foot-nav-right">
                            <Link className="site-nav-item" to="/">Portfolio</Link>
                            <Link className="site-nav-item" to="/about">Author</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </>;
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`query GhostSettings {
  allGhostSettings {
    edges {
      node {
        ...GhostSettingsFields
      }
    }
  }
  file(relativePath: {eq: "ghost-icon.png"}) {
    childImageSharp {
      gatsbyImageData(width: 30, height: 30, layout: FIXED)
    }
  }
}
`}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
