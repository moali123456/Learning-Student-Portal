import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../store/authSlice";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";

interface HeaderProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftChildren, rightChildren }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect user after logout
  };

  return (
    <div className="home-header flex justify-between items-center p-4 mt-4">
      <div className="flex items-center gap-6">{leftChildren}</div>
      <div className="flex items-center gap-4 relative">
        {rightChildren}
        {isAuthenticated && (
          <div className="relative mt-1">
            <button
              className="text-gray-800 font-medium focus:outline-none"
              onClick={handleToggleDropdown}
            >
              <AiOutlineLogout size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
