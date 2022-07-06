import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '../../../axios';

function Navbar() {
    const [tables, setTables] = useState(null)

    // Get Tables for Navbar
    useEffect(() => {
        const url = '/admin';
        axios.get(url).then(data => {
            setTables(data.data.tables.map(e => {
                return <Link href={`/admin/${e}`}><a className="nav__item">{e[0].toUpperCase() + e.slice(1)}</a></Link>
            }));
        }).catch(err => {
            console.log(err);
        })
    }, []);

    console.log(tables);

    return (
        <nav className="nav">
            <div className="nav__logo">&nbsp;</div>
            <div className="nav__items">
                <Link href="/admin"><a className="nav__item">Home</a></Link>
                {tables}
                <Link href="/logout"><a className="nav__item">Logout</a></Link>
            </div>
        </nav>
    )
}

export default Navbar;