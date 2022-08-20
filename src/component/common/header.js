import { useEffect, useState } from "react";
// import styled from "styled-component";

export default function Header(){

    const [scrollCheck, setscrollCheck] = useState(false);

    const head_fixed = () => {

        const scrolled = document.documentElement.scrollTop;

        if(scrolled > 10){
            setscrollCheck(true);
        } else if(scrolled <= 10){
            setscrollCheck(false);
        }
        console.log(scrollCheck);
    }
    document.addEventListener("scroll", head_fixed)

    return(
        <header>
            <div className="header_wrap">
                <div className="header_logo_wrap">
                    <img
                    className='category_ico'
                    src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ficon-menu.png&w=undefined&q=75'
                    />
                    <img
                    className='header_logo'
                    src='./images/wanted_logo.png'
                    />
                </div>
                <ul className='header_menu_lists'>
                    <li className='header_menu_list'>
                    채용
                    </li>
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
                <div className='header_another_wrap'>
                    <div className='header_search_ico'>

                    </div>
                    <div className='header_members_login'>
                    회원가입/로그인
                    </div>
                    <div className='header_another_bar'></div>
                    <div className='header_enterprise_service'>
                    기업 서비스
                    </div>
                </div>
            </div>
        </header>
    )
}
// const Header_ev = styled.div`
// `;