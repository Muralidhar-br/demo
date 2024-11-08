// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHouse,
//   faGear,
//   faUsers,
//   faBars,
//   faUserCircle,
//   faSignOutAlt
// } from "@fortawesome/free-solid-svg-icons";
// import "./Dashboard.css";
// import { Bar } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import SetupView from "./SetupView";
// import DashboardView from "./DashboardView";
// import UserDetailsView from "./UserDetailsView";
// import UserMaintenanceView from "./UserMaintenanceView";
// import AccessType from "./AccessType";
// import SystemParameter from "./SystemParameter";
// import MenuAccessControl from "./MenuAccessControl";
// import MenuMaintenance from "./MenuMaintenance";
// import UserGroupMaintenance from "./UserGroupMaintenance";
// import APIRegistry from "./APIRegistry";
// import TOKENRegistry from "./TOKENRegistry";
// import DataType1 from "./DataType1";
// import DataType2 from "./DataType2";
// import DataType3 from "./DataType3";
// import DataType4 from "./DataType4";
// import DataType5 from "./DataType5";
// import DataType6 from "./DataType6";
// import DynamicTable from "./DynamicTable";
// import CodeExtension from "./Codeextension";
// // import DashboardCharts from "./DashboardCharts";
// import Dropdown from "react-bootstrap/Dropdown";
// import { removeToken } from "../../utils/tokenService";
// import AccordionPage from "./UIComponents/Accordion";
// import BadgesPage from "./UIComponents/BadgesPage";
// import DashViewone from "./UIComponents/DashViewone";

// const HomeView = ({ barChartData, barChartOptions }) => (
//   <div>
//     <div className="cards">
//       <div className="card">
//         <div className="card-content">
//           <div className="number">1</div>
//           <div className="card-name">Index</div>
//         </div>
//       </div>
//       <div className="card">
//         <div className="card-content">
//           <div className="number">2</div>
//           <div className="card-name">Index</div>
//         </div>
//       </div>
//       <div className="card">
//         <div className="card-content">
//           <div className="number">3</div>
//           <div className="card-name">Index</div>
//         </div>
//       </div>
//     </div>
//     <div
//       className="chart-container"
//       style={{
//         width: "100%",
//         maxWidth: "700px",
//         height: "400px",
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "20px",
//       }}
//     >
//       <Bar data={barChartData} options={barChartOptions} />
//     </div>
//   </div>
// );
// function Dashboard() {
//   const [currentView, setCurrentView] = useState("home");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSidebarOpen(window.innerWidth >= 972);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       const apiUrl = `${process.env.REACT_APP_API_URL}/fndMenu/menuloadbyuser`;
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         console.error("Authorization token is missing.");
//         setError("Authorization token is missing.");
//         return;
//       }

