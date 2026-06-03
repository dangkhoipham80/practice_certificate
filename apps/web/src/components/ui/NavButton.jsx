import { NavLink } from 'react-router-dom';

export function NavButton({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `nav-button ${isActive ? 'nav-button-active' : ''}`}>
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
}
