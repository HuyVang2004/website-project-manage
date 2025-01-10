import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/Card/Card.js';
import { Switch } from '../../components/Card/Card.js';
import { Input } from '../../components/Card/Card.js';
import { Button } from '../../components/Card/Card.js';
import { useToast } from '../../components/Card/Card.js';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/SystemSettings.scss';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [webTitle, setWebTitle] = useState('Quản Lý Dự Án');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [tempSettings, setTempSettings] = useState({
    darkMode: false,
    webTitle: 'Quản Lý Dự Án',
    logo: null,
    logoPreview: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const { toast, ToastComponent } = useToast();

  useEffect(() => {
    loadSavedSettings();
  }, []);
  const handleTimezoneChange = (e) => {
    setTempSettings(prev => ({
      ...prev,
      timezone: e.target.value
    }));
  };
  const loadSavedSettings = () => {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const savedTitle = localStorage.getItem('webTitle') || 'Quản Lý Dự Án';
  const savedLogo = localStorage.getItem('logo');
  const savedTimezone = localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;

  setDarkMode(isDark);
  setWebTitle(savedTitle);
  setLogoPreview(savedLogo);
  setTimezone(savedTimezone);
  
  setTempSettings({
    darkMode: isDark,
    webTitle: savedTitle,
    logo: null,
    logoPreview: savedLogo,
    timezone: savedTimezone
  });

  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  document.title = savedTitle;
  if (savedLogo) {
    updateFavicon(savedLogo);
  }
};
const timezones = [
  'Asia/Ho_Chi_Minh',
  'Asia/Bangkok',
  'Asia/Tokyo',
  'America/New_York',
  'Europe/London',
  'Australia/Sydney'
];

  const handleTempDarkMode = () => {
    setTempSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const handleTempTitleChange = (e) => {
    setTempSettings(prev => ({
      ...prev,
      webTitle: e.target.value
    }));
  };

  const handleTempLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Lỗi",
        description: "Logo không được vượt quá 2MB",
        variant: "error"
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file hình ảnh",
        variant: "error"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempSettings(prev => ({
        ...prev,
        logo: file,
        logoPreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const updateFavicon = (logoUrl) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = logoUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  };


  const handleSaveChanges = () => {
    // Apply dark mode changes
    setDarkMode(tempSettings.darkMode);
    localStorage.setItem('darkMode', tempSettings.darkMode.toString());
    document.documentElement.classList.toggle('dark', tempSettings.darkMode);
    document.body.classList.toggle('dark', tempSettings.darkMode);

    // Apply title changes
    setWebTitle(tempSettings.webTitle);
    document.title = tempSettings.webTitle;
    localStorage.setItem('webTitle', tempSettings.webTitle);

    // Apply logo changes
    if (tempSettings.logoPreview) {
      setLogo(tempSettings.logo);
      setLogoPreview(tempSettings.logoPreview);
      localStorage.setItem('logo', tempSettings.logoPreview);
      updateFavicon(tempSettings.logoPreview);
    }
    setTimezone(tempSettings.timezone);
    localStorage.setItem('timezone', tempSettings.timezone);

    toast({
      title: "Thành công",
      description: "Đã lưu thay đổi thành công",
    });
  };

  return (
    <div className="settings-page">
      <TopBar />
      <div className="settings-container">
        <Sidebar />
        <div className="settings-content">
          <Card className="settings-card">
            <CardHeader>
              <CardTitle className="settings-title">Cài Đặt Hệ Thống</CardTitle>
            </CardHeader>
            
            <CardContent className="settings-form">
              {/* Dark Mode Toggle */}
              <div className="settings-section">
                <div className="section-header">
                  <div className="mode-text">
                    <h3>Giao diện</h3>
                    <p>Thay đổi giao diện sáng/tối của ứng dụng</p>
                  </div>
                  <div className="toggle-switch">
                    <span>{tempSettings.darkMode ? 'Tối' : 'Sáng'}</span>
                    <Switch 
                      checked={tempSettings.darkMode}
                      onCheckedChange={handleTempDarkMode}
                      className="dark-mode-switch"
                    />
                  </div>
                </div>
              </div>
              {/* Timezone */}
                  <div className="settings-section">
              <div className="section-header">
                <div className="mode-text">
                  <h3>Múi giờ</h3>
                  <p>Chọn múi giờ cho hệ thống</p>
                </div>
                <select 
                  value={tempSettings.timezone}
                  onChange={handleTimezoneChange}
                  className="timezone-select"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>
                      {tz.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

              {/* Web Title Input */}
              <div className="settings-section">
                <label>Tên Website</label>
                <Input
                  type="text"
                  value={tempSettings.webTitle}
                  onChange={handleTempTitleChange}
                  placeholder="Nhập tên website"
                />
              </div>

              {/* Logo Upload */}
              <div className="settings-section">
                <label>Logo Website</label>
                <div className="logo-upload">
                  <div className="logo-preview">
                    {tempSettings.logoPreview ? (
                      <img src={tempSettings.logoPreview} alt="Logo Preview" />
                    ) : (
                      <svg viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="upload-controls">
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('logo-upload').click()}
                    >
                      Tải logo lên
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleTempLogoUpload}
                    />
                    <p>Hỗ trợ các định dạng: PNG, JPG, GIF (Max: 2MB)</p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="settings-section save-section">
                <Button onClick={handleSaveChanges} className="save-button">
                  Xác nhận
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      {ToastComponent}
    </div>
  );
};

export default Settings;
