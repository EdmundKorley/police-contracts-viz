import React, { Component } from 'react';
import headers from './utils/headers';
import { truncate } from './utils/handy';
import $ from 'jquery';
var directory = require('json!./utils/directory.json');

export default class Output extends Component {
    constructor(props) {
        super(props);
        this.setActive = this.setActive.bind(this);
        this.getDivs= this.getDivs.bind(this);
    }
    componentDidMount() {
        // Re-render on resize
        let resize = this.props.handleClick;
        window.addEventListener("resize", () => {
            resize();
        });
    }
    componentWillUnmount() {
        let resize = this.props.handleClick;
        // Unplug resize event listener
        window.removeEventListener("resize", () => {
            resize();
        });
    }
    setActive(id) {
        const { handleClick, ids } = this.props;
        handleClick([...ids, Number(id)]);
    }
    // Another massive function urgently to be made more modularized and sensible.
    // This one does many different things, see within ...
    getDivs(global_id) {
        const { ids } = this.props;
        const setActive = this.setActive;
        // We pull out texts for given ids to be rendered (recall these ids ultimately pulled from URL in <Base />)
        // We generate a truncated version of these texts too, to avoid making app too wanting for space
        // Truncated version of excessively long texts shown and full version dormant in a modal
        let reviews = ids.map((id) => directory[id]);
        let texts = reviews.map((review) => [review['Policy Language'], Number(review['Unique identifier'])]);
        let textsToShow = texts.map((text) => [truncate(text[0], 150), text[1]]);
        let textToShow, text;
        for (var i = 0; i < textsToShow.length; i++) {
            if (textsToShow[i][1] == global_id) {
                textToShow = textsToShow[i][0];
                text = texts[i][0];
            }
        }

        // Here we pull out other key info, except 'Policy Language' which will be shown separately,
        // and render divs out of them for a small table below the main table
        let reviewDivIndex;
        let reviewDivs = reviews.map((review, index) => {
            if (review['Unique identifier'] == global_id) {
                reviewDivIndex = index;
            }
            return Object.keys(review).map((key) => {
                if (key != 'Policy Language') {
                    let truncKey, truncReview;
                    if ($(document).width() < 600) {
                        truncKey = truncate(key, 30);
                        truncReview = truncate(review[key], 21);
                    } else {
                        truncKey = truncate(key, 50);
                        truncReview = truncate(review[key], 60);
                    }
                    return <tr>
                        <th className="data-row-header data-sync">{truncKey}</th>
                        <td className={truncReview.length == review[key].length ? "data-no" : "data-tooltip data-no"}>
                            {truncReview}
                            <span>{truncReview.length == review[key].length ? "" : review[key]}</span>
                        </td>
                    </tr>
                }
                return <tr style={{ display: 'none' }}></tr>
            });
        });
        let reviewDiv = reviewDivs[reviewDivIndex];

        // For multiple provisions at a given x,y we general multiple legend-like divs
        let reviewPolyDivs = reviews
                                .sort((r1, r2) => { if (Number(r1['Unique identifier']) > Number(r2['Unique identifier'])) { return 1 } else if (Number(r1['Unique identifier']) < Number(r2['Unique identifier'])) { return -1 }; return 0; })
                                .map((review) => <div onClick={() => setActive(review['Unique identifier'])} className="data-choose">{ review['City/State'] } - { review['Unique identifier'] }</div>)

        // We generate content with our state-driven URL for social media share functionality
        const host = document.referrer || window.location.href;
        const tweetBody = host + ' ' + reviews[0]['City/State'].toLowerCase() + ' - ' + reviews[0]['Specific Impact of Policy'].toLowerCase();
        let tweetShare = "https://twitter.com/home?status=" + truncate(tweetBody, 137) + "%20%23campaignzero%20%23policecontracts";
        let fbShare = "https://www.facebook.com/sharer/sharer.php?u=" + host;

        // Massive export, bad I know 😅, to be refactored. This whole component in fact ...
        return [reviews, reviewDiv, reviewPolyDivs, text, textToShow, tweetShare, fbShare];
    }
    render() {
        let idToPass = this.props.ids[this.props.ids.length - 1];
        let [reviews, reviewDiv, reviewPolyDivs, text, textToShow, tweetShare, fbShare] = this.getDivs(idToPass);
        return <div>
            <div className="data-output">
                <table>
                    <tbody>
                        { reviewDiv }
                    </tbody>
                </table>

                <div className="data-info">

                    <h3>Policy Language</h3>
                    <p className={textToShow.length == text.length ? "" : "data-tooltip"}>
                        {textToShow}
                        <span>{textToShow.length == text.length ? "" : text}</span>
                    </p>

                    <div className="social-media-icons">
                        <a target="_blank" href={fbShare}>
                            <svg width="40px" height="40px" viewBox="0 0 266.893 266.895" enableBackground="new 0 0 266.893 266.895">
                                <path id="b" fill="#3C5A99" d="M248.082,262.307c7.854,0,14.223-6.369,14.223-14.225V18.812
                                    c0-7.857-6.368-14.224-14.223-14.224H18.812c-7.857,0-14.224,6.367-14.224,14.224v229.27c0,7.855,6.366,14.225,14.224,14.225
                                    H248.082z"/>
                                <path id="f" fill="#FFFFFF" d="M182.409,262.307v-99.803h33.499l5.016-38.895h-38.515V98.777c0-11.261,3.127-18.935,19.275-18.935
                                    l20.596-0.009V45.045c-3.562-0.474-15.788-1.533-30.012-1.533c-29.695,0-50.025,18.126-50.025,51.413v28.684h-33.585v38.895h33.585
                                    v99.803H182.409z"/>
                            </svg>
                        </a>
                        <a target="_blank" href={tweetShare}>
                            <svg width="40px" height="40px" viewBox="0 0 182.66667 150.66667">
                                <defs id="defs6">
                                    <clipPath id="clipPath20" clipPathUnits="userSpaceOnUse">
                                        <path id="path18" d="m0 10.012h1366.9v1110.9h-1366.9z"/>
                                    </clipPath>
                                </defs>
                                <g id="g10" transform="matrix(1.3333 0 0 -1.3333 0 150.67)">
                                    <g id="g12" transform="scale(.1)">
                                        <g id="g14">
                                            <g id="g16" clipPath="url(#clipPath20)"><path
                                                id="path22"
                                                d="m1366.9 989.39c-50.27-22.309-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.679 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.141-41.4-37.969-89.567-37.969-140.97 0-97.308 49.489-183.13 124.76-233.44-45.969 1.437-89.218 14.058-127.03 35.078-0.043-1.18-0.043-2.348-0.043-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.281-9.8-73.86-9.8-18.089 0-35.628 1.711-52.781 5 35.711-111.41 139.26-192.5 262-194.77-96.058-75.23-216.96-120.04-348.36-120.04-22.621 0-44.961 1.332-66.918 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-0.28 24.223-0.79 36.25 54.77 39.571 102.31 88.95 139.93 145.2"
                                                fill="hsl(203, 89%, 50%)"/></g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="data-output-pool">
                { reviewPolyDivs }
            </div>
        </div>
    }
}
