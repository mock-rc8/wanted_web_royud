import Header from "../common/header"
import { nowPage } from "../../recoil/recoil"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

import { isLogin } from "../../recoil/recoil"
import { Link, useNavigate } from "react-router-dom"

export default function CommunityPage(){
    const [nowPaged, setnowPaged] = useRecoilState(nowPage);
    useEffect(() => {
        setnowPaged("/community")
    }, [])
    // -------------------------------------------------------------------
    const [isLogind, set_isLogind] = useRecoilState(isLogin);

    const url = "https://prod.serverhwan.shop"

    const [community_category, set_community_category] = useState([]);
    const [community_tags, set_community_tags] = useState("");
    const [community_text_lists, set_community_text_lists] = useState([]);

    const [community_user_img, set_community_user_img] = useState("");
    const [community_user_myName, set_community_user_myName] = useState("");
    const [community_user_job, set_community_user_job] = useState("");
    const [community_user_myCareer, set_community_user_myCareer] = useState("");

    //비회원 추천 api
    const community_view = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities/recommends`
            })
            set_community_category(data.data.result.communityTags);
            set_community_tags(data.data.result.recommTag)
            set_community_text_lists(data.data.result.postingList)
        }
        catch(err){

        }
    }
    //회원 추천 api
    const community_view_login = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities/recommends/${localStorage.getItem("userIdx")}`,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("token"),
                    userIdx: localStorage.getItem("userIdx")
                }
            })
            set_community_category(data.data.result.communityTags)
            set_community_tags(data.data.result.recommTag)
            set_community_text_lists(data.data.result.postingList)
            set_community_user_img(data.data.result.user.myProfileUrl)
            set_community_user_myName(data.data.result.user.myName)
            set_community_user_job(data.data.result.user.myJob)
            set_community_user_myCareer(data.data.result.user.myCareer)
        }
        catch(err){

        }
    }

    // -------------------------------------------------------------------
    //비회원 전체 api
    const community_all_view = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities/totals`
            })
        }
        catch(err){

        }
    }

    // -------------------------------------------------------------------
    //비회원 나머지 api
    const community_another_view = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities?ctIdx=8`
            })
        }
        catch(err){

        }
    }
    useEffect(() => {
        community_another_view()
        switch(isLogind){
            case true:
                community_view_login();
                break;
            case false:
                community_view();
                break;
        }
    }, [isLogind])
    // -------------------------------------------------------------------
    const move_std = -200;
    const move_ani = 0.3;
    const [right_move_check, set_right_move_check] = useState(0);
    
    const [arrowboxRight, setArrowboxRight] = useState("section_category_arrow_box right")
    const [arrowboxLeft, setArrowboxLeft] = useState("section_category_arrow_box left hidden")
    
    const category_move_right = () => {
        if(right_move_check < 6){
            set_right_move_check(right_move_check + 1)
        }
        if(right_move_check === 0){
            setArrowboxLeft("section_category_arrow_box left")
        }
        if(right_move_check === 5){
            setTimeout(() => {
                setArrowboxRight("section_category_arrow_box right hidden")
            }, move_ani * 1000);
        }
    }
    const category_move_left = () => {
        if(right_move_check > 0){
            set_right_move_check(right_move_check - 1)
        }
        if(right_move_check === 6){
            setArrowboxRight("section_category_arrow_box right")
        }
        if(right_move_check === 1){
            setTimeout(() => {
                setArrowboxLeft("section_category_arrow_box left hidden")
            }, move_ani * 1000);
        }
    }

    const [list_click_idx, set_list_click_idx] = useState(1);

    const btn_Active = (e) => {
        const E_tar = e.target
        const parEl = E_tar.parentNode;
        const parChi = parEl.children;
        const idx = Array.from(parChi).indexOf(E_tar)

        set_list_click_idx(idx + 1)
    }
    const navigate = useNavigate();

    const Link_to_commu_write = () => {
        const params = "/write"
        navigate(`/community${params}`);
    }
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
                                <div className="community_left">
                                    <div className="community_left_title">
                                        MY 커뮤니티
                                    </div>
                                    <div className="community_left_desc">
                                        <div className="header_profile">
                                            <div
                                            className="header_profile_img"
                                            style={{backgroundImage: `url(${
                                                isLogind
                                                ?community_user_img
                                                :"https://static.wanted.co.kr/images/profile_default.png"
                                            })`}}
                                            ></div>
                                        </div>
                                        {
                                            isLogind
                                            ?<div className="community_profile_desc">
                                                <div className="community_profile_desc_name">
                                                    {community_user_myName}
                                                </div>
                                                <div className="community_text_list_profile_tags">
                                                    <div className="community_text_list_profile_tag">
                                                        {community_user_myCareer}
                                                    </div>
                                                    <div className="community_text_list_profile_tag">
                                                        {community_user_job}
                                                    </div>
                                                </div>
                                            </div>
                                            :<div className="community_profile_desc">
                                                <span>로그인 해주세요.</span>
                                            </div>
                                        }
                                        <svg
                                        width={18} height={18}
                                        >
                                            <path
                                            fill="#666666"
                                            d = "M5.21967 2.21967C5.48594 1.9534 5.9026 1.9292 6.19621 2.14705L6.28033 2.21967L12.5303 8.46967C12.7966 8.73594 12.8208 9.1526 12.6029 9.44621L12.5303 9.53033L6.28033 15.7803C5.98744 16.0732 5.51256 16.0732 5.21967 15.7803C4.9534 15.5141 4.9292 15.0974 5.14705 14.8038L5.21967 14.7197L10.939 9L5.21967 3.28033C4.9534 3.01406 4.9292 2.5974 5.14705 2.30379L5.21967 2.21967Z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="MyInfo_Main_right">
                            <div className="MyInfo_Main_section">
                                <ul className="MyInfo_Main_section_lists">
                                    <li className="MyInfo_Main_section_list">
                                        <div className="community_category">
                                            <div className="community_category_box">
                                                <ul
                                                className="section_category_lists"
                                                style={{
                                                    transform : `translateX(${right_move_check * move_std}px)`,
                                                    transition : `transform ${move_ani}s`
                                                }}
                                                >
                                                    {
                                                        community_category.map((list) => (
                                                            list.ctIdx === list_click_idx
                                                            ?<li
                                                            className="section_category_list current"
                                                            key={list.ctIdx}
                                                            onClick = {(e) => btn_Active(e)}
                                                            >
                                                                {list.name}
                                                            </li>
                                                            :<li
                                                            className="section_category_list"
                                                            key={list.ctIdx}
                                                            onClick = {(e) => btn_Active(e)}
                                                            >
                                                                {list.name}
                                                            </li>
                                                        ))
                                                    }
                                                
                                                </ul>
                                            </div>
                                            <div className={arrowboxLeft}>
                                                <div
                                                className="section_category_arrow left"
                                                onClick={category_move_left}
                                                >
                                                    <svg viewBox="0 0 18 18">
                                                        <path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className={arrowboxRight}>
                                                <div
                                                className="section_category_arrow right"
                                                onClick={category_move_right}
                                                >
                                                    <svg viewBox="0 0 18 18">
                                                        <path
                                                        d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="section_category_btn">
                                                <svg width="16" height="3" viewBox="0 0 16 3">
                                                    <path
                                                    d="M2 0C2.828 0 3.5 0.672 3.5 1.5C3.5 2.328 2.828 3 2 3C1.172 3 0.5 2.328 0.5 1.5C0.5 0.672 1.172 0 2 0ZM8 0C8.828 0 9.5 0.672 9.5 1.5C9.5 2.328 8.828 3 8 3C7.172 3 6.5 2.328 6.5 1.5C6.5 0.672 7.172 0 8 0ZM14 0C14.828 0 15.5 0.672 15.5 1.5C15.5 2.328 14.828 3 14 3C13.172 3 12.5 2.328 12.5 1.5C12.5 0.672 13.172 0 14 0Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div
                                        style={{marginLeft: `${
                                            isLogind
                                            ?30
                                            :0
                                        }px`}}
                                        className="MyInfo_Main_section_list_input">
                                            {
                                                isLogind
                                                ?<div className="header_profile">
                                                    <div
                                                    className="header_profile_img"
                                                    style={{backgroundImage: `url(${
                                                        isLogind
                                                        ?community_user_img
                                                        :"https://static.wanted.co.kr/images/profile_default.png"
                                                    })`}}
                                                    ></div>
                                                </div>
                                                :null
                                            }
                                            <button
                                            style={{width: `${
                                                isLogind?669:730
                                            }px`}}
                                            onClick={Link_to_commu_write}
                                            className="MyInfo_Main_section_list_input_btn">
                                                커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!
                                                <svg
                                                width="24" height="24"
                                                >
                                                    <path
                                                    fill="#333"
                                                    d="M17.21 2.23a.75.75 0 0 1 1.07-.01l3.5 3.5a.75.75 0 0 1 .011 1.05l-12 12.5a.75.75 0 1 1-1.082-1.04l8.062-8.398-2.451-2.451L4.5 17.553V20h2.75a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 .21-.52zm.55 1.59-2.397 2.482 2.447 2.447 2.39-2.488-2.44-2.441z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                    <li className="MyInfo_Main_section_list">
                                        <div className="MyInfo_Main_section_title">
                                            추천 커뮤니티 글
                                            <div className="MyInfo_Main_section_title_tag">
                                                {community_tags}
                                            </div>
                                        </div>
                                        <ul className="community_text_lists">
                                            {
                                                community_text_lists.map((list) => (
                                                    <Link
                                                    key={list.postingIdx}
                                                    to={`/community/post/${list.postingIdx}`} >
                                                        <li className="community_text_list">
                                                            <div className="community_text_list_profile">
                                                                <div
                                                                className="community_text_list_profile_img"
                                                                style={{backgroundImage: `url(${list.profileUrl})`}}
                                                                ></div>
                                                                <div className="community_text_list_profile_desc">
                                                                    <div className="community_text_list_profile_desc_box">
                                                                        <div className="community_text_list_profile_name">
                                                                            {list.name}
                                                                        </div>
                                                                        <div className="community_text_list_profile_tags">
                                                                            <div className="community_text_list_profile_tag">
                                                                                {list.career}
                                                                            </div>
                                                                            <div className="community_text_list_profile_tag">
                                                                                {list.job}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="community_text_list_time">
                                                                        {list.date}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="community_text_list_desc">
                                                                <div className="community_text_list_title">
                                                                    {list.title}
                                                                </div>
                                                                <div className="community_text_list_text">
                                                                    {list.content}
                                                                </div>
                                                                <ul className="community_text_list_tags">
                                                                    {
                                                                        list.tags.map((tag) => (
                                                                            <li
                                                                            key={tag.ctIdx}
                                                                            className="community_text_list_tag">
                                                                                {tag.name}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                <ul className="community_text_list_react">
                                                                    <li className="community_text_list_react like">
                                                                        <svg
                                                                        width="18" height="18"
                                                                        viewBox="0 0 18 18"
                                                                        >
                                                                            <path
                                                                            fill="#666"
                                                                            d="M13.353 2.214c.082.164.15.332.204.502.325 1.032.13 2.08-.396 3.092l-.105.191L16.253 6a.75.75 0 0 1 .743.648l.007.102v5.75a.75.75 0 0 1-.106.385l-.058.084-3.004 3.75a.75.75 0 0 1-.472.273L13.25 17H9.22a.75.75 0 0 1-.101-1.493l.102-.007h3.668l2.614-3.264V7.5h-3.91a.75.75 0 0 1-.604-1.195l.066-.077c.137-.14.36-.415.584-.778.5-.808.702-1.6.487-2.283a1.858 1.858 0 0 0-.113-.278c-.278-.551-1.075-.442-1.075-.056a3.17 3.17 0 0 1-.777 2.125c-.293.338-.59.555-.774.647l-.472.292c-.89.568-1.459 1.04-1.762 1.409l-.097.128-.058.095v.062l-.004.016-.006.093a.75.75 0 0 1-.641.641l-.102.007-.102-.007a.75.75 0 0 1-.648-.743V7.5H2.496v8h2.999l-.001-4.535.007-.102a.75.75 0 0 1 1.493.102v5.286l-.007.102a.75.75 0 0 1-.743.648H1.747l-.102-.007a.75.75 0 0 1-.648-.743v-9.5l.007-.102A.75.75 0 0 1 1.747 6h4.498l.066.005c.387-.38.92-.796 1.621-1.256l.472-.3.253-.154c.07-.035.217-.143.37-.32.226-.26.37-.576.403-.969l.008-.173c0-2.082 2.972-2.491 3.915-.619z"
                                                                            ></path>
                                                                        </svg>
                                                                        <span>{list.likeNum}</span>
                                                                    </li>
                                                                    <li className="community_text_list_react comment">
                                                                        <svg
                                                                        width="18" height="18"
                                                                        viewBox="0 0 18 18"
                                                                        >
                                                                            <path
                                                                            fill="#666"
                                                                            transform="matrix(-1 0 0 1 18 0)"
                                                                            d="M9 1c4.377 0 8 3.14 8 7s-3.623 7-8 7c-.317 0-.593-.026-.954-.088l-.395-.074-.205-.043-3.295 2.089a.75.75 0 0 1-.968-.143l-.067-.09a.75.75 0 0 1 .143-.968l.09-.067 3.55-2.25a.75.75 0 0 1 .551-.1l.652.132.301.052c.228.036.408.05.597.05 3.592 0 6.5-2.52 6.5-5.5S12.592 2.5 9 2.5C5.407 2.5 2.5 5.02 2.5 8c0 1.858 1.039 3.573 2.773 4.348a.75.75 0 1 1-.612 1.37C2.37 12.693 1 10.432 1 8c0-3.86 3.622-7 8-7z"
                                                                            ></path>
                                                                        </svg>
                                                                        <span>{list.commentNum}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </Link>
                                                ))
                                            }

                                        </ul>
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