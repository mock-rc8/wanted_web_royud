import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HeaderLogoWrap(){
    const [category_on, set_category_on] = useState(false);
    const category_active = () => {
        set_category_on(true)
    }
    const category_disable = () => {
        set_category_on(false)
    }
    return (
        <div className="header_logo_wrap">
            <HeaderCategoryWrap category_on = {category_on}>
                <div className="header_category_box"
                onMouseLeave={category_disable}>
                    <div
                    className="header_category_main"
                    >
                        <Link to = "/wdlist">
                            <div className="header_category_main_list all">
                                직군 천체
                            </div>
                        </Link>
                        <ul className="header_category_main_lists">
                            <li className="header_category_main_list">
                                개발
                            </li>
                            <li className="header_category_main_list">
                                경영·비즈니스
                            </li>
                            <li className="header_category_main_list">
                                마케팅·광고
                            </li>
                            <li className="header_category_main_list">
                                디자인
                            </li>
                            <li className="header_category_main_list">
                                영업
                            </li>
                            <li className="header_category_main_list">
                                고객서비스·리테일
                            </li>
                            <li className="header_category_main_list">
                                HR
                            </li>
                            <li className="header_category_main_list">
                                게임제작
                            </li>
                            <li className="header_category_main_list">
                                미디어
                            </li>
                            <li className="header_category_main_list">
                                금융
                            </li>
                            <li className="header_category_main_list">
                                엔지니어링·설계
                            </li>
                            <li className="header_category_main_list">
                                의료·제약·바이오
                            </li>
                            <li className="header_category_main_list">
                                제조·생산
                            </li>
                            <li className="header_category_main_list">
                                물류·무역
                            </li>
                            <li className="header_category_main_list">
                                개발
                            </li>
                            <li className="header_category_main_list">
                                개발
                            </li>
                            <li className="header_category_main_list">
                                개발
                            </li>
                            <li className="header_category_main_list">
                                개발
                            </li>
                            <li className="header_category_main_list">
                                개발
                            </li>
                        </ul>
                        <div className="header_category_freelancer">
                            <span>프리랜서</span>
                        </div>
                    </div>
                </div>
            </HeaderCategoryWrap>
            <img
            className='category_ico'
            src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ficon-menu.png&w=undefined&q=75'
            onMouseOver={category_active}
            />
            <Link to = "/">
                <img
                className='header_logo'
                src='./images/wanted_logo.png'
                />
            </Link>
        </div>
    )
}
function HeaderAnotherWrap(){

    //----------------------------------------------------
    const [email_value, set_email_value] = useState();
    const [email_class, set_email_class] = useState("login_for_email_input")
    const [userCheck, setUserCheck] = useState(false);
    const change_value = (e) => {
        set_email_value(e.target.value)
        set_email_class("login_for_email_input")
    }
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const emailCheck = emailRegex.test(email_value)
    const email_check = () => {
        if(!emailCheck){
            set_email_class("login_for_email_input error")
        } else if(emailCheck){
            setUserCheck(true)
        }
    }
    //----------------------------------------------------
    const [login_popup_on, set_login_popup_on] = useState(false);
    const login_popup_Active = () => {
        set_login_popup_on(true)
    }
    const login_popup_disabled = ()  => {
        set_login_popup_on(false)
        setUserCheck(false)
    }
    //----------------------------------------------------
    return (
        <div className='header_another_wrap'>
            <div className='header_search_ico'>
                <svg>
                    <path
                    d = "M15.727 17.273a.563.563 0 10.796-.796l-4.875-4.875-.19-.165a.563.563 0 00-.764.028 5.063 5.063 0 111.261-2.068.562.562 0 101.073.338 6.188 6.188 0 10-1.943 2.894l4.642 4.644z"
                    ></path>
                </svg>
            </div>
            <div
            className='header_members_login'
            onClick={login_popup_Active}
            >
                회원가입/로그인
            </div>
            <div className='header_another_bar'></div>
            <div className='header_enterprise_service'>
                기업 서비스
            </div>
            <LoginPopup login_popup_on = {login_popup_on}>
                <div
                className="login_popup_bg"
                onClick={login_popup_disabled}
                ></div>
                <div className="login_popup_main">
                    <div className="login_popup_top_logo">
                    </div>
                    {
                        !userCheck
                        ?<div className="login_popup_body">
                            <div className="login_popup_title_wrap">
                                <div className="login_popup_title">
                                    직장인을 위한 <br />
                                    커리어 플랫폼, 원티드!
                                </div>
                                <div className="login_popup_subtitle">
                                    커리어 성장과 행복을 위한 여정 <br />
                                    지금 원티드에서 시작하세요.
                                </div>
                            </div>
                                <div className="login_for_email_wrap">
                                    <label className="login_for_email_label">
                                        이메일
                                    </label>
                                    <div className= {email_class}>
                                        <input
                                        type="text"
                                        placeholder="이메일을 입력해 주세요."
                                        value = {email_value} onChange = {change_value}
                                        onKeyDown={e => {if(e.key === "Enter"){email_check()}}}
                                        />
                                        <div className="email_error_comment">
                                            올바른 이메일 형식을 입력해주세요.
                                        </div>
                                    </div>
                                </div>
                                <button
                                className="login_for_email_btn"
                                onClick={email_check}
                                >
                                    <span>이메일로 계속하기</span>
                                </button>
                            <div className="login_for_or">
                                or
                            </div>
                            <div className="login_for_other">
                                다음 계정으로 계속하기
                            </div>
                            <ul className="login_for_social_lists">
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico kakao"></div>
                                    <div className="login_for_social_name">
                                        Kakao
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico facebook">

                                    </div>
                                    <div className="login_for_social_name">
                                        Facebook
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico google">

                                    </div>
                                    <div className="login_for_social_name">
                                        Google
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico apple">

                                    </div>
                                    <div className="login_for_social_name">
                                        Apple
                                    </div>
                                </li>
                            </ul>
                            <div className="login_text">
                                걱정마세요! 여러분의 지원 활동은 SNS에 노출되지 않습니다.
                                <br />
                                회원가입 시 <span>개인정보 처리방침</span>과 <span>이용약관</span>을 확인하였으며, 동의합니다.
                            </div>
                        </div>
                        :
                        <div className="login_popup_body">
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    이름
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="text"
                                    placeholder="이름을 입력해 주세요."
                                    value = {email_value} onChange = {change_value}
                                    onKeyDown={e => {if(e.key === "Enter"){email_check()}}}
                                    />
                                    <div className="email_error_comment">
                                        올바른 이메일 형식을 입력해주세요.
                                    </div>
                                </div>
                            </div>
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    휴대폰 번호
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="text"
                                    placeholder="이름을 입력해 주세요."
                                    value = {email_value} onChange = {change_value}
                                    onKeyDown={e => {if(e.key === "Enter"){email_check()}}}
                                    />
                                    <div className="email_error_comment">
                                        올바른 이메일 형식을 입력해주세요.
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    
                </div>
            </LoginPopup>
        </div>
    )
}
export default function Header(){

    return(
        <div>
            <header>
                <div className="header_wrap">
                    <HeaderLogoWrap />
                        <ul className='header_menu_lists'>
                            <Link to ="/jobsfeed">
                                <li className='header_menu_list'>
                                    채용
                                </li>
                            </Link>
                            <li className='header_menu_list'>
                            이벤트
                            </li>
                            <li className='header_menu_list'>
                            직군별 연봉
                            </li>
                            <li className='header_menu_list'>
                            이력서
                            </li>
                            <li className='header_menu_list'>
                            커뮤니티
                            </li>
                            <li className='header_menu_list'>
                            프리랜서
                            </li>
                            <li className='header_menu_list'>
                            AI 합격예측
                            </li>
                        </ul>
                    <HeaderAnotherWrap />
                </div>
            </header>
            <div className="header_padding"></div>
        </div>
    )
}

// styled-comp

const HeaderCategoryWrap = styled.div`
    position: fixed; left: 0; top: 50px;
    width: 100%; height: 100%;
    margin: 0 auto;
    display : ${
        ({category_on}) => {
            if(category_on){
                return "block"
            } else if(!category_on){
                return "none"
            }
        }
    };
    opacity: ${
        ({category_on}) => {
            if(category_on){
                return "1"
            } else if(!category_on){
                return "0"
            }
        } 
    };
`;
const LoginPopup = styled.div`
    display: ${
        ({login_popup_on}) => {
            if(login_popup_on){
                return "block"
            }
            return "none"
        }};

    width: 100%; height: 100%;
    position: fixed; left: 0; top: 0;
    position: reletive;
`;