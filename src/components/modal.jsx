import React from 'react'

export default function Modal(props) {
    const { data, handleCloseClick } = props;

    return (
        <section className='dd-modal'>
            <div className='dd-modal__overlay' />
            <div className='dd-modal__body'>
                <div className='dd-modal__header'>
                    Your Selection
                </div>
                <div className='dd-modal__content'>
                    <ol className='dd-modal__selected-list'>
                        {
                            data.map(el => {
                                return (
                                    <li className='dd-modal__selected-list__item' key={el.name}>
                                        <div className='dd-modal__selected-list__item__details'>
                                            <strong>Name:</strong> {el.name}
                                        </div>
                                        <div className='dd-modal__selected-list__item__details'>
                                            <strong>Device:</strong> {el.device}
                                        </div>
                                        <div className='dd-modal__selected-list__item__details'>
                                            <strong>Path:</strong> {el.path}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
                <button className='dd-modal__close-btn' onClick={handleCloseClick} />
            </div>
        </section>
    )
}
