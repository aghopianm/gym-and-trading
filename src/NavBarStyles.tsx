import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: lightseagreen;
    color: white;
`;

export const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;  /* Remove default link underline */
    color: white;  /* Ensure it stays white */

    &:hover {
        color: #ff4081;
    }
`;

export const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 1.5rem;
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
        color: #ff4081;
    }
`;
