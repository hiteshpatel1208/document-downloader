import React from 'react'

export default function Table(props) {
    const {data} = props;

    return (
        <table style={{width: '100%', textAlign: 'left'}}>
            <thead>
                <tr style={{}}>
                    <th>Name</th>
                    <th>Device</th>
                    <th>Path</th>
                    <th>Status</th>
                </tr> 
            </thead>
            <tbody>
                {
                    data.map(el => {
                        return(
                            <tr style={{}} key={el.name}>
                                <td>{el.name}</td>
                                <td>{el.device}</td>
                                <td>{el.path}</td>
                                <td>{el.status}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
