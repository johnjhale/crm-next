const Navbar = props => {
    const tables = props.items.map(table => {
        <a class="nav__item" href="#">{table.name}</a>
    });
    return (
        <nav class="nav">
            <div class="nav__logo">&nbsp;</div>
            <div class="nav__items">
                <a class="nav__item" href="#">Home</a>
                <a class="nav__item" href="#">Tables</a>
                <a class="nav__item" href="#">Logout</a>
            </div>
        </nav>
    )
}

Navbar.getInitialProps = () => {
    return {
        count: 4,
        items: [
            {
                "id": 1,
                "application_id": 1,
                "name": "restaurants"
            },
            {
                "id": 2,
                "application_id": 1,
                "name": "users"
            },
            {
                "id": 3,
                "application_id": 1,
                "name": "prizes"
            },
            {
                "id": 4,
                "application_id": 1,
                "name": "turtles"
            },
        ],
    }
}

export default Navbar;
