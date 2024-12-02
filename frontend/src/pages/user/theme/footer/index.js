import { memo } from "react";
import './styles.scss'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";



const Footer = () => {
    return (
        <div className="header_footer">
            <div className="container">
                <div className="row">
                    {/* Cột bên trái */}
                    <div className="col-6 header_footer_left">
                        <h3>Về chúng tôi</h3>
                        <p>
                            Project manage là dự án được phát triển bởi 4 thanh niên đẹp trai
                            (do Hữu Vang cầm đầu), ngành khoa học dữ liệu, Đại học Khoa học
                            Tự nhiên, ĐHQG Hà Nội.
                        </p>
                    </div>
                    
                    {/* Cột bên phải */}
                    <div className="col-6 header_footer_right">
                        <h3>Thông tin liên hệ</h3>
                        <p>Email: thukyvu@gamil.com</p>
                        <p>Phone: 0123321123</p>
                        <div className="social_links">
                            <a
                            href="https://www.facebook.com/profile.php?id=100030077586675" 
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                <FaFacebook />
                            </a>
                            <a
                            href="https://www.instagram.com/dauvanthach/" 
                            target="_blank"
                            rel="noopener noreferrer"   
                            ><FaInstagramSquare /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
