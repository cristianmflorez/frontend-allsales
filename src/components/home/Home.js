import React from "react";
import { MainBanner } from "./banners/MainBanner";
import {SideBanner} from "./banners/SideBanner";
import { RecentAdds } from "./RecentAdds";
import { Offers } from "./Offers";
import { RecentViews } from "./RecentViews";

function Home() {
    return(
        <>
            <MainBanner ></MainBanner>

            <div className=" d-flex justify-content-center">
                
                    <section>

                        <RecentAdds/>
                        
                    </section>

                    <section >
                        <SideBanner></SideBanner>
                    </section>
            
            </div>
            
            <RecentViews/>
            <Offers/>
            
        </>
    )
}

export {Home};