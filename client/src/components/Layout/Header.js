import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from 'antd';
import cartimage from "../../images/cartimage.png";
import "./Header.css"

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary back-ground">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand shopkart brand" >
            <HiOutlineShoppingCart /> ShopKart
            </Link>
            <div className="text-center"><SearchInput /></div>
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                <NavLink to="/" className="nav-link brand">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle brand"
                  to={"/categories"}
               
                  data-bs-toggle="dropdown"
                 
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">
                  <li>
                  <Link
                        className="dropdown-item "
                        to={`/categories`}
                      >
                        All Categories
                      </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link brand">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link brand">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle brand"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role == 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item "
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
              <Badge count={cart?.length} showZero>
              <NavLink to="/cart" className="nav-link brand">
                  <img src={cartimage} alt="cart" 
                     height={"30px"}
                     width={"30px"}
                  />
                </NavLink>
              </Badge>

                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
