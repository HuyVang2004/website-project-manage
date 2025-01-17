import { useState, useEffect } from "react";
import helpAPI from "../../../api/helpApi.js";
import TableListHelp from "./TableListHelp.js";
import SlideBar from "../../../components/SlideBar.js";
import TopBar from "../../../components/Nav/TopBar.js";
import './HelpPageAdmin.scss';

const HelpPageAdmin = () => {
  const [listHelp, setListHelp] = useState([]);

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const helpResponse = await helpAPI.getAllUser();
        setListHelp(helpResponse || []);
      } catch (error) {
        // console.error("Error fetching help data:", error);
        setListHelp([]);
      }
    };
    fetchHelp();
  }, []);

  return (
    <div className="dashboard">
      <SlideBar />
      <TopBar />
      <div className="main-content">
        <div className="table-help">
          <TableListHelp listHelp={listHelp} />
        </div>
      </div>
    </div>
  );
};

export default HelpPageAdmin;
