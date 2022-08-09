import logo from './assets/react.svg';
import React, { useState , useEffect} from "react"
import "./App.css"
import axios from 'axios'



function App() {

  const [ name, setName ] = useState("");
  const [ comment, setComment ] = useState("");

  const [ home, setHome ] = useState("");



  //from node to react
  //nodejs= ...4004/home
  //reactjs==  ...3000
  useEffect(() => {
		axios.get("http://localhost:4004/home").then(function(response) {
			setHome(response.data)  
		})
	}, [])


    //from react to node
  //nodejs= ...4004/home
  //reactjs==  ...3000
  async function postForm(e) {  
		e.preventDefault()
		try {
			await axios.post("http://localhost:4004/home", {
				name, comment
			})
		} catch (error) {
			console.error(error)
		} 
	}


  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
 

        <p>
            FORM
        </p>

        <form onSubmit={postForm}>
          
          <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} /><br/>
          <input type="text" placeholder='comment' value={comment} onChange={(e) => setComment(e.target.value)} /><br/>

          <button type="submit">submit</button>
			</form>



         
      </header>


      <div>
        <h2> import stuff from nodejs below</h2>
        {home}
      </div>


    </div>
  );
}

export default App;