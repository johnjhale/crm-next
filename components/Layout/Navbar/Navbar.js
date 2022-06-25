import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

function Navbar() {
    const [tables, setTables] = useState(null)

    // Get Tables for Navbar
    useEffect(() => {
        const url = '/application/1/item';
        axios.get(url).then(data => {
            console.log(data.data.items);
            setTables(data.data.items.map(e => {
                return <a className="nav__item" href="#">{e.name[0].toUpperCase() + e.name.slice(1)}</a>
            }));
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <nav className="nav">
            <div className="nav__logo">&nbsp;</div>
            <div className="nav__items">
                <a className="nav__item" href="#">Home</a>
                {tables}
                <a className="nav__item" href="#">Logout</a>
            </div>
        </nav>
    )
}

export default Navbar;