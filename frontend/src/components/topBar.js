import { memo, useState, useEffect } from "react";
import "../styles/TopBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const[isNotification,  setNotification] = useState(false);
  const thongbao = () => {
    setNotification(!isNotification);
  }
  const [isSetting, setIsSetting] = useState(false);
  const caidat = () => {
    setIsSetting(!isSetting);
  }
  
  // State để theo dõi cuộn trang
  const [scrolled, setScrolled] = useState(false);

  // useEffect để theo dõi khi người dùng cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Khi cuộn xuống hơn 50px, thay đổi trạng thái
    };

    window.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn trang
    return () => {
      window.removeEventListener("scroll", handleScroll); // Dọn dẹp sự kiện khi component unmount
    };
  }, []);

  return (
    <header className={`header-top ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-left header-top-left">
            <div className="menu-icon" aria-label="Menu" role="button" tabIndex={0}>
              <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <HiBars3 />
                {isMenuOpen && (
                  <ul className="menu-list">
                    <li>
                      <div className="icon"><Home /> </div>
                      <a href="http://localhost:3000/">
                      <div className="text">Tổng Quan</div>
                      </a>
                    </li>
                    <li>
                       <div className="icon"> <FileText /> </div>
                       <a href="http://localhost:3000/duan">
                       <div className="text">  Dự Án</div>
                       </a>
                    </li> 
                    <li>
                      <div className="icon"> <Target /> </div>  
                      <a href="/">
                      <div className="text">  Nhiệm Vụ</div>
                      </a>
                      
                    </li>
                    <li> 
                      <div className="icon"> <BarChart2 /> </div>
                      <div className="text">  Báo Cáo</div>
                    </li>
                    <li> 
                      <div className="icon"> <Users /> </div>
                      <div className="text">  Mọi Người</div>
                    </li>
                    <li> 
                      <div className="icon"> <Plus /> </div>  
                      <div className="text">  Tạo Mới</div>
                    </li>
                    <li> 
                      <div className="icon"> <HelpCircle /> </div>
                      <div className="text">  Trợ Giúp</div>
                    </li>
                  </ul>
                )}
              </div>  
            </div>
            <div className="logo">
              <a href="http://localhost:3000/">
                LOGO
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="col-mid header-top-mid">
            <form>
              <input
                type="text"
                placeholder="Tìm kiếm..."
              />
              <button type="submit" className="submit">
              <CiSearch />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="col-right header-top-right">
            <div className="icon" aria-label="Notifications" role="button" tabIndex={0}>
              <div className={ `chuong-icon ${isNotification ? 'open':''}`} onClick={thongbao}>
              <BsBell /> 
              {isNotification && (
                <div className="chuong">
                  <div className="thongbao">THÔNG BÁO</div>
                  <div className="duongke" /> 
                  <div className="danhsachthongbao">Danh sách thông báo</div>
                </div>
              )}
              </div>
            </div>
            <div className="icon" aria-label="User Profile" role="button" tabIndex={0}>
              <div className={`caidat-icon ${isSetting ? 'open' :''}`} onClick={caidat}>
              <FaRegUserCircle />
              {isSetting && (
                <div className="setting">
                  <div className="profile">Thong tin tai khoan</div>
                  <div className="duongke" /> 
                  <div className="logout">Log out</div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(TopBar);
