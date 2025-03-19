import { Navbar, Logo, NavLinks, NavItem, NavLink } from "./NavBarStyles";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar>
            <Logo as={Link} to="/">Gains.com</Logo>  
            <NavLinks>
                <NavItem><NavLink as={Link} to="/bodybuilder/jay-cutler">Jay Cutler</NavLink></NavItem>
                <NavItem><NavLink as={Link} to="/bodybuilder/rich-piana">Rich Piana</NavLink></NavItem>
                <NavItem><NavLink as={Link} to="/bodybuilder/ronnie-coleman">Ronnie Coleman</NavLink></NavItem>
            </NavLinks>
        </Navbar>
    );
};

export default NavBar;
