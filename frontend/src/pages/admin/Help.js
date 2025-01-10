import React, { useState } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import './style/Help.scss';

const Help = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeGuide, setActiveGuide] = useState(null);

  const faqData = [
    {
      question: 'Thông tin người dùng được hiển thị ở đâu?',
      answer: 'Ở danh sách người dùng, khi bạn click vào 1 người dùng cụ thể thì toàn bộ thông tin của người ấy sẽ đuọc hiển thị'
    },
    {
      question: 'Làm thế nào để chỉnh sửa thông tin hay xóa một người dùng?',
      answer: 'Trong trang quản lí người dùng, click vào nút "Chỉnh sửa" màu xanh hoặc nút "Xóa" màu đỏ để chỉnh sửa/xóa người dùng tương ứng.'
    },
    {
      question: 'Làm sao để trả lời các phản hồi từ người dùng?',
      answer: 'Phàn hồi từ người dùng sẽ hiển thị trong phần Hỗ trợ và chúng ta có thể trả lời họ ở ChatBox.'
    }
  ];

  const guides = [
    {
      id: 'project',
      title: 'Hướng dẫn quản lý dự án',
      content: 'Tìm hiểu cách tạo, quản lý và theo dõi tiến độ dự án một cách hiệu quả.',
      detailedContent: [
        {
          title: 'Tạo dự án mới',
          content: 'Để tạo một dự án mới, thực hiện các bước sau:',
          steps: [
            'Click vào nút "Thêm mới" ở menu bên trái',
            'Chọn "Dự án mới" từ menu dropdown',
            'Điền thông tin dự án: tên, mô tả, ngày bắt đầu, ngày kết thúc',
            'Thêm thành viên dự án từ danh sách người dùng',
            'Click "Lưu" để hoàn tất'
          ]
        },
        {
          title: 'Quản lý tiến độ',
          content: 'Theo dõi và cập nhật tiến độ dự án:',
          steps: [
            'Vào trang chi tiết dự án',
            'Xem biểu đồ Gantt để theo dõi tiến độ tổng thể',
            'Cập nhật trạng thái các công việc',
            'Kiểm tra báo cáo tiến độ định kỳ'
          ]
        },
        {
          title: 'Quản lý tài nguyên',
          content: 'Quản lý tài nguyên và tài liệu dự án:',
          steps: [
            'Upload tài liệu vào thư mục dự án',
            'Phân quyền truy cập cho thành viên',
            'Theo dõi phiên bản tài liệu',
            'Chia sẻ tài liệu với các bên liên quan'
          ]
        }
      ]
    },
    {
      id: 'task',
      title: 'Hướng dẫn quản lý công việc',
      content: 'Khám phá cách tổ chức công việc, gán nhiệm vụ và theo dõi deadline.',
      detailedContent: [
        {
          title: 'Tạo công việc mới',
          content: 'Các bước tạo một công việc mới:',
          steps: [
            'Chọn dự án cần thêm công việc',
            'Click nút "Thêm công việc" màu xanh',
            'Điền thông tin công việc: tên, mô tả, deadline',
            'Gán người thực hiện và người phụ trách',
            'Đặt mức độ ưu tiên và dự kiến thời gian hoàn thành'
          ]
        },
        {
          title: 'Theo dõi và cập nhật',
          content: 'Quản lý và theo dõi tiến độ công việc:',
          steps: [
            'Kiểm tra danh sách công việc trên bảng Kanban',
            'Cập nhật trạng thái công việc: Mới, Đang làm, Hoàn thành',
            'Thêm comment và tài liệu đính kèm',
            'Báo cáo vướng mắc nếu có'
          ]
        },
        {
          title: 'Báo cáo và thống kê',
          content: 'Xem báo cáo và thống kê công việc:',
          steps: [
            'Truy cập tab "Thống kê"',
            'Chọn loại báo cáo cần xem',
            'Lọc theo thời gian, người thực hiện',
            'Xuất báo cáo dưới dạng PDF hoặc Excel'
          ]
        }
      ]
    }
  ];

  const toggleSection = (index) => {
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);
    }
  };

  const showGuide = (guideId) => {
    const guide = guides.find(g => g.id === guideId);
    setActiveGuide(guide);
  };

  return (
    <div className="app-container">
      <TopBar />
      <div className="main-content">
        <Sidebar />
        <div className="help-content">
          <h1>Trung tâm trợ giúp</h1>
          
          <section className="help-section">
            <h2>Câu hỏi thường gặp</h2>
            <div className="faq-container">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="faq-question"
                    onClick={() => toggleSection(index)}
                  >
                    <h3>{faq.question}</h3>
                    {activeSection === index ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  <div className={`faq-answer ${activeSection === index ? 'active' : ''}`}>
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="help-section">
            <h2>Hướng dẫn sử dụng</h2>
            <div className="guides-container">
              {guides.map((guide) => (
                <div key={guide.id} className="guide-item">
                  <h3>{guide.title}</h3>
                  <p>{guide.content}</p>
                  <button className="view-guide-btn" onClick={() => showGuide(guide.id)}>
                    Xem hướng dẫn
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />

      {activeGuide && (
        <div className="guide-modal">
          <div className="guide-modal-content">
            <div className="guide-modal-header">
              <h2>{activeGuide.title}</h2>
              <button className="close-btn" onClick={() => setActiveGuide(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="guide-modal-body">
              {activeGuide.detailedContent.map((section, index) => (
                <div key={index} className="guide-section">
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                  <ul>
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;