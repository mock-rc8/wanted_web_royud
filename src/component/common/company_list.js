export default function CompanyList(props){
    const comp_img = props.comp_img
    const comp_name = props.comp_name;
    const title = props.title;
    const nation = props.nation;
    const region = props.region;
    const reward = props.reward;

    return (
        <li className="company_list">
            <div
            className="company_list_img"
            style={{
                backgroundImage: `url(${comp_img})`
            }}
            >
                {/* <img src={comp_img} alt="" /> */}
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
                    채용 보상금 {reward.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
                </div>
            </div>

        </li>
    )
}