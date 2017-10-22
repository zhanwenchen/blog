import React from 'react';
// import { slide as Menu } from 'react-burger-menu'
// import './NavbarComponent.css'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

export default class NavbarComponent extends React.Component {
  // showSettings (event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <div id='navbar'>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Blog</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/* <li role="presentation"><a href="/posts">All Posts</a></li> */}
              {/* <li role="presentation"><a href="/login">Login</a></li> */}
              {/* <li role="presentation"><a href="/signup">Signup</a></li> */}
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
            <Nav pullRight>
              {/** NOTE that NavItem has a bug that does nothing when clicked. Being fixed in https://github.com/react-bootstrap/react-bootstrap/pull/2790*/}
              <li role="presentation"><a href='/signup'>Signup</a></li>
              <li role="presentation"><a href='/login'>Login</a></li>
              {/* <NavItem href="/signup">Signup</NavItem> */}
              {/* <NavItem href="/login">Login</NavItem> */}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
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
