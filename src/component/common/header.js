import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import { useRecoilState, useRecoilValue } from "recoil"
import { isLogin, getToken, Login_profile, nowPage } from "../../recoil/recoil";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function LoginPopupComp(props){
    const [password_popup, set_password_popup] = useState(false);
    const [sign_in_popup, set_sign_in_popup] = useState(true);
    const [sign_up_popup, set_sign_up_popup] = useState(false);

    const [token, setToken] = useRecoilState(getToken);

    const login_popup_on = props.login_popup_on;
    const set_login_popup_on = props.set_login_popup_on;
    // ---------------------------------------------------
    //회원가입 user_info state
    const [email_value, set_email_value] = useState("");
    const [name_value, set_name_value] = useState("");
    const [phone_value, set_phone_value] = useState(""); 
    const [password_value, set_password_value] = useState("");
    const [password_check_value, set_password_check_value] = useState("");
    //회원가입 err state
    const [alert_err, set_alert_err] = useState("");
    // ---------------------------------------------------
    //회원가입 user_info state 실시간 변경
    const change_email_value = (e) => {
        set_email_value(e.target.value)
        set_email_class("login_for_email_input")
    }
    const change_name_value = (e) => {
        set_name_value(e.target.value)
    }
    const change_phone_value = (e) => {
        set_phone_value(e.target.value)
    }
    const change_password_value = (e) => {
        set_password_value(e.target.value)
    }
    const change_password_check_value = e => {
        set_password_check_value(e.target.value)
    }
    // ------------------------------------------------


    const [email_class, set_email_class] = useState("login_for_email_input")
    
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const emailCheck = emailRegex.test(email_value)

    const login_popup_disabled = ()  => {
        set_email_value("");
        set_name_value("");
        set_phone_value("");
        set_password_value("");
        set_password_check_value("");

        set_password_popup(false);
        set_sign_in_popup(true);
        set_sign_up_popup(false);

        set_login_popup_on(false)
    }
    // ------------------------------------------------
    //유저 이메일 체크
    const url = "https://prod.serverhwan.shop"

    const [user_check, set_user_check] = useState("");

    const user_email_check = async() => {
        try{
            const data = await axios({
                method: "post",
                url: `${url}/users/login/email`,
                data: {
                    email: email_value
                }
            })
            set_user_check(data.data.result);
        }
        catch(err){
            console.log(err);
        }
    }

    const user_checking = () => {
        if(!emailCheck){
            set_email_class("login_for_email_input error")
        } else if(emailCheck){
            user_email_check();
            set_sign_in_popup(false);

        }
    }
    useEffect(() => {
        switch (user_check) {
            case "회원가입부터 진행해야 합니다.":
                set_sign_up_popup(true);
                break;
            case "비밀번호 입력":
                set_password_popup(true);
                break;
        
            default:
                break;
        }
        set_user_check("");
    }, [user_check])
    // ------------------------------------------------
    //로그인
    const sign_in = async() => {
        try {
            const data = await axios({
                method : "post",
                url : `${url}/users/login`,
                data : {
                    email : email_value,
                    password : password_value,
                }
            })
            localStorage.setItem("token", data.data.result.jwt);
            localStorage.setItem("userIdx", data.data.result.userIdx);
            setToken(localStorage.getItem("token"))
        }
        catch(err){
            console.log(err);
        }
    }
    const sign_in_btn = () => {
        sign_in();
        alert("로그인이 완료되었습니다.")

        //밸류 초기화
        set_email_value("");
        set_name_value("");
        set_phone_value("");
        set_password_value("");

        //창 닫기
        set_sign_in_popup(true);
        set_password_popup(false);
        set_login_popup_on(false);
    }
    // ------------------------------------------------
    //회원 가입
    const sign_up = async() => {
        try{
            const data = await axios({
                method : "post",
                url : `${url}/users`,
                data: {
                    email : email_value,
                    name : name_value,
                    phone : phone_value,
                    password : password_value
                }
            })
            console.log(data);
            set_alert_err(data.data.message)
        }
        catch(err){
            console.log(err);
        }
    }
    const sign_up_btn = () => {
        sign_up();
        if(alert_err){
            if(alert_err === "요청에 성공하였습니다."){
                set_alert_err("");
            }
            alert(alert_err)
        }
        if(name_value &&
            phone_value &&
            password_value &&
            password_check_value &&
            !alert_err
            ){
            if(password_value === password_check_value){
                alert("회원가입이 정상적으로 이루어졌습니다");
        
                //밸류 초기화
                set_email_value("");
                set_name_value("");
                set_phone_value("");
                set_password_value("");
                set_password_check_value("");
        
                //창 닫기
                set_sign_in_popup(true);
                set_sign_up_popup(false);
                set_login_popup_on(false);

                login_popup_disabled();
            }
        }

    }
    // ------------------------------------------------
    return (
        <LoginPopup login_popup_on = {login_popup_on}>
            <div
            className="login_popup_bg"
            onClick={login_popup_disabled}
            ></div>
                {/* 로그인 창 */}
                {
                    sign_in_popup
                    ?<div className="login_popup_main">
                        <div className="login_popup_top_logo">
                            wanted
                            <svg
                            width="24" height = "24"
                            viewBox="0 0 24 24" color="#999"
                            onClick={login_popup_disabled}
                            >
                                <path
                                fill = "currentColor"
                                d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                ></path>
                            </svg>
                        </div>
                        <div className="login_popup_body">
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
                                    value = {email_value} onChange = {change_email_value}
                                    onKeyDown={e => {if(e.key === "Enter"){user_checking()}}}
                                    />
                                    <div className="email_error_comment">
                                        올바른 이메일 형식을 입력해주세요.
                                    </div>
                                </div>
                            </div>
                            <button
                            className="login_for_email_btn"
                            onClick={() => {
                                user_checking();
                            }}
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
                                    <div className="login_for_social_ico kakao">
                                        <svg
                                        width= "22" height= "21"
                                        viewBox="0 0 22 21"
                                        >
                                            <path
                                            fill="#000"
                                            d = "M11 0C5.242 0 0 3.823 0 8.539c0 2.932 1.904 5.519 4.804 7.056l-1.22 4.479c-.107.397.343.712.69.483l5.348-3.548c.452.044.91.069 1.377.069 6.076 0 11-3.823 11-8.54 0-4.715-4.924-8.538-11-8.538"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="login_for_social_name">
                                        Kakao
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico facebook">
                                        <svg
                                        width= "12" height= "23"
                                        viewBox="0 0 12 23"
                                        >
                                            <path
                                            fill="#fff"
                                            d = "M11.214 12.603l.622-4.055h-3.89V5.917c0-1.11.543-2.191 2.285-2.191H12V.274S10.395 0 8.86 0C5.656 0 3.562 1.942 3.562 5.458v3.09H0v4.055h3.562v9.802c.714.112 1.446.17 2.191.17.746 0 1.478-.058 2.192-.17v-9.802h3.269"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="login_for_social_name">
                                        Facebook
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico google">
                                        <svg
                                        width= "23" height= "23"
                                        viewBox="0 0 23 23"
                                        >
                                            <path
                                            fill="#EA4335"
                                            d = "M11.5 4.574c1.688 0 3.204.58 4.396 1.72l3.299-3.299C17.203 1.14 14.6 0 11.5 0 7.005 0 3.115 2.577 1.223 6.335l3.842 2.98c.905-2.718 3.44-4.741 6.435-4.741z"
                                            ></path>
                                            <path
                                            fill="#4285F4"
                                            d = "M22.54 11.761c0-.815-.073-1.6-.21-2.352H11.5v4.448h6.19c-.268 1.438-1.078 2.656-2.296 3.471v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453z"
                                            ></path>
                                            <path
                                            fill="#FBBC05"
                                            d = "M5.065 13.685c-.23-.69-.36-1.427-.36-2.185s.13-1.495.36-2.185v-2.98H1.223C.444 7.888 0 9.645 0 11.5c0 1.856.444 3.612 1.223 5.165l3.842-2.98z"
                                            ></path>
                                            <path
                                            fill="#34A853"
                                            d = "M11.5 23c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H1.223v2.98C3.115 20.423 7.005 23 11.5 23z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="login_for_social_name">
                                        Google
                                    </div>
                                </li>
                                <li className="login_for_social_list">
                                    <div className="login_for_social_ico apple">
                                        <svg
                                        width= "19" height= "24"
                                        viewBox="0 0 19 24"
                                        >
                                            <path
                                            fill="#fff"
                                            d = "M15.868 12.55c.033 3.574 3.098 4.764 3.132 4.779-.026.084-.49 1.695-1.615 3.36-.972 1.439-1.982 2.872-3.572 2.902-1.562.03-2.065-.938-3.851-.938s-2.344.908-3.823.967c-1.535.059-2.704-1.556-3.684-2.99C.45 17.698-1.08 12.343.975 8.73c1.022-1.795 2.848-2.932 4.83-2.96 1.506-.03 2.929 1.026 3.85 1.026.921 0 2.65-1.27 4.467-1.083.761.032 2.897.31 4.268 2.343-.11.07-2.548 1.506-2.522 4.494m-2.936-8.777c.815-.999 1.363-2.389 1.213-3.772-1.174.048-2.594.792-3.437 1.79-.755.884-1.416 2.298-1.238 3.654 1.31.103 2.647-.673 3.462-1.672"
                                            ></path>
                                        </svg>
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
                    </div>
                    :null
                }
                {
                    sign_up_popup
                    // 회원가입 창
                    ?<div className="login_popup_main">
                        <div className="login_popup_top_logo">
                            회원가입
                            <svg
                            width="24" height = "24"
                            viewBox="0 0 24 24" color="#999"
                            onClick={login_popup_disabled}
                            >
                                <path
                                fill = "currentColor"
                                d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                ></path>
                            </svg>
                        </div>
                        <div className="login_popup_body">
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    이름
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="text"
                                    placeholder="이름을 입력해 주세요."
                                    value = {name_value} onChange = {change_name_value}
                                    />
                                </div>
                            </div>
                            <div className="login_for_email_wrap phone">
                                <label className="login_for_email_label">
                                    휴대폰 번호
                                </label>
                                <div className= {email_class}>
                                    <select>
                                        <option>대한민국 +82</option>
                                    </select>
                                </div>
                                <div className="login_for_email_select_ico"></div>
                                <div className= {email_class}>
                                    <input
                                    type="text"
                                    placeholder="(예시)01012345678"
                                    value = {phone_value} onChange = {change_phone_value}
                                    />
                                    <button>인증번호 받기</button>
                                </div>
                                <div className= {email_class}>
                                    <input
                                    type="text"
                                    className="input_disabled"
                                    placeholder="인증번호를 입력해 주세요"
                                    disabled
                                    />
                                </div>
                            </div>
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    비밀번호
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="password"
                                    placeholder="비밀번호를 입력해 주세요."
                                    value = {password_value} onChange = {change_password_value}
                                    />
                                </div>
                                <div className="login_for_email_comment">
                                    영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합하여 8자 이상 입력해 주세요.
                                </div>
                            </div>
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    비밀번호 확인
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="password"
                                    placeholder="비밀번호를 다시 한 번 입력해 주세요."
                                    value = {password_check_value} onChange = {change_password_check_value}
                                    />
                                </div>
                            </div>
                            <div className="login_for_email_wrap">
                                <div className="login_for_email_check title">
                                    <input
                                    type="checkbox" />
                                    <span>전체 동의</span>
                                </div>
                                <div className="login_for_email_check">
                                    <input
                                    type="checkbox" />
                                    <span>개인정보 수집 및 이용 동의 (필수)</span>
                                </div>
                                <div className="login_for_email_check">
                                    <input
                                    type="checkbox" />
                                    <span>이벤트 소식 등 알림 정보 받기</span>
                                </div>
                            </div>
                            <button
                            className="login_for_email_btn"
                            onClick={sign_up_btn}
                            >
                                <span>회원가입하기</span>
                            </button>
                        </div>
                    </div>
                    :null
                }
                {
                    password_popup
                    ?<div className="login_popup_main">
                        <div className="login_popup_top_logo">
                            비밀번호 입력
                            <svg
                            width="24" height = "24"
                            viewBox="0 0 24 24" color="#999"
                            onClick={login_popup_disabled}
                            >
                                <path
                                fill = "currentColor"
                                d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                ></path>
                            </svg>
                        </div>
                        <div className="login_popup_body">
                            <div className="login_for_email_wrap">
                                <label className="login_for_email_label">
                                    비밀번호
                                </label>
                                <div className= {email_class}>
                                    <input
                                    type="password"
                                    placeholder="비밀번호를 입력해 주세요."
                                    value = {password_value} onChange = {change_password_value}
                                    />
                                </div>
                            </div>
                            <button
                            className="login_for_email_btn"
                            onClick={sign_in_btn}
                            >
                                <span>로그인</span>
                            </button>
                        </div>
                    </div>
                    :null

                }
        </LoginPopup>
    )
}


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
                src='/images/wanted_logo.png'
                />
            </Link>
        </div>
    )
}

