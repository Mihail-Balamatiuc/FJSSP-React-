// Navbar.tsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <ul className="navbar">
        <li><NavLink to="/" end>Schedule</NavLink></li>
        <li><NavLink to="/config">Config</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </nav>
  );
}
