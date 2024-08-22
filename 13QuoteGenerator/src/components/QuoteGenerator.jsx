import React,{useEffect, useState} from 'react'

function QuoteGenerator() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    
    const fetchQuote = async () => {
        try {
          const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
            headers: { 'X-Api-Key': 'jZQdfqaqZ4HhrHS1sfQriA==U82ru9NOEeh93XJU' }
          });
          const data = await response.json();
          setQuote(data[0].quote);
          setAuthor(data[0].author);
        } catch (error) {
          console.error('Error fetching the quote:', error);
        }
      };


    useEffect(()=>{
        fetchQuote();
    },[])
  return (
    <div className='quote-container'>
        <h1 className='quote-text'>"{quote}"</h1>
        <p className='quote-auther'>- {author}</p>
        <button onClick={fetchQuote} className='new-quote-button'>
            Get New Quote
        </button>
    </div>
  );
}

export default QuoteGenerator