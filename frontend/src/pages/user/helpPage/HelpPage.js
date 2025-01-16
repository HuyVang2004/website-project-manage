import React, { useState, useEffect } from 'react';
import './HelpPage.scss';
import SlideBar from '../../../components/SlideBar';
import TopBar from '../../../components/Nav/TopBar';
import Footer from '../../../components/Footer';
import helpAPI from '../../../api/helpApi';

const HelpPage = () => {
  const [newHelp, setNewHelp] = useState({
    content: '',
    helpType: ''
  });
  const [helpData, setHelpData] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";

  useEffect( () => {
    const fectchHelp= async () => {
        try{
            const responseHelp = await helpAPI.getHelpByUser(userId);
            setHelpData(responseHelp);
        } catch {
        }
    };
    fectchHelp()
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New help request:', newHelp);
    await helpAPI.createHelp({
        user_id: userId,
        content: newHelp.content,
        help_type: newHelp.helpType || 'khác',
        create_time: new Date().toISOString,
    })
    setNewHelp({ content: '', helpType: '' });
  };

  return (
    <div className="dashboard">
        {/* Sidebar Component */}
        <SlideBar />
        <TopBar />
        {/* Main Content */}
        <div className="main-content">
                <div className="help-container">
            <div className="help-header">
                <h1>Trợ giúp</h1>
            </div>

            {/* New Help Request Form */}
            <div className="help-form-card">
                <h2>Gửi yêu cầu trợ giúp mới</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select 
                    value={newHelp.helpType}
                    onChange={(e) => setNewHelp({ ...newHelp, helpType: e.target.value })}
                    required
                    >
                    <option value="">Chọn loại trợ giúp</option>
                    <option value="Tài khoản">Tài khoản</option>
                    <option value="Dữ liệu">Dữ liệu</option>
                    <option value="Giao diện">Giao diện</option>
                    <option value="Khác">Khác</option>
                    </select>
                </div>

                <div className="form-group">
                    <textarea
                    placeholder="Mô tả vấn đề của bạn..."
                    value={newHelp.content}
                    onChange={(e) => setNewHelp({ ...newHelp, content: e.target.value })}
                    required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Gửi yêu cầu
                </button>
                </form>
            </div>

            {/* Help Request List */}
            <div className="help-list">
                <h2>Danh sách yêu cầu trợ giúp</h2>
                {helpData.map((help) => (
                <div key={help.help_id} className="help-card">
                    <div className="help-card-header">
                    <span className="help-type">{help.help_type}</span>
                    <span className="help-date">
                        {new Date(help.create_time).toLocaleDateString('vi-VN')}
                    </span>
                    </div>

                    <div className="help-content">
                    <p>{help.content}</p>
                    </div>

                    {help.content_admin && (
                    <div className="admin-response">
                        <h3>Phản hồi từ admin:</h3>
                        <p>{help.content_admin}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
            </div>
        {/* Footer Component */}
        </div>
        <Footer />
    </div>
  );
};

export default HelpPage;