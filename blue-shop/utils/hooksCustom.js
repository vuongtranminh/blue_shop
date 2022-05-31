
import { useRef } from "react"

export const UseFocus = () => {
	const htmlElRef = useRef(null)
	const setFocus = () => {
        console.log(htmlElRef.current)
        htmlElRef.current &&  htmlElRef.current.focus()
    }

	return [ htmlElRef,  setFocus ] 
}