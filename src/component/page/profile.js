import Header from "../common/header"
import { Login_profile } from "../../recoil/recoil"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"

export default function ProfilePage(){
    const user_profile = useRecoilValue(Login_profile);
    const userImg = user_profile.imgUrl;
    const userName = user_profile.name;
    const userEmail = user_profile.email;
    const [userPhone, setuserPhone] = useState("");

    useEffect(() => {
        setuserPhone(user_profile.phone)
        if(userPhone){
            setuserPhone(userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`))
        }
    }, [user_profile, userPhone])
    // -------------------------------------------------------------------
    const [checked, set_checked] = useState(false);
    const checked_check = () => {
        switch(checked){
            case true:
                set_checked(false);
                break;
            case false:
                set_checked(true);
                break;
            default:
                break;
        }
    }
    // -------------------------------------------------------------------
    return (
        <div className="MyWantedPage">
        <Header />
        <div className="MyInfo_Main">
            <div className="MyInfo_Main_wrap">
                <div className="MyInfo_Main_title">
                    프로필
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
                                        {userPhone}
                                    </div>
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
                        </div>
                    </div>
                    <div className="MyInfo_Main_right">
                        <div className="MyInfo_Main_section_bar">
                            <div className="MyInfo_Main_section_bar_comment">
                                <div>입사일 퇴사일 헷갈릴 때, 내 경력 한눈에 모아보기!</div>
                                <button>지금 확인하기</button>
                            </div>
                            <div className="MyInfo_Main_section_bar_img">
                                <img src="https://static.wanted.co.kr/career_connect/banner.png" alt="" />
                            </div>
                        </div>
                        <div className="MyInfo_Main_section">
                            <div className="MyInfo_Main_section_title">
                                학교·직장등록
                            </div>
                            <div className="MyInfo_Main_section_school_company_wrap">
                                <div className="MyInfo_Main_section_input">
                                    <label>학교</label>
                                    <button>
                                        학교명 검색
                                    </button>
                                </div>
                            </div>
                            <div className="MyInfo_Main_section_school_company_wrap">
                                <div className="MyInfo_Main_section_input">
                                    <label>직장</label>
                                    <button>
                                        직장명 검색
                                    </button>
                                </div>
                                <div className="MyInfo_Main_section_company_tenure_wrap">
                                    <div className="MyInfo_Main_section_company_tenure">
                                        <select className="select_year">
                                            <option hidden>YYYY</option>
                                            <option>2002</option>
                                            <option>2001</option>
                                            <option>2000</option>
                                            <option>1999</option>
                                            <option>1998</option>
                                            <option>1997</option>
                                            <option>1996</option>
                                            <option>1995</option>
                                        </select>
                                        .
                                        <select className="select_month">
                                            <option hidden>MM</option>
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                            <option>04</option>
                                            <option>05</option>
                                            <option>06</option>
                                            <option>07</option>
                                            <option>08</option>
                                            <option>09</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                        </select>
                                    </div>
                                    <Checked_tenure checked = {checked}>
                                        <div className="MyInfo_Main_section_company_tenure">
                                            <span>-</span> 
                                            <select className="select_year">
                                                <option hidden>YYYY</option>
                                                <option>2002</option>
                                                <option>2001</option>
                                                <option>2000</option>
                                                <option>1999</option>
                                                <option>1998</option>
                                                <option>1997</option>
                                                <option>1996</option>
                                                <option>1995</option>
                                            </select>
                                            .
                                            <select className="select_month">
                                                <option hidden>MM</option>
                                                <option value="1">01</option>
                                                <option>02</option>
                                                <option>03</option>
                                                <option>04</option>
                                                <option>05</option>
                                                <option>06</option>
                                                <option>07</option>
                                                <option>08</option>
                                                <option>09</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                    </Checked_tenure>
                                    <div className="MyInfo_Main_section_company_now">
                                        <input
                                        checked = {checked}
                                        onChange = {checked_check}
                                        type="checkbox" />
                                        현재 재직중
                                    </div>
                                </div>
                            </div>
                            <div className="MyInfo_Main_section_textarea">
                                <div className="MyInfo_Main_section_textarea_title">
                                    간단 소개글
                                </div>
                                <div className="MyInfo_Main_section_textarea_comment">
                                    직무 내용, 경험, 목표 등을 추가해서 더욱 멋진 소개글을 작성해보세요.
                                </div>
                                <textarea defaultValue = "안녕하세요. 신입 개발자입니다."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MyInfo_Main_footer">
                <div className="MyInfo_Main_footer_wrap">
                    <button className="MyInfo_Main_footer_set">
                        전문분야 설정
                    </button>
                    <button className="MyInfo_Main_footer_complete">
                        작성 완료
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
const Checked_tenure = styled.div`
    display: ${
        ({checked}) => {
            switch(checked){
                case true:
                    return "none";
                break
                default:
                    return "inline-block";
                    break;
            }
        }
    }
`;