import { BsCameraVideoFill } from "react-icons/bs"
import Styles from "./chat-card.module.css"
import { IoIosCall } from "react-icons/io"
import { FaPlus, FaRegSmile } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6"
import { FiPlus } from "react-icons/fi"
export const ChatCard = () => {
    return <div className={Styles.container}>
        <header className={Styles.header}>
            <div className={Styles.h_left}>
                <div className={Styles.img_wrapper}>
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1009013439.1731438406&semt=ais_hybrid"/>
                </div>
                <div>
                    <p className={Styles.user_name}>Haresh Solanki</p>
                    <span className={Styles.user_status}>Active</span>
                </div>
            </div>
            <div className={Styles.h_right}>
                <BsCameraVideoFill color="#535ACB" size={"1.2rem"} style={{cursor:"pointer"}}/>
                <IoIosCall color="#535ACB" size={"1.2rem"} style={{cursor:"pointer"}}/>
            </div>
        </header>
        <section className={Styles.section}></section>
        <footer className={Styles.footer}>
            <div className={Styles.input_wrapper}>
                <input placeholder="Type your message here..."/>
            </div>
            <div className={Styles.msg_controllers}>
                <FaRegSmile color="#535ACB" size={"1.2rem"} style={{cursor:"pointer"}}/>
                <FiPlus color="#535ACB" size={"1.2rem"} style={{cursor:"pointer"}}/>
                <div className={Styles.arrow_wrapper}>
                    <FaArrowRightLong color="#FFF" />
                </div>
            </div>
        </footer>
    </div>

}