import Header from "../common/header"
import CompanyList from "../common/company_list";

import { nowPage } from "../../recoil/recoil";
import { useRecoilState, useRecoilValue } from "recoil";

import axios from "axios";
import { useEffect, useState } from "react";


export default function BookmarksPage(){
    const [nowPaged, set_nowPaged] = useRecoilState(nowPage);

    useEffect(() => {
        set_nowPaged("/bookmarks")
    }, [])

    const url = "https://prod.serverhwan.shop";
    const [bookmark_lists, set_bookmark_lists] = useState([]);


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
            set_bookmark_lists(data.data.result)
        }
        catch(err){

        }
    }
    useEffect(() => {
        bookmarkSearch();
    }, [])
    return (
        <div>
            <Header />

            <div className="MyInfo_Main">
                <div className="MyInfo_Main_wrap">
                    <div className="BookmarksPage">
                        <div className="MyInfo_Main_title">
                            북마크
                        </div>
                        <div className="company_list_main">
                            <div className="company_list_main_wrap">
                                <ul className="company_lists">
                                    {
                                        bookmark_lists.map((list) => {
                                            return <CompanyList
                                            key = {list.employmentIdx}
                                            idx = {list.employmentIdx}
                                            isBookmark = {1}
                                            comp_img = {list.employmentImg}
                                            title  = {list.employment}
                                            comp_name = {list.company}
                                            nation = {list.nation}
                                            region = "서울"
                                            reward = {list.compensation}
                                            />
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}