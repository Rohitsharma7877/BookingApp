
// import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";

import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import { useMemo } from "react";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
// import state from "state";





function App() {

  const mode=useSelector((state)=>state.mode);
  const theme= useMemo(()=>createTheme(themeSettings(mode)),[mode]);      
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <div className="App">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
        
          <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element= { <HomePage /> } />     
         <Route  path="/profile/:userId"  element={<ProfilePage/>} /> 
             
             
            

          </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
