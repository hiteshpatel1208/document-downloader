import React, { useCallback, useState } from 'react'
import Modal from './modal';

export default function Table(props) {
    const { data } = props;

    const [selected, setSelected] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const masterInput = useCallback(input => {
        if(input) {

            const {length: dataLength} = data;
            const {length: selectedLength} = selected;

            if(selectedLength === dataLength) {
                input.checked = true;
                input.indeterminate = false;
            } else if(selectedLength > 0 && selected.length < dataLength) {
                input.checked = false;
                input.indeterminate = true;
            } else if(selectedLength === 0) {
                input.checked = false;
                input.indeterminate = false;
            }
        }
    }, [selected, data]);

    const handleSelection = (e, record) => {
        if (e.target.checked) {
            const selection = [...selected];
            selection.push(record);
            setSelected(selection);
        } else{
            const indexToRemove = selected.indexOf(record);
            const selection = [...selected];
            selection.splice(indexToRemove, 1);
            setSelected(selection);
        }
    }

    const handleDownloadSelectedClick = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleSelectAllChange = () => {
        if(selected.length === data.length){
            setSelected([]);
        } else {
            setSelected(data);
        }
    }

    return (
        <>
            <div className='dd-table-container'>
                <table className='dd-table' data-testid='table'>
                    <thead>
                        <tr className='dd-table__row'>
                            <th>
                                <input className='dd-table__row__checkbox-input' onChange={handleSelectAllChange} type='checkbox' ref={masterInput}/>
                            </th>
                            <th> {selected.length > 0 ? selected.length : 'None'} Selected</th>
                            <th colSpan='3'>
                                <button type='button' className='dd-table__download-selected-btn' onClick={handleDownloadSelectedClick} disabled={!selected.some(s => s.status === 'available')}>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 35 32">
                                        <title>download</title>
                                        <path fill="#000" d="M8.956 10.375h17.038l-8.519 11.249z"></path>
                                        <path fill="#000" d="M34.403 29.488c0 1.201-0.983 2.075-2.075 2.075h-29.706c-1.201 0-2.075-0.983-2.075-2.075v0c0-1.201 0.983-2.075 2.075-2.075h29.706c1.201-0.109 2.075 0.874 2.075 2.075v0z"></path>
                                        <path fill="#000" d="M20.314 11.795c0 0.764-0.655 1.42-1.42 1.42h-2.84c-0.764 0-1.42-0.655-1.42-1.42v-9.939c0-0.764 0.655-1.42 1.42-1.42h2.84c0.764 0 1.42 0.655 1.42 1.42v9.939z"></path>
                                    </svg>
                                    Download Selected
                                </button>
                            </th>
                        </tr>
                        <tr className='dd-table__row'>
                            <th />
                            {
                                Object.keys(data[0]).map(key => <th key={key} style={{ textTransform: 'capitalize' }}>{key}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(el => {
                                return (
                                    <tr className={selected.includes(el) ? ' dd-table__row dd-table__row--selected' : 'dd-table__row'} key={el.name}>
                                        <td>
                                            <input className='dd-table__row__checkbox-input' type='checkbox' onChange={(e) => handleSelection(e, el)} checked={selected.includes(el)} />
                                        </td>
                                        <td>{el.name}</td>
                                        <td>{el.device}</td>
                                        <td>{el.path}</td>
                                        <td className='dd-table__row__status' style={{ textTransform: 'capitalize' }}>
                                            {
                                                el.status === 'available' && (
                                                    <svg fill='green' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 15 15" >
                                                        <path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
                                                    </svg>
                                                )
                                            }
                                            {el.status}
                                        </td>
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
