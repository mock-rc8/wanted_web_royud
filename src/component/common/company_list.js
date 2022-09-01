import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { nowPage, isLogin } from "../../recoil/recoil";
import { useRecoilState, useRecoilValue } from "recoil";

export default function CompanyList(props){
    const idx = props.idx;
    const comp_img = props.comp_img
    const comp_name = props.comp_name;
    const title = props.title;
    const nation = props.nation;
    const region = props.region;
    const reward = props.reward;
    const isBookmark = props.isBookmark;
    // --------------------------------------------------------------------

    const url = "https://prod.serverhwan.shop";

    //북마크 등록 api
    const bookmark_this = async() => {
        try{
            const data = await axios({
                method: "post",
                url : `${url}/bookmarks/${localStorage.getItem("userIdx")}`,
                headers: {
                    userIdx: localStorage.getItem("userIdx")
                },
                data : {
                    employmentIdx: idx,
                    userIdx: localStorage.getItem("userIdx"),
                }
            })
            console.log(data);
        }
        catch(err){

        }
    }
    //북마크 삭제 api
    const bookmark_out = async() => {
        try{
            const data = await axios({
                method: "patch",
                url : `${url}/bookmarks/status/${localStorage.getItem("userIdx")}`,
                headers: {
                    userIdx: localStorage.getItem("userIdx"),
                    "X-ACCESS-TOKEN" : localStorage.getItem("token")
                },
                data : {
                    employmentIdx: idx
                }
            })
            console.log(data);
        }
        catch(err){
        }
    }
    const isLogined = useRecoilValue(isLogin);
    const book_mark_on = () => {
        if(isLogined){
            switch(isBookmark){
                case 0:
                    bookmark_this();
                    break;
                case 1:
                    bookmark_out();
                    break;
                default:
                    break;
            }
        }
        console.log(isBookmark);
    }

    // 확인용 북마크 조회 api
    const bookmarkSearch = async() => {
        try{
            const data = await axios({
                method: "get",
                url: `${url}/bookmarks/${localStorage.getItem("userIdx")}`,
                headers: {
                    userIdx: localStorage.getItem("userIdx"),
                    "X-ACCESS-TOKEN": localStorage.getItem("token")
                }
            })
            console.log(data);
        }
        catch(err){

        }
    }
    useEffect(() => {
        bookmarkSearch();
    }, [])
    const nowPaged = useRecoilValue(nowPage);
    // --------------------------------------------------------------------
    return (
        <div className="CompanyList_box">
            <Link to = {"/wd" + `/${idx}`}>
                <li className="company_list">
                    <div
                    className="company_list_img"
                    style={{
                        backgroundImage: `url(${comp_img})`
                    }}
                    >
                    </div>
                    <div className="company_body">
                        <div className="company_list_title">
                            {title}
                        </div>
                        <div className="company_list_name">
                            {comp_name}
                        </div>
                        <button className="company_list_tag">
                            응답률 매우 높음
                        </button>
                        <div className="company_list_location">
                            {region}
                            ·
                            {nation}
                        </div>
                        <div className="company_list_reward">
                            채용 보상금 {reward
                            ?reward.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                            :""
                            }원
                        </div>
                    </div>
                </li>
            </Link>
            <div
            className="emp_bookmark"
            onClick={() => {
                book_mark_on();
                window.location.replace(`${nowPaged}`)
            }}
            >
                {
                    isBookmark === 0
                    ?<svg
                    width="22" height="22"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                    >
                        <path
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d = "M3.58065 1C3.25997 1 3 1.26206 3 1.58533V16.4138C3 16.8632 3.48164 17.145 3.86873 16.922L9.00004 13.9662L14.1313 16.922C14.5184 17.145 15 16.8632 15 16.4138V1.58533C15 1.26206 14.74 1 14.4194 1H9.00004H3.58065ZM8.71195 12.7838C8.89046 12.681 9.10961 12.681 9.28812 12.7838L13.8387 15.4052V2.17067H9.00004H4.1613V15.4052L8.71195 12.7838Z"
                        ></path>
                        <path
                        fill="black"
                        fillOpacity="0.25"
                        d = "M9.28812 12.7838C9.10961 12.681 8.89046 12.681 8.71195 12.7838L4.1613 15.4052V2.17067H9.00004H13.8387V15.4052L9.28812 12.7838Z"
                        ></path>
                    </svg>
                    :<svg
                    width="22" height="22"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="https://www.w3.org/2000/svg"
                    >
                        <path
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d = "M3.58065 1C3.25997 1 3 1.26206 3 1.58533V16.4138C3 16.8632 3.48164 17.145 3.86873 16.922L9.00004 13.9662L14.1313 16.922C14.5184 17.145 15 16.8632 15 16.4138V1.58533C15 1.26206 14.74 1 14.4194 1H9.00004H3.58065ZM8.71195 12.7838C8.89046 12.681 9.10961 12.681 9.28812 12.7838L13.8387 15.4052V2.17067H9.00004H4.1613V15.4052L8.71195 12.7838Z"
                        ></path>
                        <path
                        fill="#3366FF"
                        d = "M9.28812 12.7838C9.10961 12.681 8.89046 12.681 8.71195 12.7838L4.1613 15.4052V2.17067H9.00004H13.8387V15.4052L9.28812 12.7838Z"
                        ></path>
                    </svg>
                }
            </div>
        </div>


    )
}