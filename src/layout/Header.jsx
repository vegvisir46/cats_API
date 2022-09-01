import { NavList } from '../components/NavList';

function Header(props) {
    const { navItems = [] } = props;

    return (
        <header className="header">
            <div className="container">
                <NavList navItems={navItems} />
            </div>
        </header>
    );
}

export { Header };
