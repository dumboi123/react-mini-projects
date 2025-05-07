import React from 'react'
import { useState, useEffect } from 'react';

function TextUtility(props) {
    const [text, setTextValue] = useState('')
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        const words = text.split(" ").filter((word) => word !== "");
        setWordCount(words.length);
        setCharCount(text.length);
    }, [text]);

    let textchange = (e) => {
        setTextValue(e.target.value)
    }

    let textLowercase = () => {
        let txtLowerCase = text.toLowerCase();
        setTextValue(txtLowerCase)
        props.showAlert('Text Changed to Lowercase', 'success')
    }

    let textUppercase = () => {
        let txtLowerCase = text.toUpperCase();
        setTextValue(txtLowerCase)
        props.showAlert('Text Changed to Uppercase', 'success')
    }

    let textCapitalize = () => {
        let txtCapitalize = text
        let txtArray = txtCapitalize.split(' ')
        let txtSentence = txtArray.map((element) => {
            if (element) {
                let word = element.replace(/\n+/, ' ')
                let first_letter = word[0]
                let rest_letters = word.slice(1)
                return first_letter.toUpperCase() + rest_letters.toLowerCase()
            }
            return '';
        });
        setTextValue(txtSentence.join(' '))
        props.showAlert('Text Changed to Capitalized', 'success')
    }

    let cleanSpaces = () => {
        let textSpace = text.replace(/\s+/g, " ")
        setTextValue(textSpace)
        props.showAlert('Text Changed with Cleaned Spaces', 'success')
    }

    let copytext = () => {
        if (text) {
            navigator.clipboard.writeText(text)
            props.showAlert('Text copied to Clipboard', 'success')
        } else {
            props.showAlert('No text to copy', 'danger')
        }
    }

    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "text.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    let clearAll = () => {
        setTextValue('')
    }


    return (
        <>
            <div className="container-fluid d-md-flex align-items-center py-1" style={{ height: "" }}>
                <div className="container" style={{ height: "50%" }}>
                    <div className="characters .order-md-2 my-1">
                        <b>Easy tool to transform your text</b>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                            style={{ height: "13rem" }} value={text} onChange={textchange}></textarea>
                        <label htmlFor="floatingTextarea2">Type or Paste your text here</label>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex my-1 align-items-center justify-content-around flex-wrap">
                            <button disabled={text.length === 0} type="button" className="btn btn-primary m-1" onClick={textLowercase}>Lowercase</button>
                            <button disabled={text.length === 0} type="button" className="btn btn-primary m-1" onClick={textUppercase}>Uppercase</button>
                            <button disabled={text.length === 0} type="button" className="btn btn-primary m-1" onClick={textCapitalize}>Capitalize</button>
                            <button disabled={text.length === 0} type="button" className="btn btn-primary m-1" onClick={cleanSpaces}>Clean Spaces</button>
                            <button disabled={text.length === 0} type="button" className="btn btn-primary m-1" onClick={clearAll}>Clear all</button>
                        </div>
                    </div>

                </div>
                <div className="container my-5" style={{ height: "50%" }}>
                    <div className="characters .order-md-2 my-1">
                        <b>Words Count : {wordCount}  Characters Count : {charCount}</b>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled" style={{ height: "13rem" }} disabled value={text}></textarea>
                        <label htmlFor="floatingTextarea2Disabled">Your result text</label>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex align-items-center justify-content-around flex-wrap">
                            <button type="button" className="btn btn-primary m-1" onClick={copytext}>Copy</button>
                            <button type="button" className="btn btn-primary m-1" onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextUtility
