/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Children } from "react";
import UserDetailsView from "components/Dashboard/UserDetailsView";
import SetupView from "components/Dashboard/SetupView";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "bi bi-speedometer2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "bi bi-stars text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "bi bi-geo-alt text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/profile",
    name: "User Profile",
    icon: "bi bi-person text-yellow",
    component: <Profile />,
    layout: "/admin",
  },

  {
    path: "/report",
    name: "User Report",
    icon: "bi bi-clipboard-data text-secondary",
    component: <UserDetailsView />, // Replace with actual component
    layout: "/admin",
  },

  {
    path: "/tables",
    name: "Tables",
    icon: "bi bi-table text-red",
    component: <Tables />,
    layout: "/admin",
  },

  {
    path: "/data",
    name: "Data Management",
    icon: "bi bi-database text-success",
    component: <Tables />,
    layout: "/admin",
    Children: [
      {
        path: "/data/data-management",
        name: "Data Management",
        icon: "bi bi-clipboard-data text-secondary",
        // component: <DataManagement />, // Replace with actual component
        layout: "/admin",
      },
      {
        path: "/data/mapping",
        name: "Mapping",
        icon: "bi bi-diagram-3 text-secondary",
        // component: <Mapping />, // Replace with actual component
        layout: "/admin",
      },
      {
        path: "/data/validation",
        name: "Validation",
        icon: "bi bi-check2-circle text-secondary",
        // component: <Validation />, // Replace with actual component
        layout: "/admin",
      },
    ],
  },

  {
    path: "/transaction",
    name: "Transactions",
    icon: "bi bi-cash-stack text-warning",
    component: <Tables />,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "bi bi-box-arrow-in-right text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "bi bi-person-plus text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/setting",
    name: "Settings",
    icon: "bi bi-gear text-blue",
    component: <SetupView />,
    layout: "/admin", // Make sure this matches the layout you're using
  },
];
export default routes;
