import React, {useState}from 'react';
import './index.css';
import './App.css'
import Swal from 'sweetalert2'

function App(props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true)
    if (typeof(props) === 'object') {
      Swal.fire({
        title: '<span style="color:black">Error!<span>',
        icon: 'error',
        background: '#808080',
        confirmButtonText: 'Ok',
        html: '<span style="color:black">You can\'t submit a empty text.<span>',
      })
    }else {
      try {
        const response = await fetch('http://localhost:7000/ner/',{
          method:'POST',
          body: JSON.stringify({
            'sentence': props,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          cache: 'default'
        })
        const aux = await response.json()
        const aux2 = JSON.stringify(aux)
        if (aux2 === '{}') {
          Swal.fire({
            title: '<span style="color:black">Information<span>',
            icon: 'info',
            background: '#808080',
            confirmButtonText: 'Ok',
            html: '<span style="color:black">Oops!! Looks like we couldn\'t find any drugs in your text.<br>'
             + 'Please try again.<span>',
          })
        }else {
          const drugs_list = aux['DRUG']
          //request to the WikiMedia API
          const length = drugs_list.length
          for( let i=0; i < length; i++) {
            var searchWord = drugs_list[i]
            if(drugs_list[i] === 'weed') {
              searchWord = searchWord + ' drug'
            }
            var url = "https://en.wikipedia.org/w/api.php"; 
            var params = {
              action: "opensearch",
              search: searchWord,
              limit: "1",
              namespace: "0",
              format: "json"
            };
            
            url = url + "?origin=*";
            Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
            const response2 = await fetch(url)

            const teste = await response2.json()
            var newWindow = window.open('.');
            newWindow.document.body.style.backgroundColor = 'red';
            newWindow.document.write(`<body style="background-color:#2c2c2c;padding:0;margin:0;">
                                        <div>
                                          <div id="pageName" style="text-align:center;background-color: #808080;padding:0%;">
                                            <h1 id="text01">WIKIPEDIA DRUG RESEARCHER</h1>
                                          </div>
                                          <iframe src='${teste[3]}' style="width:100%;height:87%"></iframe>
                                        </div>
                                      </body>`)
          }
          
          document.getElementById('textInput').value = ''
        }
      }catch(err) {
        alert(err)
      }
    }
    setIsLoading(false)
  }
  async function handleChange(event) {
    try {
      const aux = event.target.value
      props = event.target.value
    }catch(err) {
      alert(err)
    }
  }
  return (
    <div>
      <div id="pageName">
        <h1 id="text01">WIKIPEDIA DRUG RESEARCHER</h1>
      </div>
      <div id="searchDiv">
        <p1 id="text02">Sentence</p1>
        <form onSubmit={handleSubmit}>
          <textarea id='textInput' onChange={(event) => handleChange(event)}></textarea><br></br>
          <input id='submitButton' type='submit' value='Search'></input>
        </form>
      </div>
    </div>
  );
}

export default App;
