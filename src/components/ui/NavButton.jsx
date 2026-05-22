export function NavButton({ active, icon: Icon, label, onClick }) {
  return (
    <button className={`nav-button ${active ? 'nav-button-active' : ''}`} onClick={onClick}>
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}
