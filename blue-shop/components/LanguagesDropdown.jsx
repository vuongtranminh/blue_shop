import React, { useState } from 'react';
import { useRouter } from 'next/router';

const languages = [
    {
        display: "Việt Nam",
        value: "vi",
        flag: "/images/trac-nghiem-family-and-friends-l.png",
    },
    {
        display: "English (US)",
        value: "en",
        flag: "/images/2560px-Flag_of_the_United_States.svg.png",
    },
]

const LanguagesDropdown = () => {

    const router = useRouter()

    const [language, setLanguage] = useState(() => {
        return languages.find(l => l.value === router.locale)
    })

    const [isShow, setIsShow] = useState(false)

    const handleSelect = (item) => {
        setLanguage(item)
        router.push(router.asPath,  router.asPath, {locale: item.value})
        setIsShow(false)
    }

    const handleShow = () => {
        setIsShow(!isShow)
    }

    return (
        <div className="dropdown dropdown--languages">
            <div className="dropdown-selected" onClick={handleShow}>
                <div className="dropdown-item">
                    <span className="dropdown-item__flags"><img src={language.flag}></img></span>
                    <span>{language.display}</span>
                </div>
                <i className={`bx ${isShow ? "bxs-chevron-up" : "bxs-chevron-down"} dropdown-caret`}></i>
            </div>
            <ul className={`dropdown-list ${isShow && "show"}`}>
                {
                    languages.map((item, index) => (
                        <li key={index} className="dropdown-item" data-value={item.value} onClick={() => handleSelect(item)}>
                            <span className="dropdown-item__flags"><img src={item.flag}></img></span>
                            <span>{item.display}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default LanguagesDropdown;
