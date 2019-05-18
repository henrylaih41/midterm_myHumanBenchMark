import React from "react";
import "../css/Main.css"
class NumberMemory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          start: false,
          end: false,
          show: false,
          test: false,
          level: 0,
          numToMem: undefined
      };
    }
    
    componentDidMount(){
      console.log("NumMemory Mounted")
    } 

    start = (e) => {
        if(!this.state.start){
            this.setState({start: true})
        }
        this.clicked()
    }
    genRandNumber(digitlength){
        var myNum = ""
        while(myNum.length < digitlength){
            myNum = (Math.round(Math.random() * Math.pow(10,digitlength))).toString()
        }
        return Number(myNum) 
    }

    clicked = () => {
        this.setState({show: true, level: this.state.level + 1, numToMem: this.genRandNumber(this.state.level + 1), test: false})
        setTimeout(this.test, 2000);
    }

    test = () => {
        this.setState({show: false, test: true})
    }
    
    submit = () => {
        if(this.refs.input.value == this.state.numToMem){
            this.clicked()
        }
        else{
            this.setState({end: true, test:false})
        }
    }

    enter = (e) => {
        if(e.keyCode === 13){
            this.submit()
        }
    }

    retry = () => {
        this.props.socket.emit("save_numMem",this.props.acc,this.state.level,undefined)
        this.setState({
          start: false,
          end: false,
          show: false,
          test: false,
          level: 0,
          numToMem: undefined
        })
    }
    saved = () => {
        this.props.socket.emit("login",this.props.acc)
    }
    done = () => {
        this.props.socket.emit("save_numMem",this.props.acc,this.state.level,this.saved)
    }

    render() {
      return (
    <html>
        <head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"></link></head>
        <body>
			{!this.state.start && <section onClick={this.start} id="banner">
				<p><i class="fas fa-sort-numeric-down fa-5x"></i></p>
                <h2><strong>NumberMemory Test</strong></h2>
                <p>Try to remember the numbers within 8 seconds</p>
                <p>Click anywhere to start</p>
            </section>}
            {<div ref="Num" className="NumberMemory" >
                {this.state.show && <div className="textContainer" ref="numberToMem">{this.state.numToMem}</div>}
                {this.state.test && <section className="wrapper">
                    <input onKeyDown={this.enter} className="test" ref="input" type="number" autofocus="true"></input>
                    <div className="textContainer">Enter the shown number</div>
                    <ul class="actions">
					    <li><div onClick={this.submit} class="login">submit</div></li>
                    </ul>
                 </section>}
                 {this.state.end && <section className="wrapper">
                    <div className="textContainer" id="end">You reached level {this.state.level}</div>
                    <ul class="actions">
					    <li><div onClick={this.done} class="login">Done</div></li>
                        <li><div onClick={this.retry} class="login">Retry</div></li>
                    </ul>
                 </section>}
            </div>}
        </body>
    </html>
      );
    }
  }

  export default NumberMemory