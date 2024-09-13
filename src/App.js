import React, { useState } from 'react'
import './App.css';
import { toast, ToastContainer } from 'react-toastify'
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message';

function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowerrcase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)


  const handleGeneratePassword = (e) => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      notify("You must select atleast one option", true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password

  }
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    } else {

      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }
  }
  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Password is empty', true)

    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className="app">
      <div className="container">
        <div className="generator">
          <h1 className="generator_header">Password Generator</h1>
          <div className="generator_password">
            <input className="input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleCopyPassword} className="copy_btn">
              <i className="far fa-clipboard"></i>
            </button>

          </div>

          <div className="form-group">
            <label htmlForm="password-strength">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e => setPasswordLength(e.target.value))}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20" min="10" />


          </div>

          <div className="form-group">
            <label htmlForm="uppercase-letters">Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters" />
          </div>

          <div className="form-group">
            <label htmlForm="lower-letters">Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowerrcase(e.target.checked)}
              type="checkbox"
              id="lower-letters"
              name="lower-letters" />


          </div>

          <div className="form-group">
            <label htmlForm="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox" id="include-numbers"
              name="include-numbers" />


          </div>
          <div className="form-group">
            <label htmlForm="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox" id="include-symbols"
              name="include-symbols" />


          </div>

          <button onClick={handleGeneratePassword} className="generator_btn">Generate Password
          </button>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"

          />

        </div>
      </div>
    </div>
  );
}

export default App;
