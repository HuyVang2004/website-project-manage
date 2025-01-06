import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PeopleList.scss'; // Assuming the SASS file is saved as TeamMembers.scss
import TopBar from '../../../components/Nav/TopBar';
import SlideBar from '../../../components/SlideBar';

const TeamMembers = () => {
  const navigate = useNavigate();

  const members = [
    { id: 1, name: 'Addodie', avatar: '/images/bùi anh tuấn.jpg', username: 'addodie' },
    { id: 2, name: 'Marketplace', avatar: '/images/charli.jpg', username: 'marketplace' },
    { id: 3, name: 'Von Dracula', avatar: '/images/Dương_DOMIC.jpg', username: 'von-dracula' },
    { id: 4, name: 'Von Dracula', avatar: '/images/erik.jpg', username: 'von-dracula-2' },
    { id: 5, name: 'John_Joestar', avatar: '/images/hieuthuhai.jpg', username: 'john-joestar' },
    { id: 6, name: 'Akali Jin', avatar: '/images/hòa minzy.jpg', username: 'akali-jin' },
    { id: 7, name: 'Kayn Vampyr', avatar: '/images/lowg.jpg', username: 'kayn-vampyr' },
    { id: 8, name: 'Kayn Vampyr', avatar: '/images/ngoc-son.jpg', username: 'kayn-vampyr-2' },
    { id: 9, name: 'John_Joestar', avatar: '/images/Noo phước thịnh.webp', username: 'john-joestar' },
    { id: 10, name: 'Akali Jin', avatar: '/images/orange.jpg', username: 'akali-jin' },
    { id: 11, name: 'Kayn Vampyr', avatar: '/images/sơn tùng.jpg', username: 'kayn-vampyr' },
    { id: 12, name: 'Kayn Vampyr', avatar: '/images/rhyder.jpg', username: 'kayn-vampyr-2' },
    { id: 13, name: 'New User', avatar: '/images/lê sang.jpg', username: 'new-user' },
    // Add more members as needed
  ];

  const [showAll, setShowAll] = useState(false);

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const toggleView = () => {
    setShowAll((prevState) => !prevState); // Toggle between true and false
  };

  const visibleMembers = showAll ? members : members.slice(0, 12);

  return (
    <div className="dashboard">
      <TopBar />
      <SlideBar />
      <div className="main-content">
        <div className="header">
          <div className="team-members__container">
            <div className="team-members__header">
              <h2>Mọi người</h2>
              <button className="view-all" onClick={toggleView}>
                {showAll ? 'Tóm Gọn' : 'View All'}
              </button>
            </div>

            <div className="team-members__grid">
              {visibleMembers.map((member) => (
                <div key={member.id} className="team-members__member">
                  <div
                    onClick={() => handleProfileClick(member.username)}
                    className="team-members__member-avatar"
                  >
                    <img
                      src={member.avatar}
                      alt={`${member.name}'s avatar`}
                    />
                  </div>
                  <span className="team-members__member-name">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
