import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import './style/LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/dangnhap');
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="logo" >
        <a href="/landing">LOGO</a>
           </div>
        <div className="nav-links">
          <a href="/dangnhap" className="nav-link">Đăng nhập</a>
          <a href="/dangki" className="nav-link">Đăng ký</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Projectmanage: Công cụ quản lý dự án tốt nhất hiện nay</h1>
            <p>Projectmanage cung cấp các giải pháp quản lý dự án toàn diện, các công cụ hiệu quả để thực hiện và phân phối công việc.</p>
            <button onClick={handleStartProject} className="start-project-btn">
              Bắt đầu dự án mới
            </button>
          </div>
          <div className="hero-image">
            <img src='/images/Rectangle 4.png' alt="Project collaboration" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <img src='/images/quan_ly_cv 1.png' alt="Task management" />
            <h3>Quản lý tác vụ, quy trình làm việc hiệu quả</h3>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <img src='/images/phan_chia_cv 1.png' alt="Project completion" />
            <h3>Phân chia công việc để hoàn thành dự án</h3>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <img src='/images/theo_doi_tien_do 1.png' alt="Progress tracking" />
            <h3>Theo dõi tiến độ, nhiệm vụ theo thời gian</h3>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <img src='/images/nhac_nho 1.png' alt="Progress tracking" />
            <h3>Hệ thống theo dõi, nhắc nhở, báo cáo tiến độ</h3>
          </div>
        </div>
      </div>
      
        

      <Footer />
    </div>
  );
};

export default LandingPage;