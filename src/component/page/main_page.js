import Header from "../common/header"
import Footer from "../common/footer"


function PageMain(){
    return (
        <main>
            <div className='main_page'>
                <div className='slider_wrap'>

                </div>
                <div className='section'>
                    <div className='section_wrap'>

                    </div>
                </div>
                <div className='creater_baner'>

                </div>
                <div className='section'>
                    <div className='section_wrap'>

                    </div>
                </div>
                <div className='section_bar'></div>
                <div className='section'>
                    <div className='section_wrap'>

                    </div>
                </div>
                <div className='section_button'></div>
                <div className='section'>
                    <div className='section_wrap'>

                    </div>
                </div>
                <div className='subscribe_promotion'></div>
                <div className='section'>
                    <div className='section_wrap'>

                    </div>
                </div>
            </div>
    </main>
    )
}

export default function MainPage(){
    return(
        <div className="Mainpage">
            <Header />
            <PageMain />
            <Footer />
        </div>
    )
}