function HeaderAnotherWrap(){
    const [Login_profiled, setLogin_profiled] = useRecoilState(Login_profile)
    //----------------------------------------------------
    const [login_popup_on, set_login_popup_on] = useState(false);
    
    const [token, setToken] = useRecoilState(getToken);
    const [isLogined, setisLogined] = useRecoilState(isLogin);
    //----------------------------------------------------
    const login_popup_Active = () => {
        set_login_popup_on(true)
    }
    const [my_mini_space_class, set_my_mini_space_class] = useState("my_mini_space_lists")
    const my_mini_space_on = () => {
        switch (my_mini_space_class) {
            case "my_mini_space_lists":
                set_my_mini_space_class("my_mini_space_lists Active")
                break;
            case "my_mini_space_lists Active":
                set_my_mini_space_class("my_mini_space_lists")
                break;
            default:
                break;
        }
    }

    const isLogoutBtn = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userIdx");
        setLogin_profiled([]);
        setToken("");
    }
    // ------------------------------------------------
    // 새로고침할 때 토큰 다시 불러옴
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])
    //토큰이 들어있는지에 따라 로그인 상태 반영
    useEffect(() => {
        if(token){
            setisLogined(true);
        } else {
            setisLogined(false); 
        }
    }, [token])
    //----------------------------------------------------

    //----------------------------------------------------
    if(isLogined){
        return (
            <div className='header_another_wrap'>
                <div className='header_search_ico'>
                    <svg
                    width={18} height = {18}
                    >
                        <path
                        d = "M15.727 17.273a.563.563 0 10.796-.796l-4.875-4.875-.19-.165a.563.563 0 00-.764.028 5.063 5.063 0 111.261-2.068.562.562 0 101.073.338 6.188 6.188 0 10-1.943 2.894l4.642 4.644z"
                        ></path>
                    </svg>
                </div>
                <div
                    className="header_profile"
                    onClick={my_mini_space_on}
                    >
                        <div
                        className="header_profile_img"
                        style={{ backgroundImage: `url(${Login_profiled.imgUrl})` }}
                        ></div>
                        <ul className={my_mini_space_class}>
                            <Link to = "/mywanted">
                                <li className="my_mini_space_list">
                                    MY 원티드
                                </li>
                            </Link>
                            <Link to = "/profile">
                                <li className="my_mini_space_list">
                                    프로필
                                </li>
                            </Link>
                            <div className="my_mini_space_bar"></div>
                            <li className="my_mini_space_list">
                                지원 현황
                            </li>
                            <li className="my_mini_space_list">
                                제안받기 현황
                            </li>
                            <li className="my_mini_space_list">
                                좋아요
                            </li>
                            <Link to ="/bookmarks">
                                <li className="my_mini_space_list">
                                    북마크
                                </li>
                            </Link>
                            <div className="my_mini_space_bar"></div>
                            <li className="my_mini_space_list">
                                추천
                            </li>
                            <li className="my_mini_space_list">
                                포인트
                            </li>
                            <li
                            className="my_mini_space_logout"
                            onClick={isLogoutBtn}
                            >
                                로그아웃
                            </li>
                        </ul>
                </div>
                <div className='header_another_bar'></div>
                <div className='header_enterprise_service'>
                    기업 서비스
                </div>
                <LoginPopupComp
                login_popup_on = {login_popup_on}
                set_login_popup_on = {set_login_popup_on}
                />
            </div>
        )
    }
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
            <LoginPopupComp
            login_popup_on = {login_popup_on}
            set_login_popup_on = {set_login_popup_on}
            />
        </div>
    )
}
function HeaderMenuWrap(){
    const nowPaged = useRecoilValue(nowPage);
    const [jobsfeedClass, setJobsfeedClass] = useState("header_menu_list");
    const [communityClass, setCommunityClass] = useState("header_menu_list");


    useEffect(() => {
        setJobsfeedClass("header_menu_list")
        setCommunityClass("header_menu_list")
        switch(nowPaged){
            case "/jobsfeed":
                setJobsfeedClass("header_menu_list selected")
                break;
            case "/community":
                setCommunityClass("header_menu_list selected")
                break;
            default:
                setJobsfeedClass("header_menu_list")
                setCommunityClass("header_menu_list")
                break;
        }
        console.log(nowPaged);
    }, [nowPaged])

    return (
        <ul className='header_menu_lists'>
            <Link to ="/jobsfeed">
                <li
                className={jobsfeedClass}>
                    채용
                </li>
            </Link>
            <Link to = "/jobsfeed">
                <li
                className='header_menu_list'>
                이벤트
                </li>
            </Link>
            <Link to = "/jobsfeed">
                <li
                className='header_menu_list'>
                직군별 연봉
                </li>
            </Link>
            <Link to = "/jobsfeed">
                <li
                className='header_menu_list'>
                이력서
                </li>
            </Link>
            <Link to = "/community">
                <li
                className={communityClass}>
                커뮤니티
                </li>
            </Link>
            <Link to = "/jobsfeed">
                <li
                className='header_menu_list'>
                프리랜서
                </li>
            </Link>
            <Link to = "/jobsfeed">
                <li
                className='header_menu_list'>
                AI 합격예측
                </li>
            </Link>
        </ul>
    )
}
export default function Header(){

    return(
        <div>
            <header>
                <div className="header_wrap">
                    <HeaderLogoWrap />
                    <HeaderMenuWrap />
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