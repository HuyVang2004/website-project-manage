import { memo, useState, useEffect, useCallback, useRef } from "react";
import "../../styles/TopBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';
import Notifications from "./Notification";
import User from "./User";

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for click outside detection
  const notificationRef = useRef(null);
  const settingRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const settingButtonRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const thongbao = useCallback(() => {
    setNotification(prev => !prev);
    // Close settings panel when opening notifications
    if (!isNotification) {
      setIsSetting(false);
    }
  }, [isNotification]);

  const caidat = useCallback(() => {
    setIsSetting(prev => !prev);
    // Close notifications panel when opening settings
    if (!isSetting) {
      setNotification(false);
    }
  }, [isSetting]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside notification panel
      if (isNotification && 
          notificationRef.current && 
          !notificationRef.current.contains(event.target) &&
          !notificationButtonRef.current.contains(event.target)) {
        setNotification(false);
      }

      // Check if click is outside settings panel
      if (isSetting && 
          settingRef.current && 
          !settingRef.current.contains(event.target) &&
          !settingButtonRef.current.contains(event.target)) {
        setIsSetting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotification, isSetting]);

  const menuItems = [
    { icon: <Home />, text: "Tổng Quan", href: "http://localhost:3000/trangchu" },
    { icon: <FileText />, text: "Dự Án", href: "http://localhost:3000/duan" },
    { icon: <Target />, text: "Nhiệm Vụ", href: "/" },
    { icon: <BarChart2 />, text: "Báo Cáo", href: "#" },
    { icon: <Users />, text: "Mọi Người", href: "#" },
    { icon: <Plus />, text: "Tạo Mới", href: "#" },
    { icon: <HelpCircle />, text: "Trợ Giúp", href: "#" },
  ];

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
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <div className="icon">{item.icon}</div>
                        <a href={item.href}>
                          <div className="text">{item.text}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="logo">
              <a href="http://localhost:3000/trangchu">LOGO</a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="col-mid header-top-mid">
            <form>
              <input type="text" placeholder="Tìm kiếm..." />
              <button type="submit" className="submit">
                <CiSearch />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="col-right header-top-right">
            <div className="icon" aria-label="Notifications" role="button" tabIndex={0}>
              <div 
                ref={notificationButtonRef}
                className={`chuong-icon ${isNotification ? 'open' : ''}`} 
                onClick={thongbao}
              >
                <BsBell />
                {isNotification && (

//                   <div ref={notificationRef} className="chuong">
//                     <Notifications notifications={notificationsData} />
                  <div className="chuong">
                    <Notifications />
                  </div>
                )}
              </div>
            </div>
            <div className="icon" aria-label="User Profile" role="button" tabIndex={0}>
              <div 
                ref={settingButtonRef}
                className={`caidat-icon ${isSetting ? 'open' : ''}`} 
                onClick={caidat}
              >
                <FaRegUserCircle />
                {isSetting && (
                  <div ref={settingRef} className="setting">
                    <User />
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