//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setMenuItems(data);
//       } catch (error) {
//         console.error("Fetching error:", error);
//         setError(error.toString());
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   const barChartData = {
//     labels: ["Label1", "Label2", "Label3"],
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: [65, 59, 80],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     maintainAspectRatio: false,
//   };

//   if (error) {
//     return <p>Error fetching data: {error}</p>;
//   }
//   const handleLogout = () => {
//     removeToken();
//     navigate("/#", { replace: true }); // Redirect to login page
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderView = () => {
//     // console.log("renderning")
//     console.log("Current View:", currentView);
//     switch (currentView) {
//       // case "home":
//       //   return (
//       //     <HomeView
//       //       barChartData={barChartData}
//       //       barChartOptions={barChartOptions}
//       //     />
//       //   );
//       case "home": {
//         console.log("render it")
//         return (

//           <>
//             <AccordionPage />
//             <BadgesPage />
//             <DashViewone/>
//           </>
//         );
//       }

//       case "setup":
//         console.log("reder on");
//         return (
//           <SetupView
//             onUserMaintenance={() => setCurrentView("userMaintenance")}
//             onMenuAccessControl={() => setCurrentView("menuAccessControl")}
//             onUserGroupMaintenance={() =>
//               setCurrentView("userGroupMaintenance")
//             }
//             onSystemParameter={() => setCurrentView("systemParameter")}
//             onMenuMaintenance={() => setCurrentView("menuMaintenance")}
//             onAccessType={() => setCurrentView("accessType")}
//             onAPIregistry={() => setCurrentView("apiRegistry")}
//             onTokenregistry={() => setCurrentView("tokenRegistry")}
//             onDataType1={() => setCurrentView("dataType1")}
//             onDataType2={() => setCurrentView("dataType2")}
//             onDataType3={() => setCurrentView("dataType3")}
//             onDataType4={() => setCurrentView("dataType4")}
//             onDataType5={() => setCurrentView("dataType5")}
//             onDataType6={() => setCurrentView("dataType6")}
//             onDynamicTable={() => setCurrentView("dynamicTable")}
//             oncodeExtension={() => setCurrentView("codeExtension")}
//           />
//         );
//       // case  "dashboard":
//       //   return <DashboardView
//       //   onDashboardCharts={()=> setCurrentView("dashboardcharts")}
//       //   />;
//       case "userdetails":
//         console.log("render come")
//         return <UserDetailsView />;

//       case "userMaintenance":
//         return <UserMaintenanceView />;
//       case "accessType":
//         return <AccessType />;
//       case "systemParameter":
//         return <SystemParameter />;
//       case "menuAccessControl":
//         return <MenuAccessControl />;
//       case "menuMaintenance":
//         return <MenuMaintenance />;
//       case "userGroupMaintenance":
//         return <UserGroupMaintenance />;
//       case "apiRegistry":
//         return <APIRegistry />;
//       case "tokenRegistry":
//         return <TOKENRegistry />;
//       case "dataType1":
//         return <DataType1 />;
//       case "dataType2":
//         return <DataType2 />;
//       case "dataType3":
//         return <DataType3 />;
//       case "dataType4":
//         return <DataType4 />;
//       case "dataType5":
//         return <DataType5 />;
//       case "dataType6":
//         return <DataType6 />;
//       case "dashboardcharts":
//         return <DashboardCharts />;
//       case "dynamictable":
//         return <DynamicTable />;
//       case "codeextension":
//         return <codeExtension />;
//       default:
//         return <div>Select an option from the menu</div>;
//     }
//   };

//   return (
//     <div className="container">
//       {/* navbar */}
//       <div className="topbar">
//       <div className="navbar-icons">
//   <i
//     onClick={() => setCurrentView("home")}
//     className="fa-solid fa-house"
//   ></i>
//   <i
//     onClick={() => setCurrentView("dashboard")} // Ensure you have a case for "dashboard" in renderView
//     className="fas fa-chart-bar"
//   ></i>
//   <i
//     onClick={() => setCurrentView("setup")}
//     className="fa-solid fa-gear"
//   ></i>
//   <i
//     onClick={() => setCurrentView("userdetails")}
//     className="fa-solid fa-users"
//   ></i>
// </div>

//          {/* user-profile-avatar */}
//         <div>
//           <Dropdown className="navbar-avatar">
//             <Dropdown.Toggle variant="link" id="avatar-dropdown"  bsPrefix="custom-toggle" >
//               {/* <img src="/path/to/your/avatar.png" alt="User Avatar" /> */}
//               <FontAwesomeIcon icon={faUserCircle}  className="user-Profile-Icon text-white" />
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => setCurrentView("profile")}>
//                 <FontAwesomeIcon icon={faUserCircle} /> Profile
//               </Dropdown.Item>
//               <Dropdown.Item onClick={handleLogout}>
//                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       {/* Sidebar Icon (below the topbar) */}
//       <div className="sidebar-icon-container">
//         <FontAwesomeIcon
//           icon={faBars}
//           className="menu-icon"
//           onClick={toggleSidebar}
//         />
//       </div>

//       {/* main view */}
//       <div className="main-side ">

//         {/* side bar */}
//         <div className={`sidebar mt-3 ${isSidebarOpen ? "open" : ""}`}>
//           {
//             <ul>
//               {menuItems.map((item, index) => (
//                 <li
//                   key={index}
//                   onClick={() => setCurrentView(item.menuItemId.menuItemDesc)}
//                 >
//                   {item.menuItemId.menuItemDesc}
//                 </li>
//               ))}
//             </ul>
//           }

//           {
//             <div>
//               {menuItems.map((menu, index) => (
//                 <div key={index}>
//                   <h6>{menu.menuItemDesc}</h6>
//                   <ul>
//                     {menu.subMenus.map((subMenu, subIndex) => (
//                       <Link
//                         to={`/${subMenu.menuItemDesc}`}
//                         style={{ textDecoration: "none", color: "#4A4A4A" }}
//                       >
//                         <li key={subIndex}>{subMenu.menuItemDesc}</li>
//                       </Link>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           }
//         </div>

//         <div className="main">{renderView()}</div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faUsers,
  faBars,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import SetupView from "./SetupView";
import DashboardView from "./DashboardView";
import UserDetailsView from "./UserDetailsView";
import UserMaintenanceView from "./UserMaintenanceView";
import AccessType from "./AccessType";
import SystemParameter from "./SystemParameter";
import MenuAccessControl from "./MenuAccessControl";
import MenuMaintenance from "./MenuMaintenance";
import UserGroupMaintenance from "./UserGroupMaintenance";
import APIRegistry from "./APIRegistry";
import TOKENRegistry from "./TOKENRegistry";
import DataType1 from "./DataType1";
import DataType2 from "./DataType2";
import DataType3 from "./DataType3";
import DataType4 from "./DataType4";
import DataType5 from "./DataType5";
import DataType6 from "./DataType6";
import DynamicTable from "./DynamicTable";
import CodeExtension from "./Codeextension";
import Dropdown from "react-bootstrap/Dropdown";
import { removeToken } from "../../utils/tokenService";
import AccordionPage from "./UIComponents/Accordion";
import BadgesPage from "./UIComponents/BadgesPage";
import DashViewone from "./UIComponents/DashViewone";
import Sidebar from "../Dashboard/UIComponents/Sidebar";
import Slider from "./UIComponents/Slider";

function Dashboard() {
  const [currentView, setCurrentView] = useState("home"); // Initial view
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 972);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/fndMenu/menuloadbyuser`;
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Authorization token is missing.");
        setError("Authorization token is missing.");
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error.toString());
      }
    };

    fetchMenuItems();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/#", { replace: true }); // Redirect to login page
  };

  const toggleSlider = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add main menu items here
  const mainMenuItems = [
    { menuItemId: { menuItemDesc: "Home" }, subMenus: [] },
    { menuItemId: { menuItemDesc: "Transaction" }, subMenus: [] },
    { menuItemId: { menuItemDesc: "Data Management" }, subMenus: [] },
  ];

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <>
            <AccordionPage />
            <BadgesPage />
            <DashViewone />
          </>
        );
      case "dashboard":
        return <DashboardView />;
      case "setup":
        return (
          <SetupView
            onUserMaintenance={() => setCurrentView("userMaintenance")}
            onMenuAccessControl={() => setCurrentView("menuAccessControl")}
            onUserGroupMaintenance={() =>
              setCurrentView("userGroupMaintenance")
            }
            onSystemParameter={() => setCurrentView("systemParameter")}
            onMenuMaintenance={() => setCurrentView("menuMaintenance")}
            onAccessType={() => setCurrentView("accessType")}
            onAPIregistry={() => setCurrentView("apiRegistry")}
            onTokenregistry={() => setCurrentView("tokenRegistry")}
            onDataType1={() => setCurrentView("dataType1")}
            onDataType2={() => setCurrentView("dataType2")}
            onDataType3={() => setCurrentView("dataType3")}
            onDataType4={() => setCurrentView("dataType4")}
            onDataType5={() => setCurrentView("dataType5")}
            onDataType6={() => setCurrentView("dataType6")}
            onDynamicTable={() => setCurrentView("dynamicTable")}
            onCodeExtension={() => setCurrentView("codeExtension")}
          />
        );
      case "userdetails":
        return <UserDetailsView />;
      case "userMaintenance":
        return <UserMaintenanceView />;
      case "accessType":
        return <AccessType />;
      case "systemParameter":
        return <SystemParameter />;
      case "menuAccessControl":
        return <MenuAccessControl />;
      case "menuMaintenance":
        return <MenuMaintenance />;
      case "userGroupMaintenance":
        return <UserGroupMaintenance />;
      case "apiRegistry":
        return <APIRegistry />;
      case "tokenRegistry":
        return <TOKENRegistry />;
      case "dataType1":
        return <DataType1 />;
      case "dataType2":
        return <DataType2 />;
      case "dataType3":
        return <DataType3 />;
      case "dataType4":
        return <DataType4 />;
      case "dataType5":
        return <DataType5 />;
      case "dataType6":
        return <DataType6 />;
      case "dynamictable":
        return <DynamicTable />;
      case "codeExtension":
        return <CodeExtension />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="topbar">
        <div className="navbar-icons">
          <i
            onClick={() => setCurrentView("home")}
            className="fa-solid fa-house"
          ></i>
          <i
            onClick={() => setCurrentView("dashboard")}
            className="fas fa-chart-bar"
          ></i>
          <i
            onClick={() => setCurrentView("setup")}
            className="fa-solid fa-gear"
          ></i>
          <i
            onClick={() => setCurrentView("userdetails")}
            className="fa-solid fa-users"
          ></i>
        </div>

        {/* User Profile Avatar */}
        <div>
          <Dropdown className="navbar-avatar">
            <Dropdown.Toggle
              variant="link"
              id="avatar-dropdown"
              bsPrefix="custom-toggle"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="user-Profile-Icon text-white"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCurrentView("profile")}>
                <FontAwesomeIcon icon={faUserCircle} /> Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Sidebar Icon (below the topbar) */}
       {/* Sidebar Icon (below the topbar and above the sidebar) */}
    <div className="sidebar-icon-container">
         {/* Slider to control the sidebar */}
      <Slider isOpen={isSidebarOpen} toggleSlider={toggleSlider} />
    </div>

      

    

      {/* Sidebar */}
      
        <div className={`sidebar  ${isSidebarOpen ? "open" : "closed"}`}>
          <Sidebar
            menuItems={[...mainMenuItems, ...menuItems]} // Combine main and dynamic menu items
            setCurrentView={setCurrentView}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      

      {/* main view */}
      <div className="main-side"></div>

      {/* Main content rendering based on current view */}
      <div className="main">{renderView()}</div>
    </div>
  );
}

export default Dashboard;
