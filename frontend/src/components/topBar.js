import { memo, useState, useEffect } from "react";
import "../styles/TopBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";

const TopBar = () => {
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
          <div className="header-top-left">
            <div className="menu-icon" aria-label="Menu" role="button" tabIndex={0}>
              <HiBars3 />
            </div>
            <div className="logo">LOGO</div>
          </div>

          {/* Middle Section */}
          <div className="header-top-mid">
            <form>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="search-input"
                aria-label="Search"
              />
              <button
                type="submit"
                className="search-icon-btn"
                aria-label="Search Button"
                role="button"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="header-top-right">
            <div className="icon" aria-label="Notifications" role="button" tabIndex={0}>
              <BsBell />
            </div>
            <div className="icon" aria-label="User Profile" role="button" tabIndex={0}>
              <FaRegUserCircle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(TopBar);
