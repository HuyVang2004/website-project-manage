import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PeopleList.scss'; // Assuming the SASS file is saved as TeamMembers.scss

const TeamMembers = () => {
  const navigate = useNavigate();

  const members = [
    { id: 1, name: 'Addodie', avatar: '/images/bùi anh tuấn.jpg', username: 'addodie' },
    { id: 2, name: 'Marketplace', avatar: '/images/charli.jpg', username: 'marketplace' },
    { id: 3, name: 'Von Dracula', avatar: '/images/Dương_DOMIC.jpg', username: 'von-dracula' },
    { id: 4, name: 'Von Dracula', avatar: '/path-to-avatar/von-dracula-2.jpg', username: 'von-dracula-2' },
    { id: 5, name: 'John_Joestar', avatar: '/path-to-avatar/john-joestar.jpg', username: 'john-joestar' },
    { id: 6, name: 'Akali Jin', avatar: '/path-to-avatar/akali-jin.jpg', username: 'akali-jin' },
    { id: 7, name: 'Kayn Vampyr', avatar: '/path-to-avatar/kayn-vampyr.jpg', username: 'kayn-vampyr' },
    { id: 8, name: 'Kayn Vampyr', avatar: '/path-to-avatar/kayn-vampyr-2.jpg', username: 'kayn-vampyr-2' },
    { id: 9, name: 'John_Joestar', avatar: '/path-to-avatar/john-joestar.jpg', username: 'john-joestar' },
    { id: 10, name: 'Akali Jin', avatar: '/path-to-avatar/akali-jin.jpg', username: 'akali-jin' },
    { id: 11, name: 'Kayn Vampyr', avatar: '/path-to-avatar/kayn-vampyr.jpg', username: 'kayn-vampyr' },
    { id: 12, name: 'Kayn Vampyr', avatar: '/path-to-avatar/kayn-vampyr-2.jpg', username: 'kayn-vampyr-2' },
  ];

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="team-members__container">
      <div className="team-members__header">
        <h2>Mọi người</h2>
        <button className="view-all">View all</button>
      </div>

      <div className="team-members__grid">
        {members.map((member) => (
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
  );
};

export default TeamMembers;
