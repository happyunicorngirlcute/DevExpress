'use client';
import Image from "next/image";

const ExploreBtn = () => {
    return (
            <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={function() { console.log('sqsd'); }}>
                <a href="#events">
                    Explore Events
                    <Image src="/icons/arrow-down.svg" alt="arror-down" width={24} height={24}/>
                </a>
            </button>

    )
}
export default ExploreBtn
