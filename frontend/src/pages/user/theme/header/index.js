import { memo } from "react";
import './styles.scss'
import { HiBars3 } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";




const Header = () => {
    return (
       <div className="header_top">
         <div className="container">
            <div className="row">
                <div className=" col-left header_top_left">
                        <ul>
                            <li><HiBars3 /></li>
                            <li>LOGO</li>
                        </ul>
                </div>
                <div className="col-mid header_top_mid">
                    <form>
                        <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                        <button type="submit" className="search-icon-btn">
                                <FaSearch /> 
                        </button>
                    </form>
                    
                </div>

                <div className=" col-right header_top_right">
                        
                        <ul>
                            <li><BsBell /></li>
                            <li><FaRegUserCircle /></li>
                        </ul>
                </div>
                <div className=" col-4 header_top_mid">
                    
                </div>
            </div>
         </div>
       </div>
    )
};
export default memo(Header);