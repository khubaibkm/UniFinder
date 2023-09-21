import "./page1.css"

export const Page1 = () =>{
    return (
        <div id="page1">
            <h4>OVER 200+ ACTIVE LISTINGS</h4>
            <h1>Discover the Best Nearby Places & Things</h1>
            <div id="mypic">
                <img className="icons" src="src/assets/icons/living.png" alt="living" />
            </div>
            <div id="arr">
                <a href="#page2"><div id="arrow"><i className="ri-arrow-down-line"></i></div></a>
            </div>
        </div>
    )
}