import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/header"


export default function CommuEditPage(){
    const params = useParams();
    const paramsInt = parseInt(params.postIdx);
    const [title_value, set_title_value] = useState("");
    const [desc_value, set_desc_value] = useState("");
    // -------------------------------------------------------------
    const input_title_value = (e) => {
        set_title_value(e.target.value)
    }
    const input_desc_value = (e) => {
        set_desc_value(e.target.value);
    }
    // -------------------------------------------------------------
    const height_std = 28;
    const [desc_value_line, set_desc_value_line] = useState(1);

    useEffect(() => {
        if(desc_value !== undefined){
            const line = desc_value.split("\n").length;
            set_desc_value_line(line)
        }
    }, [desc_value])
    // -------------------------------------------------------------
    const url = "https://prod.serverhwan.shop";
    const [tag_of_all, set_tag_of_all] = useState([]);
    const [tag_of_touch, set_tag_of_touch] = useState([]);
    const [tag_of_interest, set_tag_of_interest] = useState([]);
    const [tag_of_trend, set_tag_of_trend] = useState([]);
    //태그 조회 api
    const tag_view = async() => {
        try{
            const data = await axios({
                method: "get",
                url: `${url}/wanted/tags/${localStorage.getItem("userIdx")}`,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("token"),
                    userIdx: localStorage.getItem("userIdx"),
                }
            })
            set_tag_of_all(data.data.result.interestTags)
            set_tag_of_touch(data.data.result.interestTags[0].tags)
            set_tag_of_interest(data.data.result.interestTags[1].tags)
            set_tag_of_trend(data.data.result.interestTags[2].tags)
        }
        catch(err){

        }
    }

    useEffect(() => {
        tag_view()
    }, [])
    // -------------------------------------------------------------
    const [tag_popup_on ,set_tag_popup_on] = useState(false);
    const tag_popup_active = () => {
        set_tag_popup_on(true);
    }
    // -------------------------------------------------------------
    const [selected_all_tags, set_selected_all_tags] = useState([]);
    const [selected_tags, set_selected_tags] = useState([]);
    const [tag_popup_bottom_on, set_tag_popup_bottom_on] = useState("tag_popup_bottom");
    const tags_active = (e) => {
        switch(e.target.className){
            case "tag_popup_main_list":
                if(selected_tags.length < 3){
                    const added_arr = [...selected_tags, parseInt(e.target.id)]
                    set_selected_tags(added_arr);
                    e.target.className = "tag_popup_main_list Active";
                }
                break;
            case "tag_popup_main_list Active":
                const filtered_arr = selected_tags.filter(int => int !== parseInt(e.target.id))
                set_selected_tags(filtered_arr);
                e.target.className = "tag_popup_main_list";
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if(selected_tags.length > 0){
            set_tag_popup_bottom_on("tag_popup_bottom Active");
        } else {
            set_tag_popup_bottom_on("tag_popup_bottom")
        }
    }, [selected_tags])

    const tag_popup_disabled = () => {
        set_selected_all_tags(selected_tags)
        set_tag_popup_on(false);
    }
    const tag_all_selected = () => {
        set_selected_all_tags(selected_tags)
        tag_popup_disabled();
    }
    // -------------------------------------------------------------
    // 삭제 함수
    const tag_deleted = (idx) => {
        // const deleted_arr = selected_all_tags.filter(tags => tags === idx)
        // set_selected_all_tags(deleted_arr);
    }
    // -------------------------------------------------------------
    const [posting_tag_data, setposting_tag_data] = useState([]);
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
            // console.log(data.data.result.postingMore.tags);
            set_title_value(data.data.result.postingMore.title);
            set_desc_value(data.data.result.postingMore.content);
            setposting_tag_data(data.data.result.postingMore.tags);
        }
        catch(err){

        }
    }

    const all_tags = [...tag_of_touch, ...tag_of_interest, ...tag_of_trend]
    let data = selected_all_tags
    useEffect(() => {
        postViewData_Login();
        for(let i = 0; i < all_tags.length; i++){
            for(let j = 0; j < posting_tag_data.length; j++){
                if(all_tags[i].name === posting_tag_data[j].name){
                    data = [...data, all_tags[i].tagIdx]
                }
            }
        }
        set_selected_tags(data);
        set_selected_all_tags(data)
        console.log(selected_all_tags);
    }, [tag_of_touch, tag_of_interest, tag_of_trend])

    // -------------------------------------------------------------
    const [commu_write_top_btn, set_commu_write_top_btn] = useState("commu_write_top_btn");
    const new_obj = {
        "postingIdx" : paramsInt,
        "tags": selected_all_tags,
        "title": title_value,
        "content": desc_value
    }

    useEffect(()=> {
        console.log(new_obj);
        if(selected_all_tags.length === 0 || title_value === "" || desc_value === ""){
            set_commu_write_top_btn("commu_write_top_btn")
        }
        if(selected_all_tags.length > 0 && title_value && desc_value){
            set_commu_write_top_btn("commu_write_top_btn Active")
        }
    }, [selected_all_tags, title_value, desc_value])
        // -------------------------------------------------------------
    const write_finished = () => {
        if(commu_write_top_btn === "commu_write_top_btn Active"){
            const formData = new FormData();

            const blob = new Blob([JSON.stringify(new_obj)], {type: "application/json"})
            formData.append("json", blob)


            alert("정상적으로 등록되었습니다.")
            posting_commu(formData);
            window.location.replace("/community")
        }
    }
    const posting_commu = async(formData) => {
        try{
            const data = await axios({
                method: "put",
                url: `${url}/communities/${localStorage.getItem("userIdx")}`,
                mode: "cors",
                data: formData,
                headers: {
                    "X-ACCESS-TOKEN": localStorage.getItem("token"),
                    userIdx: localStorage.getItem("userIdx"),
                    "Content-Type" : "multipart/form-data"
                },
            })
            console.log(data);
        }
        catch(err){

        }
    }
    return (
        <div>
            <Tag_popup_wrap tag_popup_on = {tag_popup_on}>
                <div
                className="tag_popup_bg">
                    <div className="tag_popup">
                        <div className="tag_popup_top">
                            <div className="tag_popup_top_title">태그 선택</div>
                            <div className="tag_popup_top_choice_len">{selected_tags.length}</div>
                            <div
                            onClick={tag_popup_disabled}
                            className="tag_popup_top__disabled_btn">
                                <svg
                                width={24} height={24}
                                >
                                    <path
                                    d = "M17.97 19.03a.749.749 0 1 0 1.06-1.06l-6.5-6.5a.749.749 0 0 0-1.06 0l-6.5 6.5a.749.749 0 1 0 1.06 1.06L12 13.06l5.97 5.97zM12 10.94 6.03 4.97a.749.749 0 1 0-1.06 1.06l6.5 6.5a.749.749 0 0 0 1.06 0l6.5-6.5a.749.749 0 1 0-1.06-1.06L12 10.94z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div className="tag_popup_main">
                            <div className="tag_popup_main_title">
                                작성글 주제에 맞는 태그를 선택해주세요. (1~3개)
                            </div>
                            <ul className="tag_popup_main_list_wrap">
                                {
                                    tag_of_all.map((list) => (
                                        <li
                                        key={list.itIdx}
                                        className="tag_popup_main_list_all">
                                            <div className="tag_popup_main_list_title">
                                                {list.wideTag}
                                            </div>
                                            <ul className="tag_popup_main_lists">
                                                {
                                                    list.tags.map((tags) => (
                                                        selected_all_tags.includes(tags.tagIdx)
                                                        ?<li
                                                        key={tags.tagIdx}
                                                        id = {tags.tagIdx}
                                                        className="tag_popup_main_list Active"
                                                        onClick={tags_active}
                                                        >
                                                            {tags.name}
                                                        </li>
                                                        :<li
                                                        key={tags.tagIdx}
                                                        id = {tags.tagIdx}
                                                        className="tag_popup_main_list"
                                                        onClick={tags_active}
                                                        >
                                                            {tags.name}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={tag_popup_bottom_on}>
                            <button
                            onClick={tag_all_selected}
                            >
                                완료
                            </button>
                        </div>
                    </div>
                </div>
            </Tag_popup_wrap>
            <Header />
            <div className="MyInfo_Main">
                <div className="commu_write_top">
                    <div className="commu_write_top_wrap">
                        <button
                        onClick={write_finished}
                        className={commu_write_top_btn}>
                            등록하기
                        </button>
                    </div>
                </div>
                <div className="commu_write_top_padding"></div>
                <div className="commu_write_main">
                    <div className="commu_write_select_tags_wrap">
                        <div className="commu_write_select_tags_title_wrap">
                            <span className="commu_write_select_tags_title">
                                태그 선택
                            </span>
                            <span className="commu_write_select_tags_sub">
                                (1~3개)
                            </span>
                            <span
                            style={{color: `#fe415c`}}
                            >
                                *
                            </span>
                        </div>
                        <div className="commu_write_select_tags">
                            <button
                            className="commu_write_select_tags_add"
                            onClick={tag_popup_active}
                            >
                                <svg
                                width={34} height={34}
                                viewBox="0 0 34 34"
                                >
                                    <path
                                    fill="#F2F4F7"
                                    d="M0 17C0 7.61116 7.61116 0 17 0V0C26.3888 0 34 7.61116 34 17V17C34 26.3888 26.3888 34 17 34V34C7.61116 34 0 26.3888 0 17V17Z"
                                    ></path>
                                    <path
                                    fill="#666666"
                                    d="M17.7432 10.6482C17.6935 10.2822 17.3797 10 17 10C16.5858 10 16.25 10.3358 16.25 10.75V16.25H10.75L10.6482 16.2568C10.2822 16.3065 10 16.6203 10 17C10 17.4142 10.3358 17.75 10.75 17.75H16.25V23.25L16.2568 23.3518C16.3065 23.7178 16.6203 24 17 24C17.4142 24 17.75 23.6642 17.75 23.25V17.75H23.25L23.3518 17.7432C23.7178 17.6935 24 17.3797 24 17C24 16.5858 23.6642 16.25 23.25 16.25H17.75V10.75L17.7432 10.6482Z"
                                    ></path>
                                </svg>
                            </button>
                            {
                                selected_all_tags.length > 0
                                ?<ul className="selected_all_tags_lists">
                                    {
                                        tag_of_touch.map((tags) => (
                                            selected_all_tags.includes(tags.tagIdx)
                                            ?<li
                                            key={tags.tagIdx}
                                            className="selected_all_tags_list">
                                                {tags.name}
                                                <svg
                                                onClick={tag_deleted(tags.tagIdx)}
                                                width={18} height = {18}
                                                viewBox="0 0 24 24"
                                                >
                                                    <path
                                                    fill="currentColor"
                                                    d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                                    ></path>
                                                </svg>
                                            </li>
                                            :null
                                        ))
                                    }
                                    {
                                        tag_of_interest.map((tags) => (
                                            selected_all_tags.includes(tags.tagIdx)
                                            ?<li
                                            key={tags.tagIdx}
                                            className="selected_all_tags_list">
                                                {tags.name}
                                                <svg
                                                width={18} height = {18}
                                                onClick={tag_deleted(tags.tagIdx)}
                                                viewBox="0 0 24 24"
                                                >
                                                    <path
                                                    fill="currentColor"
                                                    d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                                    ></path>
                                                </svg>
                                            </li>
                                            :null
                                        ))
                                    }
                                    {
                                        tag_of_trend.map((tags) => (
                                            selected_all_tags.includes(tags.tagIdx)
                                            ?<li
                                            key={tags.tagIdx}
                                            className="selected_all_tags_list">
                                                {tags.name}
                                                <svg
                                                width={18} height = {18}
                                                onClick={tag_deleted(tags.tagIdx)}
                                                viewBox="0 0 24 24"
                                                >
                                                    <path
                                                    fill="currentColor"
                                                    d = "M17.97 19.03a.75.75 0 001.06-1.06l-6.5-6.5a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 13.06l5.97 5.97zM12 10.94L6.03 4.97a.75.75 0 00-1.06 1.06l6.5 6.5a.75.75 0 001.06 0l6.5-6.5a.75.75 0 00-1.06-1.06L12 10.94z"
                                                    ></path>
                                                </svg>
                                            </li>
                                            :null
                                        ))
                                    }
                                </ul>
                                :<button
                                onClick={tag_popup_active}
                                style={{backgroundImage: `url(https://static.wanted.co.kr/images/community/tag_empty@3x.png)`}}
                                className="commu_write_select_tags_shadow"></button>
                            }
                            
                        </div>
                    </div>
                    <div className="commu_write_input_title">
                        <input
                        value={title_value}
                        onChange={input_title_value}
                        placeholder="제목을 입력해주세요."
                        />
                    </div>
                    <div className="commu_write_input_desc">
                        <textarea
                        style={{height: `${height_std * desc_value_line}px`}}
                        value = {desc_value}
                        onChange={input_desc_value}
                        placeholder="내용을 작성해주세요."
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Tag_popup_wrap = styled.div`
    position: fixed; left: 0; top: 0; z-index: 3000;
    width: 100%; height: 100%;
    display: ${
        ({tag_popup_on}) => {
            switch(tag_popup_on){
                case true:
                    return "block";
                    break;
                default:
                    return "none"
                break;
            }
        }
    };
`;