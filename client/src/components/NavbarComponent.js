import React from 'react';
// import { slide as Menu } from 'react-burger-menu'
// import './NavbarComponent.css'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

export default class NavbarComponent extends React.Component {
  // showSettings (event) {
  //   event.preventDefault();
  // }

  // render () {
  //   return (
  //     <Menu>
  //       <a id="home" className="menu-item" href="/">Home</a>
  //       <a id="composers" className="menu-item" href="/composers">Composers</a>
  //       <a id="about" className="menu-item" href="/about">Contribute</a>
  //       <a id="donate" className="menu-item" href="/donate">Donate</a>
  //       <a id="contact" className="menu-item" href="/contact">Contact</a>
  //       {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
  //     </Menu>
  //   );
  // }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
              <a href="/">ReactBlog</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li role="presentation"><a href="/posts">All Posts</a></li>
            <li role="presentation"><a href="/login">Login</a></li>
            <li role="presentation"><a href="/signup">Signup</a></li>
            {/* <NavItem href="/composers">Composers</NavItem>
            <NavItem href="/contribute">Contribute</NavItem>
            <NavItem href="/donate">Donate</NavItem> */}
            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown> */}
          </Nav>
        {/* <Nav pullRight>
          <NavItem href="#">Link Right</NavItem>
          <NavItem href="#">Link Right</NavItem>
        </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
// const NavbarComponent = () => (
// render = () =>
//   <Navbar inverse collapseOnSelect>
//     <Navbar.Header>
//       <Navbar.Brand>
//         <a href="/">LiederNet</a>
//       </Navbar.Brand>
//       <Navbar.Toggle />
//     </Navbar.Header>
//     <Navbar.Collapse>
//       <Nav>
//         <li role="presentation"><a href="/composers">Composers</a></li>
//         <li role="presentation"><a href="/contribute">Contribute</a></li>
//         <li role="presentation"><a href="/donate">Donate</a></li>
//         {/* <NavItem href="/composers">Composers</NavItem>
//         <NavItem href="/contribute">Contribute</NavItem>
//         <NavItem href="/donate">Donate</NavItem> */}
//         {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//           <MenuItem eventKey={3.1}>Action</MenuItem>
//           <MenuItem eventKey={3.2}>Another action</MenuItem>
//           <MenuItem eventKey={3.3}>Something else here</MenuItem>
//           <MenuItem divider />
//           <MenuItem eventKey={3.3}>Separated link</MenuItem>
//         </NavDropdown> */}
//       </Nav>
//       {/* <Nav pullRight>
//         <NavItem href="#">Link Right</NavItem>
//         <NavItem href="#">Link Right</NavItem>
//       </Nav> */}
//     </Navbar.Collapse>
//   </Navbar>
// );

// export default NavbarComponent;
