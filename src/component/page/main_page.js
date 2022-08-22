import Header from "../common/header"
import Footer from "../common/footer"
import Slider from "../common/slider"
import SectionButton from "../common/sectionBtn";

import axios from "axios";
import slideBox from "../../db/slide.json"

import { useEffect, useState } from "react";

function SectionList(props){
    const title = props.title;
    const content = props.content;
    const creator = props.creator;
    const creatorImg = props.creatorImg;

    const img_src = props.img_src;
    return (
        <li className="section_list">
            <div className="section_list_img">
                <img src = {img_src} alt="" />
            </div>
            <div className="section_list_title">
                {title}
            </div>
            <div className="section_list_desc">
                {content}
            </div>
            <div className="section_list_writer_wrap">
                <img
                className="section_list_writer_img"
                src={creatorImg}
                alt = ""
                 />
                <div className="section_list_writer">
                    {creator}
                </div>
            </div>
        </li>
    )
}
function Section(props){
    const title = props.title;
    const title_ico = props.title_ico;
    const category = props.category;
    const list_style = props.list_style;
    const section_list_data = props.section_list_data;

    const move_std = -100;
    const move_ani = 0.3;
    const [right_move_check, set_right_move_check] = useState(0);
    
    const [arrowboxRight, setArrowboxRight] = useState("section_category_arrow_box right")
    const [arrowboxLeft, setArrowboxLeft] = useState("section_category_arrow_box left hidden")
    
    const category_move_right = () => {
        if(right_move_check < 2){
            set_right_move_check(right_move_check + 1)
        }
        if(right_move_check === 0){
            setArrowboxLeft("section_category_arrow_box left")
        }
        if(right_move_check === 1){
            setTimeout(() => {
                setArrowboxRight("section_category_arrow_box right hidden")
            }, move_ani * 1000);
        }
    }
    const category_move_left = () => {
        if(right_move_check > 0){
            set_right_move_check(right_move_check - 1)
        }
        if(right_move_check === 2){
            setArrowboxRight("section_category_arrow_box right")
        }
        if(right_move_check === 1){
            setTimeout(() => {
                setArrowboxLeft("section_category_arrow_box left hidden")
            }, move_ani * 1000);
        }
    }

    const btn_Active = (e) => {
        const E_tar = e.target
        const parEl = E_tar.parentNode;
        const parChi = parEl.children;
        const idx = Array.from(parChi).indexOf(E_tar)



        console.log(idx);
    }
    return (
        <div className='section'>
        <div className='section_wrap'>
            <div className="section_title">
                <span>
                    {title}
                    {
                        title_ico
                        ?<svg
                        width= "24"
                        height="24"
                        viewBox="0 0 17 17"
                        >
                            <g fill = "none">
                                <path
                                stroke="#999"
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                                stroke-width="1.2"
                                d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745" transform="translate(1 1)"
                                ></path>
                                <path
                                fill="#999"
                                d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671"
                                transform="translate(1 1) rotate(-180 7.053 10.408)"
                                ></path>
                                <path
                                stroke="#999"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.2"
                                d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783"
                                transform="translate(1 1)"
                                ></path>
                            </g>
    
                        </svg>
                        :null
                    }

                </span>
            </div>
            {
                category
                ?<div className="section_category">
                    <div className="section_category_box">
                        <ul
                        className="section_category_lists"
                        style={{
                            transform : `translateX(${right_move_check * move_std}px)`,
                            transition : `transform ${move_ani}s`
                        }}
                        >
                            {
                                category.map((list) => (
                                    list.homecategoryIdx === 1
                                    ?<li
                                    className="section_category_list current"
                                    key={list.homecategoryIdx}
                                    onClick = {(e) => btn_Active(e)}
                                    >
                                        {list.homecategory}
                                    </li>
                                    :<li
                                    className="section_category_list"
                                    key={list.homecategoryIdx}
                                    onClick = {(e) => btn_Active(e)}
                                    >
                                        {list.homecategory}
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
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C2.828 0 3.5 0.672 3.5 1.5C3.5 2.328 2.828 3 2 3C1.172 3 0.5 2.328 0.5 1.5C0.5 0.672 1.172 0 2 0ZM8 0C8.828 0 9.5 0.672 9.5 1.5C9.5 2.328 8.828 3 8 3C7.172 3 6.5 2.328 6.5 1.5C6.5 0.672 7.172 0 8 0ZM14 0C14.828 0 15.5 0.672 15.5 1.5C15.5 2.328 14.828 3 14 3C13.172 3 12.5 2.328 12.5 1.5C12.5 0.672 13.172 0 14 0Z" fill="currentColor"></path>
                    </svg>
                    </div>
                </div>
                :null
            }
            {
                list_style === "many"
                ?<ul className="section_lists many">
                    {
                        section_list_data.map((list) => (
                            <SectionList
                            key = {list.contentIdx}
                            content = {list.content}
                            img_src = {list.imageUrl}
                            title = {list.title}
                            creator = {list.creator}
                            creatorImg = {list.creatorImg}
                            />
                        ))
                    }
                </ul>
                :list_style === "four"
                ?<ul className="section_lists">
                    {
                        section_list_data.map((list) => (
                            <SectionList
                            key = {list.contentIdx}
                            content = {list.content}
                            img_src = {list.imageUrl}
                            title = {list.title}
                            creator = {list.creator}
                            creatorImg = {list.creatorImg}
                            />
                        ))
                    }
                </ul>
                :list_style === "two"
                ?<ul className="section_lists">
                    <li className="section_list big">
                        <div className="section_list_img">
                            <img
                            src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2125%2Fe0212780.jpg&w=1200&q=100"
                            alt=""
                            />
                        </div>
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                    <li className="section_list big">
                        <div className="section_list_img">
                            <img
                            src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2113%2F8082560a.jpg&w=1200&q=100"
                            alt=""
                            />
                        </div>
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                </ul>
                :list_style === "another"
                ?<ul className="employment_lists">
                    <li className="employment_list">
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_wrap">
                            <div className="section_list_tag">
                                <span>네트워킹</span>
                            </div>
                            <div className="section_list_title">
                                일 잘-하는 마케터의 팔로잉 리스트
                            </div>
                        </div>
                    </li>
                </ul>
                :null
            }

        </div>
    </div>
    )
}

function CreateBaner(){
    return (
        <div className='creater_baner'>
            <div className="creater_baner_wrap">
                <div className="creater_baner_comment">
                    즐겨보는 <span>크리에이터의</span> 글도 추천하고 싶다면?
                </div>
                <div className="creater_baner_img">
                    <img
                    src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fimage.wanted.co.kr%2Fuserweb%2Fcareerhome%2Fcreator-application.png&w=121&q=75"
                    alt=""
                    />
                </div>
                <div className="creater_baner_btn">
                    크리에이터 추천하기
                </div>
            </div>
        </div>
    )
}

function PageMain(){
    const url = "https://prod.serverhwan.shop";

    const [slide_img_list, set_slide_img_list] = useState(slideBox);

    const [section_category, set_section_category] = useState([]);
    const [section_list_data, set_section_list_data] = useState([]);


    const homeView = async() => {
        try {
            const data = await axios({
                method : "get",
                url: `${url}/home?homecategoryIdx=1`
            });
            const bannerList = data.data.result.bannerList
            set_slide_img_list(bannerList)
            set_section_category(data.data.result.categoryList)
            set_section_list_data(data.data.result.contents)
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        homeView();
    }, [])

    return (
        <main>
            <div className='main_page'>

                <Slider slide_img_list = {slide_img_list} />

                <Section
                title = "나에게 필요한 커리어 인사이트"
                title_ico = "true"
                category = {section_category}
                list_style = "many"
                section_list_data = {section_list_data}
                 />
                 
                <CreateBaner />
                
                <Section
                title = "3분만에 읽는 Wanted+ 아티클"
                list_style = "four"
                section_list_data = {section_list_data}
                />

                <div className='section_bar'></div>

                <Section
                title = "직장인을 위한 Wanted+ VOD"
                list_style = "four"
                section_list_data = {section_list_data}
                />

                <SectionButton
                desc = "직군/직무를 입력하면 관련 콘텐츠를 추천해드려요👀"
                />

                <Section
                title = "커리어 성장을 위한 맞춤 이벤트"
                list_style = "two"
                />

                <div className='subscribe_promotion'>
                    <div className="subscribe_promotion_wrap">
                        <div className="subscribe_promotion_desc">

                        </div>
                        <img
                        className="subscribe_promotion_img"
                        height="158"
                        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fimage.wanted.co.kr%2Fuserweb%2Fcareerhome%2Ffirst-wantedplus-subscribe.png&w=800&q=90"
                        alt=""
                        />
                    </div>
                </div>

                <Section
                title = "채용 정보를 찾고 계셨나요?"
                list_style = "another"
                />

            </div>
    </main>
    )
}

export default function MainPage(){
    return(
        <div className="Mainpage">
            <Header />
            <PageMain />
            <Footer />
        </div>
    )
}

