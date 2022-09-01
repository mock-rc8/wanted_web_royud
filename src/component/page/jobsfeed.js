import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../common/header"
import Footer from "../common/footer"
import Slider from "../common/slider"
import SectionButton from "../common/sectionBtn";

import slideBox from "../../db/slide.json"

import { nowPage } from "../../recoil/recoil";
import { useRecoilState } from "recoil";

export default function JobsfeedPage(){
    const [nowPaged, set_nowPaged] = useRecoilState(nowPage)
    useEffect(() => {
        set_nowPaged("/jobsfeed")
    }, [])

    // -------------------------------------------------------------------
    const url = "https://prod.serverhwan.shop";

    const [slide_img_list, set_slide_img_list] = useState(slideBox);

    const homeView = async() => {
        try {
            const data = await axios({
                method : "get",
                url: `${url}/employments`
            });
            set_slide_img_list(data.data.result.empBannerUrl);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        homeView();
    }, [])
    return (
        <div className="JobsfeedPage">

            <Header />
            <div className="main_page">
                <Slider slide_img_list = {slide_img_list} />

                <SectionButtonBox>
                    <Link to = "/wdlist">
                        <SectionButton
                        desc = "채용 중인 포지션 보러 가기"
                        ico = "Magnifying Glass"
                        />
                    </Link>

                </SectionButtonBox>

                <div className="recommend_position_wrap">
                    <div className="recommend_position_logo_wrap">
                        <div className="recommend_position_logo_img">
                            <img src="/images/wanted_ai.png" alt="" />
                        </div>
                        <img
                        className="recommend_position_desc_img"
                        src="https://static.wanted.co.kr/images/ai/logo-wantedai.png" alt="" />
                    </div>
                    <div className="recommend_position__comment_wrap">
                        <img
                            width = "114"
                            style = {{margin: "0 0 3px 0"}}
                            src="https://static.wanted.co.kr/images/ai/logo-wantedai.png" alt=""
                        />
                        가 제안하는 합격률 높은 포지션
                        <svg
                        width="24" height="24"
                        viewBox="0 0 17 17"
                        >
                            <g fill="none">
                                <path
                                stroke="#999"
                                d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745" transform="translate(1 1)"
                                ></path>
                                <path
                                fill="#999"
                                d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671" transform="translate(1 1) rotate(-180 7.053 10.408)"
                                ></path>
                                <path
                                stroke="#999"
                                d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783" transform="translate(1 1)"
                                ></path>
                            </g>
                        </svg>
                    </div>
                    <div className="recommend_position__comment_sub">
                        회원가입하면 포지션을 추천해드려요.
                    </div>
                    <div className="recommend_position__comment_btn">
                        <button>
                            지금 시작하기
                        </button>
                    </div>
                </div>

                <div className="section_banner">
                    <div className="section_banner_wrap">
                        <div className="section_banner_desc">
                            입사일 퇴사일 헷갈릴 때, 내 경력 한눈에 모아보기!
                            <div className="section_banner_btn">
                                지금 확인하기
                            </div>
                        </div>
                        <div className="section_banner_img">
                            <img
                            src="https://static.wanted.co.kr/career_connect/banner.png"
                            alt=""
                            />
                        </div>

                    </div>
                </div>
            </div>
            


            <Footer />
        </div>
    )
}
const SectionButtonBox = styled.div`
    margin: 60px auto;
`;