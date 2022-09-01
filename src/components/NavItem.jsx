import { NavLink } from 'react-router-dom';

function NavItem(props) {
    const { item } = props;
    return (
        <li className="header__nav-item">
            <NavLink className="header__nav-link" to={item.href}>
                {item.name}
            </NavLink>
        </li>
    );
}

export { NavItem };
