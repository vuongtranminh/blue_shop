import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Grid from './Grid'
import ProductCard from './ProductCard'

const InfinityList = props => {

    const { data } = props

    return (
        <div>
            <Grid
                col={2}
                mdCol={2}
                xlCol={4}
                gap={20}
            >
                {
                    data.map((item, index) => (
                        <ProductCard
                            key={index}
                            item={item}
                        />
                    ))
                }
            </Grid>
        </div>
    )
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired
}

export default InfinityList
