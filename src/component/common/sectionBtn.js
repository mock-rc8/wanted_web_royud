

export default function SectionButton(props){
    const ico  = props.ico;
    const desc = props.desc;
    return (
        <div className='section_button'>
            {
                // ico === "Magnifying Glass"
                // ?<svg
                // style={{color:"#fff"}}
                // width = "28" height="28"
                // viewBox="0 0 28 28"
                // >
                //     <path d="M0 0h28v28H0z"></path>
                // </svg>
                // :null
            }
            {desc}
        </div>
    )
}