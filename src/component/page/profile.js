import Header from "../common/header"
import { Login_profile } from "../../recoil/recoil"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export default function ProfilePage(){
    const user_profile = useRecoilValue(Login_profile);
    const userImg = user_profile.imgUrl;
    const userName = user_profile.name;
    const userEmail = user_profile.email;
    const userPhone = user_profile.phone;
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
                                        {userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
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