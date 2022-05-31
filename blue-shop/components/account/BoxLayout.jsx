import { useEffect } from 'react'
import { useRouter } from 'next/router';

const BoxLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        const user = false
        if (user) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="box">{children}</div>
    )
}

export const BoxHeader = ({ children }) => {
    return (
        <div className="box__header">
            {children}
        </div>
    )
}

export const BoxBody = (props) => {
    return (
        <div className={`box__body ${props.className}`}>
            {props.children}
        </div>
    )
}

export const BoxFooter = ({ children }) => {
    return (
        <div className="box__footer">
            {children}
        </div>
    )
}

export default BoxLayout