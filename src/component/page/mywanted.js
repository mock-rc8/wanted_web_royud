import Header from "../common/header"
import { Login_profile, isLogin } from "../../recoil/recoil"
import { useEffect, useState } from "react"

import { useRecoilValue } from "recoil"

import axios from "axios"

export default function MyWantedPage(){
    const user_profile = useRecoilValue(Login_profile);
    const userImg = user_profile.imgUrl;
    const userName = user_profile.name;
    const userEmail = user_profile.email;
    const userPhone = user_profile.phone;

    const url = "https://prod.serverhwan.shop"

    const myWantedData = async() => {
        try{
            const data = await axios({
                method: "get",
                url: `${url}/wanted/${localStorage.getItem("userIdx")}`,
                headers: {
                    "X-ACCESS-TOKEN" : localStorage.getItem("token"),
                    userIdx : localStorage.getItem("userIdx")
                }
            })
            console.log(data);
        }
        catch(err){
        }
    }
    
    useEffect(() => {
        if(isLogin){
            myWantedData();
        }
    } ,[])
    return (
        <div className="MyWantedPage">
            <Header />
            <div className="MyInfo_Main">
                <div className="MyInfo_Main_wrap">
                    <div className="MyInfo_Main_title">
                        MY 원티드
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}