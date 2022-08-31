import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../common/header";
import { isLogin } from "../../recoil/recoil";
import { useRecoilValue } from "recoil";

export default function CommuPostingPage(){
    const isLogind = useRecoilValue(isLogin);

    const params = useParams();
    const url = "https://prod.serverhwan.shop"

    const [posterImg, setPosterImg] = useState("");
    const [postername, setPostername] = useState("");
    const [postercareer, setPostercareer] = useState("");
    const [posterjob, setPosterjob] = useState("");
    const [posterIdx, setposterIdx] = useState("");

    const [postingIdx, setpostingIdx] = useState("");
    const [posterdate, setPosterdate] = useState("");
    const [posttitle, setPosttitle] = useState("");
    const [postcontent, setPostcontent] = useState("");
    const [posttags, setPosttags] = useState([]);
    const [postlikenum, setPostlikenum] = useState("");
    const [postcommentNum, setPostcommentNum] = useState("");
    const [postcommentList, setpostcommentList] = useState([]);

    const [userIdx, setuserIdx] = useState("");
    const [username, setusername] = useState("");
    const [userImg, setuserImg] = useState("");

    //비회원용 api
    const postViewData = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities/postings/${params.postIdx}`,
                headers: {
                    postingIdx: params.postIdx
                }
            })
            setPosterImg(data.data.result.postingMore.profileUrl)
            setPostername(data.data.result.postingMore.name)
            setPostercareer(data.data.result.postingMore.career)
            setPosterjob(data.data.result.postingMore.job)
            setPosterdate(data.data.result.postingMore.date)
            setPosttitle(data.data.result.postingMore.title)
            setPostcontent(data.data.result.postingMore.content)
            setPosttags(data.data.result.postingMore.tags)
            setPostlikenum(data.data.result.postingMore.likeNum)
            setPostcommentNum(data.data.result.postingMore.commentNum)
        }
        catch(err){

        }
    }
    // 회원용 api
    const postViewData_Login = async() => {
        try {
            const data = await axios({
                method: "get",
                url: `${url}/communities/postings/${params.postIdx}/${localStorage.getItem("userIdx")}`,
                headers: {
                    postingIdx: params.postIdx,
                    "X-ACCESS-TOKEN": localStorage.getItem("token"),
                    userIdx: localStorage.getItem("userIdx")
                }
            })
            setpostingIdx(data.data.result.postingMore.postingIdx);
            setposterIdx(data.data.result.postingMore.userIdx)
            setPosterImg(data.data.result.postingMore.profileUrl)
            setPostername(data.data.result.postingMore.name)
            setPostercareer(data.data.result.postingMore.career)
            setPosterjob(data.data.result.postingMore.job)
            setPosterdate(data.data.result.postingMore.date)
            setPosttitle(data.data.result.postingMore.title)
            setPostcontent(data.data.result.postingMore.content)
            setPosttags(data.data.result.postingMore.tags)
            setPostlikenum(data.data.result.postingMore.likeNum)
            setPostcommentNum(data.data.result.postingMore.commentNum)
            setuserIdx(data.data.result.user.userIdx)
            setusername(data.data.result.user.name)
            setuserImg(data.data.result.user.profileUrl)
            setpostcommentList(data.data.result.commentList)
        }
        catch(err){

        }
    }
    useEffect(() => {
        switch(isLogind){
            case true:
                postViewData_Login()
                break;
            default:
                postViewData()
                break;
        }
    }, [isLogind])
    // ---------------------------------------------------------------
    const [others_menu_lists, set_others_menu_lists] = useState("others_menu_lists");

    const others_menu_on = () => {
        switch(others_menu_lists){
            case "others_menu_lists":
                set_others_menu_lists("others_menu_lists On")
                break;
            case "others_menu_lists On":
                set_others_menu_lists("others_menu_lists")
                break;
        }
    }

    const navigate = useNavigate();
    // ---------------------------------------------------------------
    const move_edit_page = () => {
        navigate(`/community/edit/${postingIdx}`)
    }
    // ---------------------------------------------------------------

    const deletePage = async() => {
        try{
            const data =  await axios({
                method: "patch",
                url: `${url}/communities/${localStorage.getItem("userIdx")}`,
                data: {
                    postingIdx: postingIdx
                },
                headers: {
                    "X-ACCESS-TOKEN" : localStorage.getItem("token"),
                    userIdx: localStorage.getItem("userIdx")
                }
            })
            console.log(data);
        }
        catch(err){

        }
    }

    const move_delete = () => {
        deletePage();
        window.location.replace("/community")
    }
    // ---------------------------------------------------------------
    return (
        <div>
            <Header />
            <div className="MyInfo_Main">
                <div className="MyInfo_Main_wrap">
                    <div className="MyInfo_Main_title"></div>
                    <div className="posting_page_main">
                        <div className="posting_page_main_left">
                            <div className="posting_page_left_sticky">
                                <div className="posting_page_left_profile">
                                    <div
                                    style={{backgroundImage: `url(${posterImg})`}}
                                    className="posting_text_main_profile_img"></div>
                                    <div className="posting_text_main_profile_desc">
                                        <div className="posting_text_main_profile_desc_top">
                                            <span className="posting_text_main_profile_name">
                                                {postername}
                                            </span>
                                        </div>
                                        <div className="posting_text_main_profile_tags">
                                            <span>{postercareer}</span>
                                            <span>{posterjob}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="posting_page_left_post_info">
                                    <div className="posting_text_main_another_like">
                                        <button className="posting_text_main_another_button">
                                            <svg
                                            width={20} height = {20}
                                            viewBox="0 0 24 24"
                                            >
                                                <path
                                                fill="currentColor"
                                                d = "M12.563 2.5c0-2.424 3.201-3.043 4.521-.974.446.7.62 1.499.56 2.358-.07 1.008-.451 2.047-1.039 3.081-.055.097-.11.192-.167.285H22a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.08.335l-3 6a.75.75 0 0 1-.67.415h-7a.75.75 0 1 1 0-1.5h6.536l2.714-5.427V8.75H15a.75.75 0 0 1-.574-1.232 10.286 10.286 0 0 0 .875-1.293c.486-.857.795-1.697.847-2.445.039-.555-.066-1.035-.328-1.447-.564-.883-1.758-.652-1.758.167 0 .875-.302 1.666-.798 2.357-.292.409-.588.7-.88.923C10.712 6.786 9.66 7.677 9.1 8.426l.067-.082a.752.752 0 0 1-.137.186l-.016.014c-.21.298-.264.453-.264.467a.75.75 0 0 1-1.5 0c0-.079.01-.165.029-.26L2.75 8.75v11.5h4.5v-8.125a.75.75 0 1 1 1.5 0V21a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V8A.75.75 0 0 1 2 7.25h6.12c.71-.844 1.838-1.76 3.414-2.702.113-.089.31-.284.511-.564.327-.456.518-.955.518-1.484z"
                                                ></path>
                                            </svg>
                                            <span>{postlikenum}</span>
                                        </button>
                                    </div>
                                    <div className="posting_text_main_another_comment">
                                        <button className="posting_text_main_another_button">
                                            <svg
                                            width={20} height = {20}
                                            viewBox="0 0 24 24"
                                            >
                                                <path
                                                fill="currentColor"
                                                transform="matrix(-1 0 0 1 24 0)"
                                                d = "M9.826 19.561c.71.125 1.438.189 2.174.189 5.912 0 10.75-4.112 10.75-9.25S17.912 1.25 12 1.25c-5.913 0-10.75 4.112-10.75 9.25 0 3.273 1.841 6.389 4.882 7.747a.75.75 0 0 0 .611-1.37C4.267 15.772 2.75 13.205 2.75 10.5c0-4.251 4.116-7.75 9.25-7.75 5.133 0 9.25 3.5 9.25 7.75s-4.117 7.75-9.25 7.75c-.747 0-1.482-.074-2.194-.22a.75.75 0 0 0-.578.12l-4.656 3.234a.75.75 0 0 0 .856 1.232l4.398-3.055z"
                                                ></path>
                                            </svg>
                                            <span>{postcommentNum}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="posting_page_main_right">
                            <div className="posting_text_main">
                                <div className="posting_text_main_profile">
                                    <div
                                    style={{backgroundImage: `url(${posterImg})`}}
                                    className="posting_text_main_profile_img"></div>
                                    <div className="posting_text_main_profile_desc">
                                        <div className="posting_text_main_profile_desc_top">
                                            <span className="posting_text_main_profile_name">
                                                {postername}
                                            </span>
                                            <div className="posting_text_main_profile_tags">
                                                <span>{postercareer}</span>
                                                <span>{posterjob}</span>
                                            </div>
                                        </div>
                                        <div className="posting_text_main_profile_time">
                                            {posterdate}
                                        </div>
                                    </div>
                                </div>
                                <div className="posting_text_main_text_wrap">
                                    <div className="posting_text_main_text_title">
                                        {posttitle}
                                    </div>
                                    <div className="posting_text_main_text_desc">
                                        {postcontent}
                                    </div>
                                </div>
                                <ul className="posting_text_main_tags">
                                    {
                                        posttags.map((tags) => (
                                            <li
                                            key={tags.ctIdx}
                                            className="posting_text_main_tag">
                                                {tags.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="posting_text_main_another">
                                    <div className="posting_text_main_another_like">
                                        <button className="posting_text_main_another_button">
                                            <svg
                                            width={24} height = {24}
                                            viewBox="0 0 24 24"
                                            >
                                                <path
                                                fill="currentColor"
                                                d = "M12.563 2.5c0-2.424 3.201-3.043 4.521-.974.446.7.62 1.499.56 2.358-.07 1.008-.451 2.047-1.039 3.081-.055.097-.11.192-.167.285H22a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.08.335l-3 6a.75.75 0 0 1-.67.415h-7a.75.75 0 1 1 0-1.5h6.536l2.714-5.427V8.75H15a.75.75 0 0 1-.574-1.232 10.286 10.286 0 0 0 .875-1.293c.486-.857.795-1.697.847-2.445.039-.555-.066-1.035-.328-1.447-.564-.883-1.758-.652-1.758.167 0 .875-.302 1.666-.798 2.357-.292.409-.588.7-.88.923C10.712 6.786 9.66 7.677 9.1 8.426l.067-.082a.752.752 0 0 1-.137.186l-.016.014c-.21.298-.264.453-.264.467a.75.75 0 0 1-1.5 0c0-.079.01-.165.029-.26L2.75 8.75v11.5h4.5v-8.125a.75.75 0 1 1 1.5 0V21a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V8A.75.75 0 0 1 2 7.25h6.12c.71-.844 1.838-1.76 3.414-2.702.113-.089.31-.284.511-.564.327-.456.518-.955.518-1.484z"
                                                ></path>
                                            </svg>
                                            <span>{postlikenum}</span>
                                        </button>
                                    </div>
                                    <div className="posting_text_main_another_comment">
                                        <button className="posting_text_main_another_button">
                                            <svg
                                            width={24} height = {24}
                                            viewBox="0 0 24 24"
                                            >
                                                <path
                                                fill="currentColor"
                                                transform="matrix(-1 0 0 1 24 0)"
                                                d = "M9.826 19.561c.71.125 1.438.189 2.174.189 5.912 0 10.75-4.112 10.75-9.25S17.912 1.25 12 1.25c-5.913 0-10.75 4.112-10.75 9.25 0 3.273 1.841 6.389 4.882 7.747a.75.75 0 0 0 .611-1.37C4.267 15.772 2.75 13.205 2.75 10.5c0-4.251 4.116-7.75 9.25-7.75 5.133 0 9.25 3.5 9.25 7.75s-4.117 7.75-9.25 7.75c-.747 0-1.482-.074-2.194-.22a.75.75 0 0 0-.578.12l-4.656 3.234a.75.75 0 0 0 .856 1.232l4.398-3.055z"
                                                ></path>
                                            </svg>
                                            <span>{postcommentNum}</span>
                                        </button>
                                    </div>
                                    <div className="posting_text_main_another_share">
                                        <button className="posting_text_main_another_button">
                                            <svg
                                            width={20} height = {20}
                                            viewBox="0 0 19 19"
                                            >
                                                <path
                                                fill="currentColor"
                                                d = "M5.336 7.75c-.551-.703-1.418-1.136-2.365-1.136C1.337 6.614 0 7.898 0 9.494c0 1.596 1.336 2.879 2.971 2.879.93 0 1.785-.419 2.338-1.102l8.495 4.482c.128.068.276.092.42.068l.025-.004c.213-.036.395-.173.489-.367.101-.21.249-.393.437-.54.673-.526 1.643-.407 2.168.266.526.673.407 1.643-.265 2.167-.673.526-1.643.407-2.168-.266-.226-.29-.644-.34-.933-.115-.29.226-.34.644-.115.933.977 1.251 2.783 1.473 4.034.496 1.25-.976 1.472-2.782.495-4.033-.977-1.251-2.783-1.473-4.033-.496-.169.132-.32.28-.454.442L5.478 9.858c-.322-.241-.816-.145-1 .255-.259.558-.844.93-1.507.93-.913 0-1.642-.7-1.642-1.55 0-.849.73-1.55 1.642-1.55.636 0 1.2.343 1.473.863.107.368.526.64.954.413l9.026-4.762.118-.079.029-.024c.233-.197.303-.527.169-.8-.104-.212-.158-.442-.158-.68 0-.853.692-1.545 1.544-1.545.853 0 1.545.692 1.545 1.544 0 .854-.691 1.545-1.545 1.545-.367 0-.664.297-.664.664 0 .367.297.665.664.665C17.714 5.747 19 4.46 19 2.873 19 1.287 17.713 0 16.126 0c-1.586 0-2.873 1.287-2.873 2.873 0 .224.026.445.076.66L5.336 7.748z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="posting_text_main_another_others">
                                        <button
                                        onClick={others_menu_on}
                                        className="posting_text_main_another_button">
                                            <svg
                                            width={24} height = {24}
                                            viewBox="0 0 24 24"
                                            >
                                                <path
                                                fill="currentColor"
                                                d = "M12 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 12 10zm7 0a2 2 0 1 1-.001 4.001A2 2 0 0 1 19 10zM5 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 5 10z"
                                                ></path>
                                            </svg>
                                        </button>
                                        <div className={others_menu_lists}>
                                            {
                                                posterIdx === userIdx
                                                ?<ul>
                                                    <li
                                                    onClick={move_delete}
                                                    className="others_menu_list red">
                                                        삭제하기
                                                    </li>
                                                    <li
                                                    onClick={move_edit_page}
                                                    className="others_menu_list">
                                                        수정하기
                                                    </li>
                                                </ul>
                                                :<ul>
                                                    <li className="others_menu_list red">
                                                        게시글 신고하기
                                                    </li>
                                                    <li className="others_menu_list red">
                                                        사용자 신고하기
                                                    </li>
                                                </ul>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="posting_text_comment_wrap">
                                {
                                    postcommentNum > 0
                                    ?<ul className="posting_text_comment_lists">
                                        {
                                            postcommentList.map((comment) => (
                                                <li
                                                key={comment.commentIdx}
                                                className="posting_text_comment_list">
                                                    <div className="posting_text_no_comment_user_wrap">
                                                        <div
                                                        style={{backgroundImage: `url(${comment.profileUrl})`}}
                                                        className="posting_text_main_profile_img"></div>
                                                        <div className="posting_text_main_profile_name">
                                                            {comment.name}
                                                        </div>
                                                        <div className="posting_text_main_profile_time">
                                                            <span>·</span>{comment.date}
                                                        </div>
                                                    </div>
                                                    <div className="posting_text_comment_desc">
                                                        {comment.content}
                                                    </div>
                                                </li>
                                            ))

                                        }
                                    </ul>
                                    :<div className="posting_text_no_comment_wrap">
                                    <img src="https://static.wanted.co.kr/images/community/community-3d-comment.png" alt="" />
                                    <span>첫 댓글을 남겨주세요.</span>
                                </div>
                                }

                                {
                                    isLogind
                                    ?<div className="posting_text_no_comment_user_wrap">
                                        <div
                                        className="posting_text_main_profile_img"
                                        style={{backgroundImage: `url(${userImg})`}}
                                        ></div>
                                        <div className="posting_text_main_profile_name">
                                            {username}
                                        </div>
                                    </div>
                                    :null
                                }
                                <div className="posting_text_comment_login">

                                    {
                                    isLogind
                                    ?"댓글 남기기"
                                    :"로그인 후 댓글 남기기"
                                    }
                                </div>
                                <button
                                className="move_to_lists"
                                >
                                    <svg
                                    width={6} height = {10}
                                    viewBox="0 0 6 10"
                                    >
                                        <path
                                        fill="currentColor"
                                        d = "M1.94054 5L5.66021 1.28033C5.95311 0.987437 5.95311 0.512563 5.66021 0.21967C5.36732 -0.0732233 4.89245 -0.0732233 4.59955 0.21967L0.349553 4.46967C0.0566595 4.76256 0.0566595 5.23744 0.349553 5.53033L4.59955 9.78033C4.89245 10.0732 5.36732 10.0732 5.66021 9.78033C5.95311 9.48744 5.95311 9.01256 5.66021 8.71967L1.94054 5Z"
                                        ></path>
                                    </svg>
                                    목록으로
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}