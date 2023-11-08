import React from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  backgroundColor: "#f44336", 
  color: "white", 
  padding: "10px 20px", 
  border: "none", 
  borderRadius: "5px", 
  cursor: "pointer", 
  marginLeft: "auto", 
};

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

  return (
    <button onClick={handleLogout} style={buttonStyle}>
      Logout
    </button>
  );
};

export default LogoutButton;
