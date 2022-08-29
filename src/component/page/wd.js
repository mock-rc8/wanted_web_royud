import Header from "../common/header"
import Footer from "../common/footer"

import { nowPage } from "../../recoil/recoil"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"

export default function WdPage(props){
    const [nowPaged, set_nowPaged] = useRecoilState(nowPage);
    useEffect(() => {
        set_nowPaged("/wd")
    }, [])
    // -----------------------------------------------------------------

    const { idx } = useParams()
    const [company_img_lists, set_company_img_lists] = useState([]);
    const [company_name, set_company_name] = useState("");
    const [company_employment, set_company_employment] = useState("");
    const [company_tag, set_company_tag] = useState([]);
    const [emp_desc, set_emp_desc] = useState(``);
    const [applicant_money, set_applicant_money] = useState("");
    const [recommend_money, set_recommend_money] = useState("");
    const [emp_skill, set_emp_skill] = useState([]);
    const [emp_deadline, set_emp_deadline] = useState("");
    const [emp_location, set_emp_location] = useState("");

    const url = "https://prod.serverhwan.shop"
    const company_data = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/employments/3/${idx}`,
                header: {
                    companyIdx : idx
                }
            })
            console.log(data.data.result);
            set_company_img_lists(data.data.result.employmentImg);
            set_company_name(data.data.result.companyEmpInfo.companyName)
            set_company_employment(data.data.result.empDetail.employment)
            set_company_tag(data.data.result.tag)
            set_emp_desc(data.data.result.empDetail.introduce)
            set_applicant_money(data.data.result.empDetail.applicant);
            set_recommend_money(data.data.result.empDetail.recommend);
            set_emp_skill(data.data.result.skill)
            set_emp_deadline(data.data.result.empDetail.deadline)
            set_emp_location(data.data.result.empDetail.location);
        }
        catch(err){

        }
    }
    useEffect(() => {
        company_data();
    }, [idx])
    // -----------------------------------------------------------------
    const lists_box = useRef();
    const [slideIdx, set_slideIdx] = useState(0);
    const slideFinish = company_img_lists.length - 1;
    const slide_std = 700;
    const [scrollLeft, setscrollLeft] = useState(0);

    const company_img_lists_right_move = () => {
        if(slideIdx < slideFinish){
            set_slideIdx(slideIdx + 1)
        }
    }
    const company_img_lists_left_move = () => {
        if(slideIdx > 0){
            set_slideIdx(slideIdx - 1)
        }
    }
    const slide_scrolled = () => {
        const scrolled = lists_box.current.scrollLeft;
        
        // setscrollLeft(scrolled)
        // if(0 < scrollLeft < 350){
        //     set_slideIdx(0)
        // } else if(350 < scrollLeft < 1050){
        //     set_slideIdx(1)
        // }
    
    }
    useEffect(() => {


        lists_box.current.scrollTo({
            left: slide_std * slideIdx,
            behavior: "smooth"
        })

    }, [slideIdx, scrollLeft])
    // -----------------------------------------------------------------
    return (
        <div className="WdPage">
            <Header />

            <div className="main_page">
                <div className="main_page_wrap">
                    <div className="company_detail_wrap">
                        <div className="company_detail_left">
                            <div
                            className="company_img_lists_box">
                                <button
                                className="company_img_lists_btn left"
                                onClick={company_img_lists_left_move}
                                >
                                    <div className="company_img_lists_btn_ico">
                                        <svg
                                        width="26" height = "26"
                                        >
                                            <path
                                            fill="#b5b5b5"
                                            d = "m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"
                                            ></path>
                                        </svg>
                                    </div>
                                </button>
                                <button
                                className="company_img_lists_btn right"
                                onClick={company_img_lists_right_move}
                                >
                                <div className="company_img_lists_btn_ico">
                                    <svg
                                    width="26" height = "26"
                                    >
                                        <path
                                        fill="#b5b5b5"
                                        d = "m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"
                                        ></path>
                                    </svg>
                                </div>
                                </button>
                                <div className="company_img_slide"
                                ref={lists_box}
                                onScroll = {slide_scrolled}
                                >
                                    <ul
                                    className="company_img_lists"
                                    style={{
                                        width: `${company_img_lists.length * 700}px`,
                                    }}
                                    >
                                        {
                                            company_img_lists.map((slide) => (
                                                <li
                                                key={slide.employmentImgIdx}
                                                className="company_img_list"
                                                style={{backgroundImage: `url(${slide.employmentImg})`}}
                                                ></li>
                                            ))
                                        }
                                    </ul>
                                </div>

                            </div>
                            <div className="company_employ_title_wrap">
                                <div className="company_employ_title">
                                    {company_employment}
                                </div>
                                <div className="company_employ_sub_wrap">
                                    <div className="company_employ_sub_companyname">
                                        {company_name}
                                    </div>
                                    <button className="company_list_tag">
                                        응답률 매우 높음
                                    </button>
                                    <div className="company_employ_sub_location">
                                        서울 · 한국
                                    </div>
                                </div>
                                <ul className="company_employ_sub_tag_lists">
                                    {
                                        company_tag.map((list) => (
                                            <li
                                            key={list.tagIdx}
                                            className="company_employ_sub_tag_list">
                                                {list.tag}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="company_employ_desc">
                                {
                                    emp_desc.split('\n').map((line) => (
                                        <p
                                        key={Math.random()}
                                        >{line}<br /></p>
                                    ))
                                }
                                <div className="company_employ_skill_title">
                                    기술 스택 · 툴
                                </div>
                                <ul className="company_employ_skill_lists">
                                    {
                                        emp_skill.map(list => (
                                            <li
                                            key={list.skillIdx}
                                            className="company_employ_skill_list">
                                            {list.skill}
                                        </li>
                                        ))
                                    }

                                </ul>
                            </div>
                            <div className="company_employ_location">
                                    <ul className="company_employ_location_lists">
                                        <li className="company_employ_location_list">
                                            <span className="company_employ_location_menu">
                                                마감일
                                            </span>
                                            <span className="company_employ_location_desc">
                                                {emp_deadline}
                                            </span>
                                        </li>
                                        <li className="company_employ_location_list">
                                            <span className="company_employ_location_menu">
                                                근무지역
                                            </span>
                                            <span className="company_employ_location_desc">
                                                {emp_location}
                                            </span>
                                        </li>
                                    </ul>
                                    <img
                                    src="/images/company_location_map.png"
                                    alt=""
                                    />
                                    <div className="company_employ_introduce_wrap">
                                        <div className="company_employ_introduce">
                                            <div
                                            className="company_employ_introduce_logo"
                                            style={{backgroundImage: `url("https://static.wanted.co.kr/images/wdes/0_5.bdb4c73f.jpg")`}}></div>
                                            <div>
                                                <div className="company_employ_introduce_name">
                                                    {company_name}
                                                </div>
                                                <div className="company_employ_introduce_sub">
                                                    IT, 컨텐츠
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="company_detail_right">
                            <div className="company_detail_right_box">
                              <div className="company_detail_box_title">
                                채용보상금
                              </div>
                              <ul className="company_detail_box_lists">
                                <li className="company_detail_box_list">
                                    <div className="company_detail_box_list_title">
                                        추천인
                                    </div>
                                    <div className="company_detail_box_list_desc">
                                        {applicant_money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                </li>
                                <li className="company_detail_box_list">
                                    <div className="company_detail_box_list_title">
                                        지원자
                                    </div>
                                    <div className="company_detail_box_list_desc">
                                        {recommend_money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                </li>
                              </ul>

                            </div>
                        </div>
                    </div>
                    <div className="company_detail_lists">
                        
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}