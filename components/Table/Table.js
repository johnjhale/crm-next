import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import axios from '../../axios';

function Table() {
    const router = useRouter();
    const tableName = router.query.tableName;
    const [headers, setHeaders] = useState(null);
    const [entries, setEntries] = useState(null);
    const [popup, setPopup] = useState(null);
    const [order, setOrder] = useState(null);
    const [desc, setDesc] = useState(false);
    
    // Get Tables for Navbar
    useEffect(() => {
        let params = '?';
        params += order ? `order=${order}&` : '';
        params += desc ? `desc=${desc}&` : '';
        let url = `/admin/${tableName}${params}`;

        //Get Headers
        axios.get(url).then(data => {
            setHeaders(data.data.fields);
            setEntries(data.data.entries);
        }).catch(err => {
            console.log(err);
        })
    }, [tableName, order, desc]);

    let displayHeaders = '';
    let displayEntries = '';

    if (headers && headers.length) {
        displayHeaders = headers.map(header => {
            return <th className="table__header" onClick={(e) => updateParams('order', header.name)}>{header.name}</th>
        });
    }

    if (entries && entries.length) {
        updateDisplayHeaders();
    }

    function updateParams(param, val) {
        if (param === 'order') {
            setDesc(!desc);
            setOrder(val);
        }
    }

    function updateDisplayHeaders() {
        let entryIndex = 1;
        displayEntries = entries.map(entry => {
            let output = [];
            let index = 0;
            for (const [key, value] of Object.entries(entry)) {
                if (headers[index].type === 'tinyint') {
                    const identifier = `${key}_${entryIndex}`;
                    output.push(<td key={key} className="table__row" onClick={(e) => submitFieldChange(entry.id, key, value ? 0 : 1)}><input id={identifier} name={identifier} type="checkbox" value={value} checked={value} /></td>);
                }
                else {
                    output.push(<td key={key} className="table__row" onClick={(e) => updatePopup(entry.id, key, value, e)}>{value}</td>);
                }
                index++;
            }
            entryIndex++;
            return <tr>{output}</tr>;
        });
    }

    function updatePopup(id, key, val, popupInitiator) {
        const coords = popupInitiator.target.getBoundingClientRect();
        const paddingLeft = window.getComputedStyle(popupInitiator.target).getPropertyValue('padding-left').split('px')[0]*2;
        const paddingTop = window.getComputedStyle(popupInitiator.target).getPropertyValue('padding-top').split('px')[0]*2;
        console.log(paddingLeft, paddingTop);
        const popupElem = (<Fragment><div className="modal__background" onClick={(e) => setPopup(null)}></div>
            <input id="table-popup" type="text" name={key} value={val} className="table__input"
            style={{position: 'absolute', left: coords.left-paddingLeft, top: coords.top-paddingTop, width: coords.width, height: coords.height}}
            onChange={(e) => updatePopup(id, key, e.target.value, popupInitiator)} onKeyUp={(e) => submitFieldChange(id, key, val, e)} /></Fragment>);
        setPopup(popupElem);
    }

    function updateCheckbox(id, key, initiator) {
        let checkboxInput = initiator.target;
        const oldEntries = [...entries];
        oldEntries.forEach(entry => {
            if (entry[checkboxInput]) {
                entry[key] = 'Potato';
            }
        });
    }
    
    /**
     * Submits a field change to the database  
     * @param {*} id 
     * @param {*} key 
     * @param {*} val 
     * @param {*} e 
     */
    function submitFieldChange(id, key, val, e) {
        if (e == undefined || e.code === 'Enter') {

            if (!validateSubmission(key, val)) {
                return false;
            }

            const url = `/admin/${tableName}/${id}`;
            const data = {[key]: val};
            
            //Update an Entry
            axios.put(url, data).then(data => {
                if (data.data.success) {
                    const oldEntries = [...entries];
                    oldEntries.forEach(entry => {
                        if (entry.id === id) {
                            entry[key] = val;
                        }
                    });
                    setPopup(null);
                    setEntries(oldEntries);
                    return true;
                }
                else {
                    //TODO: Set an Error Message
                    return false
                }
            }).catch(err => {
                console.log(err);
                return false;
            });
        }
    }

    function validateSubmission(key, val) {

        let type = '';
        if (!headers || !headers.length || !key) {
            return false;
        }

        headers.forEach(e => {
            if (e.name === key) {
                type = e.type
            }
        });
        
        if (type.includes('varchar')) {
            const regex = /\(([0-9]*)\)/;
            const length = type.match(regex)[1];
            return val && val.length <= length;
        }
        else if (type === 'int') {
            return !isNaN(parseInt(Number(val)));
        }
        else if (type === 'tinyint') {
            return val == 0 || val == 1;
        }
        else if (type === 'timestamp' || type === 'date') {
            console.log('Timestamp');
            //TODO: Add moment to check date/times
            return true;
        }
        else {
            return false;
        }
    }
        
    return (
        <Fragment>
            {popup}
            <table className="table">
            <thead>
                <tr>
                    {displayHeaders}
                </tr>
            </thead>
            <tbody>
                {displayEntries}
            </tbody>
            </table>
        </Fragment>
    )
}

export default Table;