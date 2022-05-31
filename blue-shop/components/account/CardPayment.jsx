import React from 'react'

const CardPayment = () => {
    return (
        <div className="card-payment">
            <div className="card-payment__inner">
                <div className="card-payment__front">
                    <img src="/images/card/map.png" className="card-payment__map-img" />
                    <div className="card-payment__row">
                        <img className="card-payment__chip-img" src="/images/card/chip.png" />
                        <img className="card-payment__visa-img" src="/images/card/visa.png" />
                    </div>
                    <div className="card-payment__row card-payment__no">
                        <p>5244</p>
                        <p>2150</p>
                        <p>8252</p>
                        <p>6420</p>
                    </div>
                    <div className="card-payment__row card-payment__holder">
                        <p>CARD HOLDER</p>
                        <p>VALID TILL</p>
                    </div>
                    <div className="card-payment__row card-payment__name">
                        <p>TRAN MINH VUONG</p>
                        <p>10 / 25</p>
                    </div>
                </div>
                <div className="card-payment__back">
                    <img src="/images/card/map.png" className="card-payment__map-img" />
                    <div className="card-payment__bar"></div>
                    <div className="card-payment__row card-payment__cvv">
                        <div>
                            <img src="/images/card/pattern.png" />
                        </div>
                        <p>824</p>
                    </div>
                    <div className="card-payment__row card-payment__text">
                        <p>This is a virtual card design built using HTML and CSS. You can
                            also design something like this.</p>
                    </div>
                    <div className="card-payment__row card-payment__signature">
                        <p>CUSTOMER SIGNATURE</p>
                        <img className="card-payment__visa-img" src="/images/card/visa.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPayment