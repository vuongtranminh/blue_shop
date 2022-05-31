import React, {useEffect} from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const Helmet = props => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <div>
            <Head>
                <title>{`Blue - ${props.title}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                {props.children}
            </div>
        </div>
    )
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired
}

export default Helmet
