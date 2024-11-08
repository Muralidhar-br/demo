// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";
// import Profile from "views/examples/Profile";
// import UserDetailsView from "components/Dashboard/UserDetailsView";
// import SetupView from "components/Dashboard/SetupView";
// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/admin/*" element={<AdminLayout />}>
//             {/* Define all admin routes here */}
//             <Route path="profile/*" element={<Profile />}>
//               <Route path="user-report" element={<UserDetailsView />} />
//             </Route>
//             {/* Other routes */}
//             <Route path="setting" element={<SetupView />} />
//           </Route>
//             {/* Other routes */}
         
//           <Route path="/auth/*" element={<AuthLayout />} />
//           {/* <Route path="*" element={<Navigate to="/admin/index" replace />} /> */}
         
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Profile from "views/examples/Profile";
import UserDetailsView from "components/Dashboard/UserDetailsView";
import SetupView from "components/Dashboard/SetupView";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin layout with nested routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* Profile route with nested UserDetailsView */}
            <Route path="profile" element={<Profile />}>
              <Route path="user-report" element={<UserDetailsView />} />
            </Route>
            {/* Additional routes */}
            <Route path="setting" element={<SetupView />} />
          </Route>

          {/* Auth layout route */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/* Catch-all route to redirect to a default page */}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
