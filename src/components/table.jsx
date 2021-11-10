import React, { useState } from 'react'
import Modal from './modal';

export default function Table(props) {
    const { data } = props;

    const [selected, setSelected] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSelection = (e, record) => {
        if (e.target.checked) {
            const selection = [...selected];
            selection.push(record);
            setSelected(selection);
        } else {
            const indexToRemove = selected.indexOf(record);
            const selection = [...selected];
            selection.splice(indexToRemove, 1);
            setSelected(selection);
        }
    }

    const handleDownloadSelectedClick = () => {
        // alert(JSON.stringify(selected));
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='dd-table-container'>
                <table className='dd-table'>
                    <thead>
                        <tr className='dd-table__row'>
                            <th>
                                <label>
                                    <input type='checkbox' checked={selected.length === data.length} />
                                    <span></span>
                                </label>
                            </th>
                            <th>Selected {selected.length}</th>
                            <th colSpan='3'>
                                <button type='button' className='button' onClick={handleDownloadSelectedClick} disabled={selected.length === 0}>
                                    Download Selected
                                </button>
                            </th>
                        </tr>
                        <tr className='dd-table__row'>
                            <th />
                            <th>Name</th>
                            <th>Device</th>
                            <th>Path</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(el => {
                                return (
                                    <tr className='dd-table__row' key={el.name}>
                                        <td>
                                            <label>
                                                <input type='checkbox' onChange={(e) => handleSelection(e, el)} />
                                                <span></span>
                                            </label>
                                        </td>
                                        <td>{el.name}</td>
                                        <td>{el.device}</td>
                                        <td>{el.path}</td>
                                        <td style={{textTransform: 'capitalize'}}>{el.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                showModal && (
                    <Modal data={selected} handleCloseClick={handleModalClose} />
                )
            }
        </>
    )
}
