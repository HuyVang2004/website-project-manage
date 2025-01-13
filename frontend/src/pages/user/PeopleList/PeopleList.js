import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PeopleList.scss'; // Assuming the SASS file is saved as TeamMembers.scss
import TopBar from '../../../components/Nav/TopBar';
import SlideBar from '../../../components/SlideBar';
import getListPeopleData from '../../../api/getLisPepole'; // Import API function

const TeamMembers = () => {
  const navigate = useNavigate();
  
  // State to store team members data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const peopleData = await getListPeopleData();
        setMembers(peopleData); // Set the fetched data into state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin thành viên:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchPeopleData();
  }, []);

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const toggleView = () => {
    setShowAll((prevState) => !prevState); // Toggle between true and false
  };

  const visibleMembers = showAll ? members : members.slice(0, 12);

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching data
  }

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
                {showAll ? 'Tóm Gọn' : 'Xem tất cả'}
              </button>
            </div>

            <div className="team-members__grid">
              {visibleMembers.map((member) => (
                <div key={member.user_id} className="team-members__member">
                  <div
                    onClick={() => handleProfileClick(member.username)}
                    className="team-members__member-avatar"
                  >
                    <img
                      src={member.avatarUrl}
                      alt={`${member.name}'s avatar`}
                    />
                  </div>
                  <span className="team-members__member-name">{member.username}</span>
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
