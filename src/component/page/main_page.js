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
                                d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745" transform="translate(1 1)"
                                ></path>
                                <path
                                fill="#999"
                                d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671"
                                transform="translate(1 1) rotate(-180 7.053 10.408)"
                                ></path>
                                <path
                                stroke="#999"
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
                        <path
                        d="M2 0C2.828 0 3.5 0.672 3.5 1.5C3.5 2.328 2.828 3 2 3C1.172 3 0.5 2.328 0.5 1.5C0.5 0.672 1.172 0 2 0ZM8 0C8.828 0 9.5 0.672 9.5 1.5C9.5 2.328 8.828 3 8 3C7.172 3 6.5 2.328 6.5 1.5C6.5 0.672 7.172 0 8 0ZM14 0C14.828 0 15.5 0.672 15.5 1.5C15.5 2.328 14.828 3 14 3C13.172 3 12.5 2.328 12.5 1.5C12.5 0.672 13.172 0 14 0Z" fill="currentColor"></path>
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
                        <div className="section_list_desc_box">
                            <svg
                            viewBox="0 0 32 32">
                                <path
                                d = "M27.96 29.374a1 1 0 1 0 1.414-1.414l-8.667-8.667-.338-.294a1 1 0 0 0-1.357.05 9 9 0 1 1 2.24-3.676 1 1 0 1 0 1.909.6 11.01 11.01 0 0 0 .506-3.306c0-6.076-4.925-11-11-11-6.076 0-11 4.924-11 11 0 6.074 4.925 11 11 11 2.615 0 5.087-.918 7.04-2.549l8.253 8.256z"
                                ></path>
                            </svg>
                            <div className="section_list_title">
                                채용공고
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_box">
                            <svg
                            viewBox="0 0 32 32">
                                <path
                                d = "M18.812 14.36c-.722.917-1.172 1.905-1.188 2.959-.023 1.658.907 2.901 2.613 3.605l.132.044c3.985 1.027 6.615 3.38 6.615 5.748L27 28.118c0 .03-.222.215-.4.215H5.33c-.157 0-.314-.14-.314-.203L5 26.705c0-2.283 2.384-4.493 6.185-5.564.349-.079.896-.273 1.458-.616.885-.54 1.504-1.297 1.654-2.301a1 1 0 1 0-1.978-.296c-.05.333-.293.63-.719.89-.345.21-.703.338-.909.385C6.075 20.503 3 23.353 3 26.716l.016 1.426c0 1.214 1.103 2.191 2.313 2.191h21.272c1.213-.002 2.399-.995 2.399-2.226l-.016-1.403c0-3.432-3.313-6.414-8.044-7.654-.944-.404-1.327-.932-1.316-1.702.008-.541.284-1.147.76-1.75.31-.394.622-.691.81-.84l.1-.092c1.409-1.474 2.319-3.428 2.319-5.333 0-4.169-3.488-7.666-7.648-7.666-4.158 0-7.647 3.498-7.647 7.666 0 1.795.506 3.33 1.55 4.628a1 1 0 1 0 1.558-1.255c-.748-.93-1.108-2.02-1.108-3.373 0-3.065 2.595-5.666 5.647-5.666 3.054 0 5.648 2.6 5.648 5.666 0 1.329-.67 2.786-1.722 3.906a7.46 7.46 0 0 0-1.079 1.122z"
                                ></path>
                            </svg>
                            <div className="section_list_title">
                                내 프로필
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_box">
                            <svg
                            viewBox="0 0 32 32">
                                <path
                                d = "M11.667 28.667a1 1 0 0 1-1-1v-7h-2v7a1 1 0 0 1-1 1H2.333a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1H17a1 1 0 0 1 1 1v4.333h11a1 1 0 0 1 .993.884l.007.116v12a1 1 0 1 1-2 0v-11H18v15.334h11a1 1 0 1 1 0 2H11.667zM16 6H3.333v20.667h3.334v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7H16V6zm5 12.333c.736 0 1.333.597 1.333 1.334V21a1.333 1.333 0 1 1-2.666 0v-1.333c0-.737.597-1.334 1.333-1.334zM21 13c.736 0 1.333.597 1.333 1.333v1.334a1.333 1.333 0 1 1-2.666 0v-1.334c0-.736.597-1.333 1.333-1.333zM8 13a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.667a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1H8zm0-5.333a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.667a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1H8z"
                                ></path>
                            </svg>
                            <div className="section_list_title">
                                매치업
                            </div>
                        </div>
                    </li>
                    <li className="employment_list">
                        <div className="section_list_desc_box">
                            <svg
                            viewBox="0 0 32 32">
                                <path
                                d = "M10.667 21.667a3.67 3.67 0 0 1 3.528 2.666H28a1 1 0 0 1 0 2l-13.805.001a3.67 3.67 0 0 1-7.057 0H4a1 1 0 1 1 0-2h3.138a3.67 3.67 0 0 1 3.529-2.667zm0 2a1.668 1.668 0 0 0 0 3.333 1.668 1.668 0 0 0 0-3.333zm10.666-11.334A3.67 3.67 0 0 1 24.862 15H28a1 1 0 0 1 0 2h-3.138a3.67 3.67 0 0 1-7.057 0H4a1 1 0 0 1 0-2h13.805a3.67 3.67 0 0 1 3.528-2.667zm0 2a1.668 1.668 0 0 0 0 3.334 1.668 1.668 0 0 0 0-3.334zM10.667 3a3.67 3.67 0 0 1 3.528 2.666H28a1 1 0 0 1 0 2H14.195a3.67 3.67 0 0 1-7.057 0H4a1 1 0 1 1 0-2h3.138A3.67 3.67 0 0 1 10.667 3zm0 2a1.668 1.668 0 0 0 0 3.333 1.668 1.668 0 0 0 0-3.333z"
                                ></path>
                            </svg>
                            <div className="section_list_title">
                                직군별 연봉
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
                            <div className="subscribe_promotion_title">
                                <div className="subscribe_promotion_title_svg">
                                    <svg
                                    viewBox="0 0 160 31"
                                    >
                                        <path
                                        d = "M0.140625 10.0156L6.11719 29H11.4258L15.5391 16.5547L19.6172 29H24.9609L30.9375 10.0156H25.6289L22.1133 21.8984L18.2461 10.0156H12.7969L8.92969 21.8984L5.41406 10.0156H0.140625ZM46.5469 29H51.6094V10.0156H46.5469V11.9844C45.1758 10.2441 43.1895 9.3125 40.6406 9.3125C35.2969 9.3125 31.4121 13.6016 31.4297 19.5078C31.4121 25.4141 35.2969 29.7031 40.6406 29.7031C43.1895 29.7031 45.1758 28.7891 46.5469 27.0664V29ZM36.4922 19.5078C36.4746 16.2559 38.6016 13.8828 41.5547 13.8828C44.543 13.8828 46.5117 16.0977 46.5469 19.5078C46.5117 22.918 44.543 25.1328 41.5547 25.1328C38.6016 25.1328 36.4746 22.7598 36.4922 19.5078ZM60.0469 29V17.75C60.082 15.7285 61.6289 14.0234 63.7383 14.0234C66.041 14.0234 67.2188 15.5527 67.2188 18.1719V29H72.2812V16.7656C72.2812 12.125 69.6445 9.3125 65.5312 9.3125C63.2285 9.3125 61.3125 10.4023 60.0469 12.1953V10.0156H54.9844V29H60.0469ZM86.6602 10.0156H82.8633V3.72266L77.8008 5.76172V10.0156H74.3906V14.5156H77.8008V22.7422C77.8008 28.1035 81.3867 30.2305 86.6602 29.1758V24.5352C83.7949 25.0801 82.8633 24.1836 82.8633 22.7422V14.5156H86.6602V10.0156ZM89.1211 19.5078C89.1211 25.4141 93.2871 29.7031 99 29.7031C103.078 29.7031 106.418 27.5762 108.035 23.832L103.148 22.6367C102.34 24.2012 100.881 25.1328 99 25.1328C96.4863 25.1328 94.7285 23.4805 94.2891 20.8438H108.809C108.844 20.4043 108.879 19.9648 108.879 19.5078C108.861 13.6016 104.713 9.3125 99 9.3125C93.2871 9.3125 89.1211 13.6016 89.1211 19.5078ZM94.5176 17.3281C94.834 15.377 96.4688 13.8828 99 13.8828C101.496 13.8828 103.113 15.377 103.465 17.3281H94.5176ZM130.746 29V0.804688L125.684 2.84375V11.9844C124.312 10.2441 122.326 9.3125 119.777 9.3125C114.434 9.3125 110.549 13.6016 110.566 19.5078C110.549 25.4141 114.434 29.7031 119.777 29.7031C122.326 29.7031 124.312 28.7891 125.684 27.0664V29H130.746ZM115.629 19.5078C115.611 16.2559 117.738 13.8828 120.691 13.8828C123.68 13.8828 125.648 16.0977 125.684 19.5078C125.648 22.918 123.68 25.1328 120.691 25.1328C117.738 25.1328 115.611 22.7598 115.629 19.5078ZM148.148 16.4141H141.363V20.3164H148.148V27.3828H152.191V20.3164H159.012V16.4141H152.191V9.41797H148.148V16.4141Z"
                                        ></path>
                                    </svg>
                                </div>
                                구독해야 하는 이유
                            </div>
                            <div className="subscribe_promotion_comment">
                                구독자의 서류 합격률이 비구독자보다 1.5배 높아요!
                            </div>
                            <button
                            className="subscribe_promotion_btn"
                            >
                                첫 구독 0원 신청하기
                            </button>
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

