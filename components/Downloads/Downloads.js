import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '../../axios';

function Navbar() {
    const [options, setOptions] = useState(null);
    const [fileName, setFileName] = useState(null);

    // Get Tables for Navbar
    useEffect(() => {
        // const url = '/admin/download';
        // axios.get(url).then(data => {
        //     setOptions(data.data.entries.map(e => {
        //         return <button></button>
        //     }));
        // }).catch(err => {
        //     console.log(err);
        // })
        setOptions([
            <button key={'getToyAnimals'} onClick={(e) => runJob('/admin/download/getToyAnimals')}>Get Toys w/ Animal Names</button>,
            <button key={'getAnimals'} onClick={(e) => runJob('/admin/download/getAnimals')}>Get Animals w/ IDs</button>,
        ])
    }, []);

    function runJob(url) {
        axios.get(url).then(data => {
            if (data.data.file) {
                setFileName(data.data.file);
                console.log(data.data.file);
                fetch('http://localhost:3000/public/resources/files/getToyAnimals.xls').then(d => {
                    
                })
            }
        })
    }

    return (
        <div>
            {options}
        </div>
    )
}

export default Navbar;