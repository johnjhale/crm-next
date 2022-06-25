import React, { useState, useEffect } from 'react';
import axios from '../../axios';

function Table() {
    const [headers, setHeaders] = useState(null);
    const [entries, setEntries] = useState(null);

    // Get Tables for Navbar
    useEffect(() => {
        let url = '/application/1/item/1/field';

        //Get Headers
        axios.get(url).then(data => {
            setHeaders(data.data.fields);
        }).catch(err => {
            console.log(err);
        })

        //Get Entries
        url = '/application/1/item/1/entry';
        axios.get(url).then(data => {
            setEntries(data.data.entries);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    console.log(headers);
    console.log(entries);

    let displayHeaders = '';
    let displayEntries = '';

    if (headers && headers.length) {
        displayHeaders = headers.map(e => {
            return <th className="table__header">{e.name}</th>
        });
    }

    if (entries && entries.length) {
        let index = 1;
        displayEntries = entries.map(e => {
            let output = [<td className="table__row">{index}</td>];
            for (const [key, value] of Object.entries(e.value)) {
                console.log(key, value)
                output.push(<td className="table__row">{value.value}</td>);
            }
            index++;
            return <tr>{output}</tr>;
        });
    }

    return (
        <table className="table">
          <thead>
              <tr>
                    <th className="table__header">&nbsp;</th>
                    {displayHeaders}
              </tr>
          </thead>
          <tbody>
              {displayEntries}
          </tbody>
        </table>
    )
}

export default Table;