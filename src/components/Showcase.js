import '../styles/Showcase.css';
import '../styles/Header.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import WorkData from '../data/works.json';

const Showcase = () => {

    const panelNum = 3;

    const [windowHeight, setWindowHeight] = useState(getWindowHeight());
    const [windowWidth, setWindowWidth] = useState (getWindowWidth());

    const navigate = useNavigate();
    const [workData, setWorkData] = useState(WorkData);
    const [showcaseList, setShowcaseList] = useState(workData.slice(0,panelNum).map((work) => (
        <button onClick={() => {

            navigate("workpage", {state:{data: work}});
        }} key={work.id} className="showcasepanel"><img src={process.env.PUBLIC_URL + work.mainimage} alt={work.title} /></button>
    )));

    function getWindowHeight() {
        var height = window.innerHeight;
        const bannerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mainBannerHeight'));

        const showcaseHeight = height - bannerHeight;

        document.documentElement.style.setProperty('--showcaseHeight', showcaseHeight + "px");

        return showcaseHeight;
    }

    function getWindowWidth() {
        var width = window.innerWidth;

        var panelWidth = (width / panelNum) - 4;
        document.documentElement.style.setProperty('--showcaseWidth', width + 'px');
        document.documentElement.style.setProperty('--showcasePanelWidth', panelWidth + 'px');


        return 0;
    }

    useEffect(() => {

        function WindowResize() { 
            setWindowHeight(getWindowHeight());
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener('resize', WindowResize);
        return () => window.removeEventListener('resize', WindowResize);
    })

    return (
        <div className="showcase">
            {showcaseList}
        </div>
     );
}
 
export default Showcase;