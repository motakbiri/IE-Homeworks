import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: {headers : undefined},
      text: []
    }
  }

  fetch = () => {
    fetch('http://localhost:3001/httpInfo?site=' + this.state.text)
    .then(res => res.json().then(result => this.setState({result: result})))
    .catch(reason => {console.log(reason)})
  }
  handleChange =  ({ target: { value: site } }) => {
    this.setState({text: site})
  }
  findMsg = (result) =>{
    let {headers,statusCode} = result
    if(statusCode===301 || statusCode===307){
      return 'Page Moved to ' + headers.location
  
    }
    else if(statusCode===404){
      return 'page not found !'
    }
    else if(statusCode===400){
      return 'bad request !'
    }
    else if(statusCode===403){
      return 'forbidden !'
    }
    else if(statusCode===401){
      return 'Unauthorized !'
    }
  }

  render () {
    let {headers,statusCode} = this.state.result
    console.log(this.state)
    return (
      <div className='App'>
        <h1 className='App-h1'>Enter Site URL</h1>
        <input className='App-input' onChange={this.handleChange} value={this.state.text} />
        <button className='App-button' onClick={this.fetch}>Check</button>
        {
          headers === undefined ? null :
          <div>
            {
              statusCode === 200 ? 
              <h1 className='App-h1-green'>Status Code :   {statusCode}</h1>
              :
              <h1 className='App-h1-red'>StatusCode : {statusCode} - {this.findMsg(this.state.result)}</h1>  
            }
            <h1 className='App-h1'>Web Server :   {headers.server ? headers.server : 'not Specified'}</h1>
            <h1 className='App-h1'>Presistent Connenction :   {'keep-alive'===headers.connection | 'Keep-Alive'===headers.connection ? "yes" : "No"}</h1>
            <h1 className='App-h1'>Cache :   {headers['cache-control'] ? headers['cache-control'] : 'not Specified'}</h1>
            <h1 className='App-h1'>Expires :   {headers['expires'] ? headers['expires'] : 'not Specified'}</h1>
            <h1 className='App-h1'>Last Modified :   {headers['last-modified'] ? headers['last-modified'] : 'not Specified'}</h1>
            <h1 className='App-h1'>Authenticate :   {headers['www-authenticate'] ? headers['www-authenticate'] : 'no Auth'}</h1>
            <h1 className='App-h1'>Allowed Methods  :   {headers.allow ? headers.allow : 'not Specified'}</h1>
            {
              headers['set-cookie'] ? 
              <div>
                <h1 className='App-h1'>Cookies :</h1>
                {
                  headers['set-cookie'].map(data => 
                    <h1 key={data} className='App-h1'>{data}</h1>
                  )
                }
              </div>
              : null
            }
          </div>
          
        }
        
      </div>
    )
  }
}

export default App
