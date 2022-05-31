import React, {useState, useRef, useEffect} from 'react'

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        activeCode: '',
        password: '',
        phone: '',
    })

    const nameRef = useRef()

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name] : value,
        })
    }

    useEffect(() => {

    }, [])

    const checkName = (name) => {
        let result = /^[a-zA-Z ]+$/.test(name);
        console.log(result);
    }

    const handleBlurName = (e) => {
        const {name, value} = e.target
        console.log(name, value)
    }
    
  return (
    <form>
        <div className="input-group">
            <div className="input-group__inner">
                <label htmlFor="name"><span className="text-gradient">Họ tên</span></label>
                <div className="border-input">
                    <input />
                    <button className="border-input__btn">Lấy mã</button>
                </div>
            </div>
            <p className="input-group__message text-gradient-orange">Tối đa 30 ký tự</p>
        </div>


    </form>
  )
}

export default Register