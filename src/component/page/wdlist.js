import Header from "../common/header"
import Footer from "../common/footer"
import axios from "axios"

import { nowPage } from "../../recoil/recoil"
import { useRecoilState, useRecoilValue } from "recoil"

import CompanyList from "../common/company_list"
import { isLogin } from "../../recoil/recoil"

import { useEffect, useState } from "react"

export default function WdListPage(){
    const [nowPaged, set_nowPaged] = useRecoilState(nowPage);

    useEffect(()=> {
        set_nowPaged("/wdlist")
    }, [])
    // --------------------------------------------------
    const [jobcategory_lists_Active, set_jobcategory_lists_Active] = useState("jobcategory_lists")
    const [dutycategory_lists_Active, set_dutycategory_lists_Active] = useState("duty_category_lists")
    
    const [category_btn, set_category_btn] = useState("category_select_main_btn")
    const [sub_category_btn, set_sub_category_btn] = useState("category_select_main_btn")
    const jobCategory_list_on = () => {
        switch(jobcategory_lists_Active){
            case "jobcategory_lists":
                set_jobcategory_lists_Active("jobcategory_lists Active");
                set_category_btn("category_select_main_btn Active")
                break;
            case "jobcategory_lists Active":
                set_jobcategory_lists_Active("jobcategory_lists");
                set_category_btn("category_select_main_btn")
                break;
            default:
                break;
        }
    }
    const dutycategory_lists_on = () => {
        switch(dutycategory_lists_Active){
            case "duty_category_lists":
                set_dutycategory_lists_Active("duty_category_lists Active");
                set_sub_category_btn("category_select_main_btn Active")
                break;
            case "duty_category_lists Active":
                set_dutycategory_lists_Active("duty_category_lists");
                set_sub_category_btn("category_select_main_btn")
                break;
            default:
                break;
        }
    }
    const [jobIdx, setjobIdx] = useState(1);
    const [dutyIdx, setdutyIdx] = useState(23);

    const jobIdx_1 = () => {
        setjobIdx(1);
        setdutyIdx(23);
        jobCategory_list_on()
    }
    const jobIdx_2 = () => {
        setjobIdx(2);
        setdutyIdx(23);
        jobCategory_list_on()
    }
    const dutyIdx_23 = () => {
        setdutyIdx(23);
        dutycategory_lists_on()
    }
    const dutyIdx_1 = () => {
        setdutyIdx(1);
        dutycategory_lists_on()
    }
    // --------------------------------------------------

    const url = "https://prod.serverhwan.shop";
    const [company_list, set_company_list] = useState([]);
    const [searchCaegories, set_searchCaegories] = useState([]);
    const [jobCategory, set_jobCategory] = useState("");
    const [dutyCategory, set_dutyCategory] = useState("");
    const [act_company_list, set_act_company_list] = useState([])
    const isLogined = useRecoilValue(isLogin);

    const WdListView = async() => {
        try {
            const data = await axios({
                method: "get",
                url : `${url}/positions?jobIdx=${jobIdx}&dutyIdx=${dutyIdx}`
            })
            set_company_list(data.data.result.employmentList)
            set_dutyCategory(data.data.result.dutyCategory.duty)
            set_jobCategory(data.data.result.jobCategory.job)
            set_searchCaegories(data.data.result.searchCaegories)
            set_act_company_list(data.data.result.companyList);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        WdListView();
        console.log(act_company_list);
    }, [isLogined, jobIdx, dutyIdx ])
    // --------------------------------------------------
    const [select_head, set_select_head] = useState("category_select_another")

    const select_fixed = () => {
        const scrolled = document.documentElement.scrollTop;
        if(scrolled > 100){
            set_select_head("category_select_another fixed")
        } else if(scrolled < 100){
            set_select_head("category_select_another")
        }
    }
    document.addEventListener("scroll", select_fixed)
    // --------------------------------------------------

    // --------------------------------------------------
    return (
        <div className="WdListPage">
            <Header />

            <div className="category_select">
                <div className="category_select_wrap">
                    <button
                    className="category_select_main"
                    onClick={jobCategory_list_on}
                    >
                        <span>{jobCategory}</span>
                        <div className= {category_btn}>
                            <svg
                            width="12" height = "12"
                            viewBox="0 0 12 12"
                            >
                                <path
                                fill = "#767676"
                                d = "M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"
                                ></path>
                            </svg>
                        </div>
                    </button>
                    <ul
                    className={jobcategory_lists_Active}
                    >
                        <li
                        className="jobcategory_list"
                        onClick={jobIdx_1}
                        >
                            전체
                        </li>
                        <li
                        className="jobcategory_list"
                        onClick={jobIdx_2}
                        >
                            개발
                        </li>
                    </ul>
                    <div className="category_select_bar"></div>
                    <div className="category_select_detail">
                        {
                        jobIdx === 1
                        ?dutyCategory
                        :<button
                        className="category_select_sub"
                        onClick={dutycategory_lists_on}
                        >
                            <span>{dutyCategory}</span>
                            <div className={sub_category_btn}>
                                <svg
                                width="12" height = "12"
                                viewBox="0 0 12 12"
                                >
                                    <path
                                    fill = "#767676"
                                    d = "M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                        }
                    </div>
                    <ul
                    className={dutycategory_lists_Active}
                    >
                        <li
                        className="jobcategory_list"
                        onClick={dutyIdx_23}
                        >
                            개발 전체
                        </li>
                        <li
                        className="jobcategory_list"
                        onClick={dutyIdx_1}
                        >
                            웹 개발자
                        </li>
                    </ul>
                </div>
            </div>
            <div className={select_head}>
                <div className="category_select_another_wrap">
                    <div className="category_select_another_top">
                        <button className="category_select_another_btn">
                            <span className="category_select_menu">지역</span>
                            <span className="category_select_choice">한국</span>
                        </button>
                        <button className="category_select_another_btn">
                            <span className="category_select_menu">경력</span>
                            <span className="category_select_choice">전체</span>
                            <svg
                            width="8" height="7"
                            viewBox="0 0 8 7"
                            >
                                <path
                                d = "M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z"
                                ></path>
                            </svg>
                        </button>
                        <button className="category_select_another_btn">
                            <span>기술스택</span>
                            <svg
                            width="8" height="7"
                            viewBox="0 0 8 7"
                            >
                                <path
                                d = "M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="category_select_another_bottom">
                        <ul className="category_select_bottom_lists">
                            {
                                searchCaegories.map((list) => (
                                    <li
                                    className="category_select_bottom_list"
                                    key={list.categoryIdx}
                                    >
                                        {list.type}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="company_list_main">
                <div className="company_list_main_wrap">
                    <button className="my_book_mark">
                        <svg
                        width="11" height="14"
                        viewBox="0 0 13 17"
                        >
                            <path
                            fill="#36f"
                            d= "M6.25 13.21L.905 16.22c-.403.228-.905-.06-.905-.517V.596C0 .267.27 0 .605 0h11.29c.334 0 .605.267.605.596v15.107c0 .458-.502.745-.905.518L6.25 13.209z"
                            ></path>
                        </svg>
                        <span>북마크 모아보기</span>
                        <svg
                        width="12" height = "12"
                        viewBox="0 0 12 12"
                        >
                            <path
                            fill="#36f"
                            d = "M4.22 9.72a.75.75 0 001.06 1.06l4.25-4.25a.75.75 0 000-1.06L5.28 1.22a.75.75 0 00-1.06 1.06L7.94 6 4.22 9.72z"
                            ></path>
                        </svg>
                    </button>
                    {
                        isLogined
                        ?<div className="actively_employ_company_wrap">
                            <div className="actively_employ_company_title">
                                적극 채용 중인 회사
                            </div>
                            <ul className="actively_employ_company_lists">
                                {
                                    act_company_list.map((list) => (
                                        <li
                                        key = {list.companyIdx}
                                        className="actively_employ_company_list">
                                            <div
                                            className="actively_employ_company_img"
                                            style={{backgroundImage: `url(${list.thumbnail})`}}
                                            ></div>
                                            <div
                                            className="actively_employ_company_logo"
                                            style={{backgroundImage: `url(${list.logo})`}}
                                            ></div>
                                            <div className="actively_employ_company_name">
                                                {list.companyName}
                                            </div>
                                            <div className="actively_employ_company_position">
                                                {list.position}개 포지션
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        :null
                    }
                    <ul className="company_lists">
                        {
                            company_list.map((list) => (
                                <CompanyList
                                key = {list.employmentIdx}
                                idx = {list.employmentIdx}
                                comp_img = {list.thumbnail}
                                title  = {list.title}
                                comp_name = {list.companyName}
                                nation = {list.nation}
                                region = {list.region}
                                reward = {list.reward}
                                 />
                            ))
                        }
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    )
}