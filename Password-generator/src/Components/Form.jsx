import { useState, useEffect, useRef } from "react";

const Form = () => {


  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [symbolAllowed, setsymbolAllowed] = useState(false);
  const [upperCase, setupperCase] = useState(false);
  const inputRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  
  const handleClick = () => {
    setShowPopup(true);

    // Hide the popup after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };


  const copyInputText = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      navigator.clipboard.writeText(inputElement.value)
        .then(() => {
          setCopySuccess('Copied!');
          handleClick()
          // alert("Copied")
        })
        .catch(() => {
          setCopySuccess('Failed to copy!');
          handleClick()
          // alert("Failed to copy!")
        });
    }
  };


  useEffect(() => {
    let pass = "";
    let str = "";
    const char = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digit = "0123456789";
    const symbol = "`!@#$%^&*()_-+={}[]:;,.?/~";

    str += char;

    if (numberAllowed) str += digit;
    if (upperCase) str += upper;
    if (symbolAllowed) str += symbol;

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, length, upperCase, symbolAllowed]);

  return (
    <>
      <div className=" relative bg-indigo-600 h-96 w-96  px-4 py-10 rounded-xl flex flex-col items-center">
        <form onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <input
            ref={inputRef}
            id="inp"
            name="inp"
            type="text"
            readOnly
            value={Password}
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm "
          />
          <label 
          onClick={copyInputText}
          htmlFor="inp" className=" text-xl mx-4 bg-black px-2 py-2 rounded-md">
             &#10697;
          </label>
        </form>

        <div className=" flex my-4 items-center">
          <input
            type="range"
            max={20}
            min={8}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <p className="my-2 mx-4 font-bold text-lg">
            Length : <span className=" text-red-500">{length}</span>{" "}
          </p>
        </div>

        <div className="flex justify-between items-center w-2/3 my-2 bg-black hover:bg-black/85 px-10 py-2 rounded-lg">
          <input
            className="checkBox"
            onChange={() => {
              setupperCase((prev) => !prev);
            }}
            type="checkbox"
            name="upperchars"
            id="upperchars"
            value={upperCase}
          />
          <label htmlFor="upperchars"> Upper-Case </label>
        </div>

        <div className="flex justify-between items-center w-2/3 my-2 bg-black hover:bg-black/85 px-10 py-2 rounded-lg">
          <input
            className="checkBox"
            onChange={() => setnumberAllowed((prev) => !prev)}
            type="checkbox"
            name="num"
            id="num"
            value={numberAllowed}
          />
          <label htmlFor="num"> Numbers </label>
        </div>

        <div className="flex justify-between items-center w-2/3 my-2 bg-black hover:bg-black/85 px-10 py-2 rounded-lg">
          <input
            className="checkBox"
            onChange={() => {
              setsymbolAllowed((prev) => !prev);
            }}
            type="checkbox"
            name="sChar"
            id="sChar"
            value={symbolAllowed}
          />
          <label htmlFor="sChar"> Special chars </label>
        </div>

        {
          showPopup && (
            <div className=" Pop-Up py-1 absolute rounded-lg bottom-4 right-2 bg-red-500 w-1/3 text-center">
            <p className=" uppercase font-bold">{copySuccess}</p>
          </div>
          )
        }


      </div>
    </>
  );
};

export default Form;
