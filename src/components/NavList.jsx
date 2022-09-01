import { NavItem } from './NavItem';

function NavList(props) {
    const { navItems } = props;
    return (
        <ul className="header__nav">
            {navItems.map((item, index) => (
                <NavItem key={index} item={item} />
            ))}
        </ul>
    );
}

export { NavList };
