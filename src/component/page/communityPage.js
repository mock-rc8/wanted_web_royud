import Header from "../common/header"
import Footer from "../common/footer"

import { nowPage } from "../../recoil/recoil"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import styled from "styled-components"

export default function CommunityPage(){
    const [nowPaged, setnowPaged] = useRecoilState(nowPage);
    useEffect(() => {
        setnowPaged("/community")
    }, [])
    // -------------------------------------------------------------------
    
    // -------------------------------------------------------------------
    return (
        <div className="CommunityPage">
            <Header />
            <div className="MyInfo_Main">
                <div className="MyInfo_Main_wrap">
                    <div className="MyInfo_Main_title"></div>
                    <div className="MyInfo_Main_body">
                        <div className="MyInfo_Main_left">
                            <div className="MyInfo_Main_left_main">
                                
                            </div>
                        </div>
                        <div className="MyInfo_Main_right">
                            <div className="MyInfo_Main_section">
                                <ul className="MyInfo_Main_section_lists">
                                    <li className="MyInfo_Main_section_list">
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            추천 원티드 PICK
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            추천 커뮤니티 글
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}