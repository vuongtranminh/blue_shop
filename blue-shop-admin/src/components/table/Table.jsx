import React, {useEffect, useState} from 'react'

import './table.css'

const Table = props => {

    const [range, setRange] = useState([])

    useEffect(() => {
        listPage()
    }, [props.totalPage])

    const selectPage = page => {
        props.onSelectPage(page)
    }

    const listPage = () => {
        let range = []
        for(var i = 1; i <= props.totalPage; i++) {
            range = [...range, i]
        }
        setRange(range)
    }

    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData && props.renderHead ? (
                            <thead>
                                <tr>
                                    {
                                        props.headData.map((item, index) => props.renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) : null
                    }
                    {/* {
                        props.bodyData && props.renderBody ? (
                            <tbody>
                                {
                                    dataShow.map((item, index) => props.renderBody(item, index))
                                }
                            </tbody>
                        ) : null
                    } */}
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </div>
            {
                props.totalPage > 1 ? (
                    <div className="table__pagination">
                        {
                            range.map((item, index) => (
                                <div key={index} className={`table__pagination-item ${item === props.page ? 'active' : ''}`} onClick={() => selectPage(item)}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
