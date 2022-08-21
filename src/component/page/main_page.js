import Header from "../common/header"
import Footer from "../common/footer"
import Slider from "../common/slider"

import axios from "axios";

import { useEffect, useState } from "react";

function SectionList(props){
    const img_src = props.img_src;
    return (
        <li className="section_list">
            <div className="section_list_img">
                <img src = {img_src} alt="" />
            </div>
            <div className="section_list_title">
                NFT로 음악시장 뒤집기 위해 총대 멨다는 래퍼 화지
            </div>
            <div className="section_list_desc">
                이 시국에 조심스럽지만 난 무인양품을 좋아한다. 부모님 집에 얹혀살던 캥거루 시절 무인양품에 대한 이미지를 한마디로 정의하면 디자인은 평범한데 가격은 더럽게 비싼 생활용품샵이었다. 그 생각이 깨지게 된 건 독립을 하면서부터였는데 그때까지 몰랐던 것들이 하나둘 눈에 보이기 시작했다. 통일된 디자인, 제품끼리 호환이 가능한 유닛 구조 가구, 제품 하나하나에 담
            </div>
            <div className="section_list_writer_wrap">
                <img
                className="section_list_writer_img"
                src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Ft1.daumcdn.net%2Fbrunch%2Fstatic%2Ficon%2Fios%2Ficon120.png&w=60&q=90"
                alt = ""
                 />
                <div className="section_list_writer">
                    서점직원
                </div>
            </div>
        </li>
    )
}
function Section(props){
    const title = props.title;
    const category = props.category;
    const list_style = props.list_style;

    const move_std = -100;
    const move_ani = 0.3;
    const [right_move_check, set_right_move_check] = useState(0);
    
    const [arrowboxRight, setArrowboxRight] = useState("section_category_arrow_box right")
    const [arrowboxLeft, setArrowboxLeft] = useState("section_category_arrow_box left hidden")
    
    const category_move_right = () => {
        if(right_move_check < 3){
            set_right_move_check(right_move_check + 1)
        }
        if(right_move_check === 0){
            setArrowboxLeft("section_category_arrow_box left")
        }
        if(right_move_check === 2){
            setTimeout(() => {
                setArrowboxRight("section_category_arrow_box right hidden")
            }, move_ani * 1000);
        }
    }
    const category_move_left = () => {
        if(right_move_check > 0){
            set_right_move_check(right_move_check - 1)
        }
        if(right_move_check === 3){
            setArrowboxRight("section_category_arrow_box right")
        }
        if(right_move_check === 1){
            setTimeout(() => {
                setArrowboxLeft("section_category_arrow_box left hidden")
            }, move_ani * 1000);
        }
    }

    return (
        <div className='section'>
        <div className='section_wrap'>
            <div className="section_title">
                <span>{title}</span>
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
                            <li className="section_category_list current">
                                인간관계
                            </li>
                            <li className="section_category_list">
                                라이프스타일
                            </li>
                            <li className="section_category_list">
                                커리어고민
                            </li>
                            <li className="section_category_list">
                                IT/기술
                            </li>
                            <li className="section_category_list">
                                취업/이직
                            </li>
                            <li className="section_category_list">
                                조직문화
                            </li>
                            <li className="section_category_list">
                                회사생활
                            </li>
                            <li className="section_category_list">
                                리더십
                            </li>
                            <li className="section_category_list">
                                경영/전략
                            </li>
                            <li className="section_category_list">
                                데이터
                            </li>
                        </ul>
                    </div>
                    <div className={arrowboxLeft}>
                        <div
                        className="section_category_arrow left"
                        onClick={category_move_left}
                        ></div>
                    </div>
                    <div className={arrowboxRight}>
                        <div
                        className="section_category_arrow right"
                        onClick={category_move_right}
                        ></div>
                    </div>

                    <div className="section_category_btn"></div>
                </div>
                :null
            }
            {
                list_style === "many"
                ?<ul className="section_lists many">
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2321%2F3443ba14.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2329%2F59d03728.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2322%2Fc69d9139.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2346%2Fce1dc609.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2321%2F3443ba14.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2329%2F59d03728.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2322%2Fc69d9139.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2346%2Fce1dc609.jpg&w=800&q=75" />
                </ul>
                :list_style === "four"
                ?<ul className="section_lists">
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2321%2F3443ba14.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2329%2F59d03728.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2322%2Fc69d9139.jpg&w=800&q=75" />
                    <SectionList img_src = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2346%2Fce1dc609.jpg&w=800&q=75" />
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

function SectionButton(){
    return (
        <div className='section_button'>
            직군/직무를 입력하면 관련 콘텐츠를 추천해드려요👀
        </div>
    )
}

function PageMain(){
    const url = "https://prod.serverhwan.shop";
    const [slide_img_list, set_slide_img_list] = useState([]);
    const homeView = async() => {
        try {
            const data = await axios({
                method : "get",
                url: `${url}/home?homecategoryIdx=1`
            });
            console.log(data.data.result);
            set_slide_img_list(data.data.result.bannerList)

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
                category = {true}
                list_style = "many"
                 />
                 
                <CreateBaner />
                
                <Section
                title = "3분만에 읽는 Wanted+ 아티클"
                list_style = "four"
                />

                <div className='section_bar'></div>

                <Section
                title = "직장인을 위한 Wanted+ VOD"
                list_style = "four"
                />

                <SectionButton />

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

