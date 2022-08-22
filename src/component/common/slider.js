import { useEffect, useState } from "react"

function SliderList(props){

    const img_src = props.img_src;
    const title = props.title;
    const subtitle = props.subtitle;
    const thisClass = props.thisClass;

    return (
        <li className= {thisClass}>
            <img
            src= {img_src}
            alt=""
            />
            {
                thisClass === "slider_list current"
                ?<div className="slider_list_desc_wrap">
                    <div className="slider_list_desc_title">
                        {title}
                    </div>
                    <div className="slider_list_desc_subtitle">
                        {subtitle}
                    </div>
                    <div className="slider_list_desc_bar"></div>
                    <div className="slider_list_desc_btn">
                        <span>
                            바로 가기
                            <svg>
                                <path
                                d = "m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"
                                ></path>
                            </svg>
                        </span>

                    </div>
                </div>
                :null
            }
        </li>
    )
}

export default function Slider(props){

    const slide_img_list = props.slide_img_list;

    const move_std = -(1060 + 12 * 2);
    const IntervalTime = 5000;
    const ani_time = 0.5;
    const [slider_trans, set_slider_trans] = useState(400);
    
    const [transition_style, set_transition_style] = useState(`transform ${ani_time}s`)

    const [currentIdx, setCurrentIdx] = useState(0);
    const [slideIdx, setSlideIdx] = useState(1);

    const fake_slide_box = [
        slide_img_list[slide_img_list.length - 2],
        slide_img_list[slide_img_list.length - 1],
        ...slide_img_list,
        slide_img_list[0],
        slide_img_list[1]
    ];
    const slideLeftFake = () => {
        setSlideIdx(slideIdx - 1)
        setTimeout(() => {
            setSlideIdx(slide_img_list.length)
            set_transition_style("")
        }, ani_time * 1000);
    }

    const slideRightFake = () => {
        setSlideIdx(slideIdx + 1)
        setTimeout(() => {
            setSlideIdx(1)
            set_transition_style("")
        }, ani_time * 1000);
    }
    const setani = () => {
        set_transition_style("transform 0.5s")
    }
    const slide_move_left = () => {
        setCurrentIdx(currentIdx - 1);
        setSlideIdx(slideIdx - 1)
        if(currentIdx === 0){
            setCurrentIdx(slide_img_list.length - 1);
            slideLeftFake();
        };
        if(slideIdx === 1 || slideIdx === slide_img_list.length){
            setani();
        }
    }
    const slide_move_right = () => {
        setCurrentIdx(currentIdx + 1);
        setSlideIdx(slideIdx + 1)
        if(currentIdx === slide_img_list.length - 1){
            setCurrentIdx(0);
            slideRightFake();
        };
        if(slideIdx === 1 || slideIdx === slide_img_list.length){
            setani();
        }
    }
    useEffect(() => {
        const loop = setInterval(() => {
            slide_move_right();
        }, IntervalTime);
        return () => clearInterval(loop);
    }, [currentIdx, slideIdx])

    return (
        <div className='slider_wrap'>
            <ul
            className="slider_lists"
            style={{
                transform: `translateX(${slider_trans + move_std + slideIdx * move_std}px)`,
                transition: transition_style
            }}
            >
                {
                    fake_slide_box.map((slide) => (
                        slideIdx === slide_img_list.indexOf(slide) + 1
                        ?<SliderList
                        key = {Math.random()}
                        thisClass = "slider_list current"
                        id = {slide.bannerIdx}
                        img_src = {slide.imageUrl}
                        title = "WONDER PEOPLE"
                        subtitle = "세상을 바꿀 위대한 게임을 만듭니다."
                        />
                        :<SliderList
                        key = {Math.random()}
                        thisClass = "slider_list"
                        id = {slide.bannerIdx}
                        img_src = {slide.imageUrl}
                        title = "WONDER PEOPLE"
                        subtitle = "세상을 바꿀 위대한 게임을 만듭니다."
                        />
                        
                    ))
                }
            </ul>
            <div className="slide_btn left"
            onClick={slide_move_left}
            >
                <svg>
                    <path
                    d = "m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"
                    ></path>
                </svg>
            </div>
            <div className="slide_btn right"
            onClick={slide_move_right}
            >
                <svg>
                    <path
                    d = "m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"
                    ></path>
                </svg>
            </div>
        </div>
    )
}