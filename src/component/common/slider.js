import { useEffect, useState } from "react"

import slideBox from "../../db/slide.json"

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
                        <span>바로 가기</span>
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
        slideBox[slideBox.length - 2],
        slideBox[slideBox.length - 1],
        ...slideBox,
        slideBox[0],
        slideBox[1]
    ];
    const slideLeftFake = () => {
        setSlideIdx(slideIdx - 1)
        setTimeout(() => {
            setSlideIdx(slideBox.length)
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
            setCurrentIdx(slideBox.length - 1);
            slideLeftFake();
        };
        if(slideIdx === 1 || slideIdx === slideBox.length){
            setani();
        }
    }
    const slide_move_right = () => {
        setCurrentIdx(currentIdx + 1);
        setSlideIdx(slideIdx + 1)
        if(currentIdx === slideBox.length - 1){
            setCurrentIdx(0);
            slideRightFake();
        };
        if(slideIdx === 1 || slideIdx === slideBox.length){
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
                        slideIdx === slide.id
                        ?<SliderList
                        key = {Math.random()}
                        thisClass = "slider_list current"
                        id = {slide.id}
                        img_src = {slide.img}
                        title = {slide.title}
                        subtitle = {slide.subtitle}
                        />
                        :<SliderList
                        key = {Math.random()}
                        thisClass = "slider_list"
                        id = {slide.id}
                        img_src = {slide.img}
                        title = {slide.title}
                        subtitle = {slide.subtitle}
                        />
                        
                    ))
                }
            </ul>
            <div className="slide_btn left"
            onClick={slide_move_left}
            ></div>
            <div className="slide_btn right"
            onClick={slide_move_right}
            ></div>
        </div>
    )
}