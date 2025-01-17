import { memo, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TopBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';
import Notifications from "./Notification";
import User from "./User";
import SearchDropdown from "./SearchDropdown";
import { ROUTERS } from "../../utils/router";
const TopBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Refs for click outside detection
  const notificationRef = useRef(null);
  const settingRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const settingButtonRef = useRef(null);
  const searchInputRef = useRef(null);

  const getSearchableData = useCallback(() => {
    try {
      // Lấy dữ liệu từ localStorage
      const projectsData = JSON.parse(localStorage.getItem('projects')) || [];
      
      // Format dữ liệu project
      const formattedProjects = projectsData.map(project => ({
        id: project.projectId,
        projectId: project.projectId,
        title: project.projectName,
        description: project.description,
        type: 'project',
        status: project.status,
        dueDate: project.endDate,
        teamMembers: project.teamMembers || []
      }));
      
      return formattedProjects;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }, []);

  const performSearch = useCallback((query) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const allData = getSearchableData();
      
      const results = allData.filter(item => {
        const searchLower = query.toLowerCase();
        return (
          item.title?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.status?.toLowerCase().includes(searchLower)
        );
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  }, [getSearchableData]);

  // Handle search input change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
        setIsSearching(true);
      } else {
        setSearchResults([]);
        setIsSearching(true); // Vẫn show dropdown để hiển thị history
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, performSearch]);

  const handleResultClick = (result) => {
    // Lưu lịch sử tìm kiếm
    if (searchQuery.trim()) {
      setSearchHistory(prev => {
        const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }

    // Điều hướng dựa trên loại kết quả
    switch (result.type) {
      case 'project':
        navigate(`${ROUTERS.USER.PROJECT.PROJECTDETAILS}/${result.projectId}`, {
          state: { projectData: result }
        });
        break;
      case 'task':
        // Có thể thêm routing cho task nếu cần
        navigate(`/task/${result.taskId}`);
        break;
      case 'user':
        // Có thể thêm routing cho user profile nếu cần
        navigate(`/user/${result.userId}`);
        break;
      default:
        console.log('Unknown result type:', result.type);
    }
    setIsSearching(false);
  };

  const handleDeleteHistory = (index) => {
    setSearchHistory(prev => {
      const newHistory = prev.filter((_, i) => i !== index);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside for search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const thongbao = useCallback(() => {
    setNotification(prev => !prev);
    if (!isNotification) {
      setIsSetting(false);
    }
  }, [isNotification]);

  const caidat = useCallback(() => {
    setIsSetting(prev => !prev);
    if (!isSetting) {
      setNotification(false);
    }
  }, [isSetting]);

  // Handle click outside for notification and settings
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotification && 
          notificationRef.current && 
          !notificationRef.current.contains(event.target) &&
          !notificationButtonRef.current.contains(event.target)) {
        setNotification(false);
      }

      if (isSetting && 
          settingRef.current && 
          !settingRef.current.contains(event.target) &&
          !settingButtonRef.current.contains(event.target)) {
        setIsSetting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
              <a href="http://localhost:3000/trangchu">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="LOGO" />
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="col-mid header-top-mid">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Tìm kiếm dự án, nhiệm vụ, báo cáo, người dùng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setIsSearching(true)}
              />
              <button type="submit" className="submit" disabled={isLoading}>
                <CiSearch />
              </button>
            </form>
            
            <SearchDropdown 
              searchResults={searchResults}
              isSearching={isSearching}
              isLoading={isLoading}
              searchQuery={searchQuery}
              onResultClick={handleResultClick}
              onDeleteHistory={handleDeleteHistory}
              searchHistory={searchHistory}
              onClose={() => setIsSearching(false)}
              anchorEl={searchInputRef.current}
            />
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
                  <div ref={notificationRef} className="chuong">
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