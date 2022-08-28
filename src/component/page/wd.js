import Header from "../common/header"
import Footer from "../common/footer"

import { nowPage } from "../../recoil/recoil"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"

export default function WdPage(props){
    const [nowPaged, set_nowPaged] = useRecoilState(nowPage);
    useEffect(() => {
        set_nowPaged("/wd")
    }, [])
    // -----------------------------------------------------------------

    const { idx } = useParams()
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


    return (
        <div className="WdPage">
            <Header />

            <div className="main_page">
                <div className="main_page_wrap">
                    <div className="company_detail_wrap">
                        <div className="company_detail_left">
                            <div className="company_img_lists_box">

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
                                        <p>{line}<br /></p>
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
                                        {applicant_money}
                                    </div>
                                </li>
                                <li className="company_detail_box_list">
                                    <div className="company_detail_box_list_title">
                                        지원자
                                    </div>
                                    <div className="company_detail_box_list_desc">
                                        {recommend_money}
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