import Header from "../common/header"
import { isLogin } from "../../recoil/recoil"
import { useEffect, useState } from "react"

import { useRecoilValue, useResetRecoilState } from "recoil"

import CompanyList from "../common/company_list"

import styled from "styled-components"

import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function MyWantedPage(){
    //인포 state
    const [userImg, set_userImg] = useState("");
    const [userName, set_userName] = useState("");
    const [userEmail, set_userEmail] = useState("");
    const [userPhone, set_userPhone] = useState("");

    // 포인트
    const [userPoint, set_userPoint] = useState("");
    // 지원 현황
    const [user_employ_1, set_user_employ_1] = useState("");
    const [user_employ_2, set_user_employ_2] = useState("");
    const [user_employ_3, set_user_employ_3] = useState("");
    const [user_employ_4, set_user_employ_4] = useState("");
    // 프로필
    const [user_profile, set_user_profile] = useState("");
    const [user_profile_percent, set_user_profile_percent] = useState("");
    // ---------------------------------------------------------------------
    // 데이터 불러오기
    const url = "https://prod.serverhwan.shop"

    const myWantedData = async() => {
        try{
            const data = await axios({
                method: "get",
                url: `${url}/wanted/${localStorage.getItem("userIdx")}`,
                headers: {
                    "X-ACCESS-TOKEN" : localStorage.getItem("token"),
                    userIdx : localStorage.getItem("userIdx")
                }
            })
            //인포 창
            set_userImg(data.data.result.user.imageUrl);
            set_userName(data.data.result.user.name);
            set_userEmail(data.data.result.user.email);
            set_userPhone(data.data.result.user.phone);
            // 포인트
            set_userPoint(data.data.result.point);
            // 지원 현황
            set_user_employ_1(data.data.result.applicationStatus.completed)
            set_user_employ_2(data.data.result.applicationStatus.browse)
            set_user_employ_3(data.data.result.applicationStatus.pass)
            set_user_employ_4(data.data.result.applicationStatus.fail)
            // 프로필
            set_user_profile(data.data.result.profile.userInfo)
            set_user_profile_percent(data.data.result.profile.percent)
            // 프로필
        }
        catch(err){
        }
    }
    const isLogined = useRecoilValue(isLogin);
    const navigate = useNavigate();
    useEffect(() => {
        myWantedData();
        console.log(userImg);
        if(!isLogined){
            navigate("/")
        }
    } ,[isLogined])
    // ---------------------------------------------------------------------
    return (
        <div className="MyWantedPage">
            <Header />
            <div className="MyInfo_Main">
                <div className="MyInfo_Main_wrap">
                    <div className="MyInfo_Main_title">
                        MY 원티드
                    </div>
                    <div className="MyInfo_Main_body">
                        <div className="MyInfo_Main_left">
                            <div className="MyInfo_Main_left_main">
                                <div className="MyInfo_Main_left_info">
                                    <div
                                    className="MyInfo_Main_left_info_img"
                                    style={{
                                        backgroundImage: `url(${userImg})`
                                    }}
                                    ></div>
                                    <div className="MyInfo_Main_left_info_another">
                                        <div className="MyInfo_Main_left_info_name">
                                            {userName}
                                        </div>
                                        <div className="MyInfo_Main_left_info_email">
                                            {userEmail}
                                        </div>
                                        <div className="MyInfo_Main_left_info_phone">
                                            {userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                                        </div>
                                    </div>
                                </div>
                                <div className="MyInfo_Main_left_point">
                                    <div className="MyInfo_Main_left_menu">
                                        포인트
                                    </div>
                                    <div className="MyInfo_Main_left_desc">
                                        {userPoint}P
                                    </div>
                                </div>
                                <ul className="MyInfo_Main_left_match_lists">
                                    <li className="MyInfo_Main_left_match_list">
                                        <div className="MyInfo_Main_left_menu">
                                            관심 있음
                                        </div>
                                        <div className="MyInfo_Main_left_desc">
                                            0
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_left_match_list">
                                        <div className="MyInfo_Main_left_menu">
                                            열람
                                        </div>
                                        <div className="MyInfo_Main_left_desc">
                                            0
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_left_match_list">
                                        <div className="MyInfo_Main_left_menu">
                                            받은 제안
                                        </div>
                                        <div className="MyInfo_Main_left_desc">
                                            0
                                        </div>
                                    </li>
                                </ul>
                                <div className="MyInfo_Main_left_account_set">
                                    <div className="MyInfo_Main_left_menu">
                                        계정 설정
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="MyInfo_Main_right">
                            <div className="MyInfo_Main_section">
                                <div className="MyInfo_Main_section_title">
                                    지원 현황
                                </div>
                                <div className="MyInfo_Main_section_desc">
                                    <ul className="MyInfo_Main_section_employ_lists">
                                        <li className="MyInfo_Main_section_employ_list">
                                            <div className="MyInfo_Main_section_employ_list_desc">
                                                {user_employ_1}
                                            </div>
                                            <div className="MyInfo_Main_section_employ_list_title">
                                                지원 완료
                                            </div>
                                        </li>
                                        <li className="MyInfo_Main_section_employ_list">
                                            <div className="MyInfo_Main_section_employ_list_desc">
                                                {user_employ_2}
                                            </div>
                                            <div className="MyInfo_Main_section_employ_list_title">
                                                이력서 열람
                                            </div>
                                        </li>
                                        <li className="MyInfo_Main_section_employ_list">
                                            <div className="MyInfo_Main_section_employ_list_desc">
                                                {user_employ_3}
                                            </div>
                                            <div className="MyInfo_Main_section_employ_list_title">
                                                최종 합격
                                            </div>
                                        </li>
                                        <li className="MyInfo_Main_section_employ_list">
                                            <div className="MyInfo_Main_section_employ_list_desc">
                                                {user_employ_4}
                                            </div>
                                            <div className="MyInfo_Main_section_employ_list_title">
                                                불합격
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="MyInfo_Main_section">
                                <div className="MyInfo_Main_section_title">
                                    프로필
                                </div>
                                <div className="MyInfo_Main_section_desc">
                                    <div className="MyInfo_Main_section_profile">
                                        <div className="MyInfo_Main_section_profile_title">
                                            {user_profile}
                                        </div>
                                        <div className="MyInfo_Main_section_profile_desc">
                                            <MyInfoMainSectionProfileLevel
                                            user_profile_percent = {user_profile_percent}
                                             />
                                            <ul className="MyInfo_Main_section_profile_bar">
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <ul className="MyInfo_Main_section_profile_bar_text">
                                            <li>20%</li>
                                            <li>40%</li>
                                            <li>70%</li>
                                            <li>100%</li>
                                        </ul>
                                    </div>
                                    <div className="MyInfo_Main_section_profile_comment">
                                        간단한 소개만 작성해도 면접 제안을 받을 수 있어요!
                                    </div>
                                    <div className="MyInfo_Main_section_profile_btn_wrap">
                                        <button className="MyInfo_Main_section_profile_btn">
                                            간단 이력 추가하고 매치업 시작하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="MyInfo_Main_section_bar">
                                <div className="MyInfo_Main_section_bar_comment">
                                    <span>이직할까 말까 고민될 땐,</span>
                                    <div>내 커리어 중간점검</div>
                                </div>
                                <div className="MyInfo_Main_section_bar_img">
                                    <img src="https://static.wanted.co.kr/career_connect/banner-mywanted.png" />
                                </div>
                            </div>
                            <div className="MyInfo_Main_section">
                                <ul className="MyInfo_Main_section_lists">
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            원티드 추천 포지션
                                        </div>
                                        <div className="MyInfo_Main_section_company">
                                            <ul className="MyInfo_Main_section_company_lists">
                                                <li className="MyInfo_Main_section_company_list">
                                                    <div
                                                    className="MyInfo_Main_section_company_img"
                                                    style={{backgroundImage: "url('https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F240%2Fa9whl6bwnx3k4wmw__400_400.jpg&w=400&q=75')"}}
                                                    ></div>
                                                    <div className="company_body">
                                                        <div className="company_list_title">
                                                            웹 프로그래머
                                                        </div>
                                                        <div className="company_list_name">
                                                            스프링웍스
                                                        </div>
                                                        <button className="company_list_tag">
                                                            응답률 매우 높음
                                                        </button>
                                                        <div className="company_list_location">
                                                            서울·한국
                                                        </div>
                                                        <div className="company_list_reward">
                                                            채용보상금 1,000,000원
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="MyInfo_Main_section_company_list">
                                                    <div
                                                    className="MyInfo_Main_section_company_img"
                                                    style={{backgroundImage: "url('https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F179%2Ffgaf0txpsk21hoon__400_400.jpg&w=400&q=75')"}}
                                                    ></div>
                                                    <div className="company_body">
                                                        <div className="company_list_title">
                                                            Software Engineer, Frontend
                                                        </div>
                                                        <div className="company_list_name">
                                                            버킷플레이스(오늘의집)
                                                        </div>
                                                        <button className="company_list_tag">
                                                            응답률 매우 높음
                                                        </button>
                                                        <div className="company_list_location">
                                                            서울·한국
                                                        </div>
                                                        <div className="company_list_reward">
                                                            채용보상금 1,000,000원
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="MyInfo_Main_section_company_list">
                                                    <div
                                                    className="MyInfo_Main_section_company_img"
                                                    style={{backgroundImage: "url('https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F35%2Fwl4mb18qp45k1aum__400_400.jpg&w=400&q=75')"}}
                                                    ></div>
                                                    <div className="company_body">
                                                        <div className="company_list_title">
                                                            [Tech] Jr. Frontend Developer (2년 이상)
                                                        </div>
                                                        <div className="company_list_name">
                                                            위대한상상(요기요)
                                                        </div>
                                                        <button className="company_list_tag">
                                                            응답률 매우 높음
                                                        </button>
                                                        <div className="company_list_location">
                                                            서울·한국
                                                        </div>
                                                        <div className="company_list_reward">
                                                            채용보상금 1,000,000원
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="MyInfo_Main_section_company_list">
                                                    <div
                                                    className="MyInfo_Main_section_company_img"
                                                    style={{backgroundImage: "url('https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F63%2Fbclu6isv9svc7esq__400_400.jpg&w=400&q=75')"}}
                                                    ></div>
                                                    <div className="company_body">
                                                        <div className="company_list_title">
                                                            웹 프론트엔드 엔지니어 (Web Front-End Engineer)
                                                        </div>
                                                        <div className="company_list_name">
                                                            뱅크샐러드
                                                        </div>
                                                        <button className="company_list_tag">
                                                            응답률 매우 높음
                                                        </button>
                                                        <div className="company_list_location">
                                                            서울·한국
                                                        </div>
                                                        <div className="company_list_reward">
                                                            채용보상금 1,000,000원
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            MY 원티드플러스
                                        </div>
                                        <div className="MyInfo_Main_section_text">
                                            직군별 최고의 교육을 한곳에서 볼 수 있는 Wanted+를 이용해보세요
                                            <br />
                                            <span>700+개의 영상</span>을 언제든 볼 수 있습니다.
                                        </div>
                                        <div className="MyInfo_Main_section_btn_wrap">
                                            <button className="MyInfo_Main_section_btn">
                                                Wanted+ 알아보기
                                            </button>
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            MY 영상
                                        </div>
                                        <div className="MyInfo_Main_section_text">
                                            이벤트 메뉴에서 영상을 구매·추가해보세요
                                        </div>
                                        <div className="MyInfo_Main_section_btn_wrap">
                                            <button className="MyInfo_Main_section_btn">
                                                Wanted+ 알아보기
                                            </button>
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            추천
                                        </div>
                                        <div className="MyInfo_Main_section_text">
                                            좋은 사람과 좋은 회사가 더 많이 연결되도록 추천하고, 추천받고, 성장하세요
                                        </div>
                                        <div className="MyInfo_Main_section_btn_wrap">
                                            <button className="MyInfo_Main_section_btn">
                                                Wanted+ 알아보기
                                            </button>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const MyInfoMainSectionProfileLevel = styled.div`
position: absolute; left: 0; top: 0;
width: ${
    ({user_profile_percent}) => {
        switch(user_profile_percent){
            case 30:
                return "calc(100% / 7 * 2)";
                break;
            case 40:
                return "calc(100% / 7 * 3)";
                break;
            case 55:
                return "calc(100% / 7 * 4)";
                break;
            case 70:
                return "calc(100% / 7 * 5)";
                break;
            default:
                return "100%";
                break;
        }
    }
};
height: 10px;
border-radius: 5px 0 0 5px;
background-image: linear-gradient(90deg,#94afff,#7b9cff 34%,#547fff 100%,#334dff 165%,#4e5bfd 231%);
`;