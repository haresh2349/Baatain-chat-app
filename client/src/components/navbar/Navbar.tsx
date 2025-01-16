import Styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci";
export const WebNavbar = () => {
    return <nav className={Styles.container}>
        <div className={Styles.nav_left}>
            <div className={Styles.searchbar}>
                <div>
                    <CiSearch/>
                    <input placeholder="Search name here" className={Styles.searchbar_input}/>
                </div>
            </div>
        </div>
        <div className={Styles.nav_right}>
            <div className={Styles.user_wrapper}>
                <div>
                    <p className={Styles.user_name}>Haresh Solanki</p>
                    <span className={Styles.user_status}>Active</span>
                </div>
                <div className={Styles.profile_image_wrapper}>
                    <img src="https://www.iconpacks.net/icons/5/free-no-profile-picture-icon-15257-thumb.png"/>
                </div>
            </div>
        </div>
    </nav>
}
// className={Styles.}