import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import './SearchDropdown.scss';

const SearchDropdown = ({ 
  searchResults, 
  isSearching,
  isLoading,
  searchQuery,
  onResultClick,
  onDeleteHistory,
  searchHistory,
  onClose,
  anchorEl 
}) => {
  if (!isSearching || !anchorEl) return null;

  // Tính toán vị trí dựa trên anchorEl
  const rect = anchorEl.getBoundingClientRect();
  const style = {
    position: 'fixed',
    top: `${rect.bottom + 5}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorEl && !anchorEl.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [anchorEl, onClose]);

  const renderContent = () => {
    // Show history when there's no search query
    if (searchQuery === "") {
      if (searchHistory.length > 0) {
        return (
          <div className="search-history">
            <div className="search-history-header">Lịch sử tìm kiếm</div>
            {searchHistory.map((item, index) => (
              <div key={index} className="search-history-item">
                <div className="history-content">
                  <div className="history-icon">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="history-text">{item}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistory(index);
                  }}
                  className="delete-button"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <div className="search-history-divider"></div>
          </div>
        );
      }
      return null; // Return null when there's no query and no history
    }

    // Show loading state
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Đang tìm kiếm...</span>
        </div>
      );
    }

    // Show search results or empty state only if there's a search query
    if (searchQuery.trim()) {
      if (searchResults.length > 0) {
        return (
          <div className="search-results-list">
            {searchResults.map((result) => (
              <div 
                key={result.id}
                onClick={() => onResultClick(result)}
                className="result-item"
              >
                <div className="result-content">
                  <div className="result-info">
                    <div className="result-title">{result.title}</div>
                    <div className="result-description">{result.description}</div>
                  </div>
                  <div className={`result-badge ${result.type}`}>
                    {result.type === 'project' ? 'Dự án' : 
                     result.type === 'task' ? 'Nhiệm vụ' : 
                     'Người dùng'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="empty-state">
            Không tìm thấy kết quả cho "{searchQuery}"
          </div>
        );
      }
    }

    return null; // Return null for any other case
  };

  // Render vào portal
  return ReactDOM.createPortal(
    <div className="search-dropdown-container" style={style}>
      {renderContent()}
    </div>,
    document.body
  );
};

export default SearchDropdown;