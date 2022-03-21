import "./App.css"
import logo from "./brbdlogo.png"
import { useState, useEffect } from "react";

const App = () => {

  const [quote, setQuote] = useState("");

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const fetchQuote = async () => {
    try {
      setError(false);
      const response = await fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes");
      if (response.status !== 200) {
        throw new Error("Sorry, something went wrong");
      }
      const data = await response.json();

      setQuote(data[0]);

    } catch (error) {
      console.log("error: ", error);
      setError({ error: true, message: error.message });
    }
  };

  useEffect(() => {
    fetchQuote();
    console.log("useEffect worked");
  }, []);
  if(!quote ) {
    return <h1>Please wait. Getting Quote....</h1>
  }

  return (
    <div className="main">      

      <div className="title">
        <img src={logo} alt="Breaking Bad Logo"></img>        
        <h1>Quote Generator</h1>
        <button onClick={fetchQuote}>Get Quote</button>
      </div>      

      <div className="quote">
        <h2>"{quote.quote}"</h2>
      </div>

      <div className="author">
        <h3>- {quote.author} -</h3>
      </div>
      
    </div>
  );
};

export default App;