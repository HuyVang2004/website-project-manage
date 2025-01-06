import React, { useState } from 'react';
import { 
  Settings, Mail, Shield, Globe, Database, Bell, 
  Clock, User, Key, Save, Server
} from 'lucide-react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/SystemSettings.scss';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-wrapper">
        <TopBar />
        <div className="settings-container">
          {/* Settings Sidebar */}
          <div className="settings-sidebar">
            <div className="sidebar-header">
              <h2 className="sidebar-title">
                <Settings className="icon" />
                Cài đặt hệ thống
              </h2>
            </div>
            
            <nav className="sidebar-nav">
              <button 
                onClick={() => setActiveTab('general')}
                className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
              >
                <Settings className="icon" />
                Cài đặt chung
              </button>

              <button 
                onClick={() => setActiveTab('email')}
                className={`nav-item ${activeTab === 'email' ? 'active' : ''}`}
              >
                <Mail className="icon" />
                Cấu hình Email
              </button>

              <button 
                onClick={() => setActiveTab('security')}
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              >
                <Shield className="icon" />
                Bảo mật
              </button>

              <button 
                onClick={() => setActiveTab('backup')}
                className={`nav-item ${activeTab === 'backup' ? 'active' : ''}`}
              >
                <Database className="icon" />
                Sao lưu & Phục hồi
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="settings-content">
            {showSuccess && (
              <Alert className="success-alert">
                <AlertDescription>
                  Cài đặt đã được lưu thành công!
                </AlertDescription>
              </Alert>
            )}

            {activeTab === 'general' && (
              <div className="settings-panel">
                <h3 className="panel-title">Cài đặt chung</h3>
                
                <div className="form-group">
                  <div className="form-field">
                    <label>Tên website</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên website"
                    />
                  </div>

                  <div className="form-field">
                    <label>Logo</label>
                    <div className="logo-upload">
                      <img src="/api/placeholder/100/100" alt="Logo" />
                      <button className="upload-btn">
                        Thay đổi logo
                      </button>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Múi giờ</label>
                    <select>
                      <option value="UTC+7">UTC+7 (Vietnam)</option>
                      <option value="UTC+8">UTC+8</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Ngôn ngữ mặc định</label>
                    <select>
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="settings-panel">
                <h3 className="panel-title">Cấu hình Email</h3>
                
                <div className="form-group">
                  <div className="form-field">
                    <label>SMTP Server</label>
                    <input 
                      type="text" 
                      placeholder="smtp.example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label>SMTP Port</label>
                    <input 
                      type="number" 
                      placeholder="587"
                    />
                  </div>

                  <div className="form-field">
                    <label>Email gửi</label>
                    <input 
                      type="email" 
                      placeholder="noreply@example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label>Mật khẩu</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="test-btn">
                    Kiểm tra kết nối
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-panel">
                <h3 className="panel-title">Bảo mật</h3>
                
                <div className="form-group">
                  <div className="form-field">
                    <label>Thời gian timeout phiên đăng nhập (phút)</label>
                    <input 
                      type="number" 
                      placeholder="30"
                    />
                  </div>

                  <div className="form-field">
                    <label>Số lần đăng nhập sai tối đa</label>
                    <input 
                      type="number" 
                      placeholder="5"
                    />
                  </div>

                  <div className="checkbox-field">
                    <input type="checkbox" id="2fa" />
                    <label htmlFor="2fa">Bật xác thực 2 lớp</label>
                  </div>

                  <div className="checkbox-field">
                    <input type="checkbox" id="force-ssl" />
                    <label htmlFor="force-ssl">Bắt buộc sử dụng HTTPS</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="settings-panel">
                <h3 className="panel-title">Sao lưu & Phục hồi</h3>
                
                <div className="form-group">
                  <div className="form-field">
                    <label>Lịch sao lưu tự động</label>
                    <select>
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Thời điểm sao lưu</label>
                    <input 
                      type="time" 
                      value="00:00"
                    />
                  </div>

                  <div className="form-field">
                    <label>Vị trí lưu trữ</label>
                    <select>
                      <option value="local">Máy chủ local</option>
                      <option value="cloud">Cloud Storage</option>
                    </select>
                  </div>

                  <div className="button-group">
                    <button className="backup-btn">
                      Sao lưu ngay
                    </button>
                    <button className="restore-btn">
                      Phục hồi từ file
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="save-container">
              <button 
                onClick={handleSave}
                className="save-btn"
              >
                <Save className="icon" />
                Lưu cài đặt
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SystemSettings;