import React, { useState } from 'react'
import '../App.css'

function PasswordGenerator(props) {
  const [charRange, setCharRange] = useState(0)
  const [password, setpassword] = useState('')
  const [isNumber, setisNumber] = useState(true)
  const [isLower, setisLower] = useState(false)
  const [isUpper, setisUpper] = useState(false)
  const [isSymbols, setisSymbols] = useState(false);

  const numbers = '0123456789'
  const lowerChar = 'abcdefghijklmnopqrstuvwxyz'
  const upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const specialSymbols = '!@#$%^&*()<>,.?/[]{}-=_+|/'

  let newPassword = ''
  let totalRange = (e) => {
    let textRange = e.target.value
    setCharRange(textRange)
    if (isNumber) { newPassword += numbers }
    if (isLower) { newPassword += lowerChar }
    if (isUpper) { newPassword += upperChar }
    if (isSymbols) { newPassword += specialSymbols }

    let generatePassword = ''
    for (let i = 0; i < textRange; i++) {
      let randomNumber = Math.floor(Math.random() * newPassword.length) + 0;
      generatePassword += newPassword[randomNumber]
    }
    setpassword(generatePassword)
  }

  const regenerate = () => {
    let newPassword = '';
    if (isNumber) newPassword += numbers;
    if (isLower) newPassword += lowerChar;
    if (isUpper) newPassword += upperChar;
    if (isSymbols) newPassword += specialSymbols;

    let generatedPassword = '';
    for (let i = 0; i < charRange; i++) {
      const randomNumber = Math.floor(Math.random() * newPassword.length);
      generatedPassword += newPassword[randomNumber];
    }
    setpassword(generatedPassword);
  };

  const copy = () => {
    if (password.length !== 0) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          props.showAlert('Text copied to Clipboard', 'success')
        })
        .catch(() => {
          alert("Something went wrong while copying");
        });
    }
  };
  return (
    <>
      <div className='container password-layout'>
        <div className='container password-display bg-primary-subtle'>
          <div className="display-area text-pri mary d-flex align-items-center px-2">
            {password}
          </div>
          <div className="copy-layout">
            <img width="40" height="40" src="https://img.icons8.com/emoji/48/counterclockwise-arrows-emoji.png" onClick={regenerate} alt="counterclockwise-arrows-emoji" />
            <img width="40" height="40" src="https://img.icons8.com/fluency/48/copy.png" onClick={copy} alt="copy" />
          </div>
        </div>
        <div className='container d-flex align-items-center justify-center password-form'>
          <h4 className='pb-5'>Generate Random Passwords</h4>
          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="customRange3" className="form-label">Enter how many characters range : {(charRange <= 9) ? `0` + charRange : charRange}</label>
              <input type="range" className="form-range" min="1" max="50" step="1" value={charRange} onChange={totalRange} id="customRange3" />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" checked type="checkbox" value={isNumber} id="CheckNumbers" onChange={(e) => { setisNumber(e.target.checked) }} />
                <label className="form-check-label" htmlFor="CheckNumbers">
                  Include Numbers: (1234567890)
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={isLower} id="CheckLower" onChange={(e) => { setisLower(e.target.checked) }} />
                <label className="form-check-label" htmlFor="CheckLower">
                  Include Lowercase Characters:(abcdefgh)
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={isUpper} id="CheckUpper" onChange={(e) => { setisUpper(e.target.checked) }} />
                <label className="form-check-label" htmlFor="CheckUpper">
                  Include Uppercase Characters:(ABCDEFGH)
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={isSymbols} id="CheckSymbols" onChange={(e) => { setisSymbols(e.target.checked) }} />
                <label className="form-check-label" htmlFor="CheckSymbols">
                  Include Symbols
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PasswordGenerator
