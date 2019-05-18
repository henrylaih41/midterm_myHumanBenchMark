import React from "react";
import "../css/Main.css"
class ReactTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        start: false,
        toClick: false,
        end: false
      };
    }
    
    componentDidMount(){
      console.log("ReactTime Mounted")
      // Just printing out the account info
      this.props.socket.emit("test",["ReactTime Mounted",this.props.acc])
    } 
    // Turn the screen green and ask user to click
    timeToClick = () => {
     if(!this.state.end){
        this.refs.react.style.backgroundColor = "green"
        this.refs.react_text.textContent = "Click Now!"
        this.setState({toClick: true})
     }
    }
    // Start the timer, timeToClick is called after rand_time
    start = (e) => {
        if(!this.state.start){
            this.rand_time = Math.random()*4000 + 2000
            this.setState({start: true})
            this.trigger = setTimeout(this.timeToClick, this.rand_time)
            this.startTime = new Date()
        }
    }
    // Called when user click the screen, send and save the record. 
    clicked = () => {
        // if user clicker after timeToClick is called
        if(this.state.toClick){
            this.endTime = new Date()
            // Calculate total time spent
            this.time_spent = Math.round(this.endTime - this.startTime - this.rand_time)
            this.refs.react_text.textContent = "Time elapsed"
            this.refs.time_count.textContent = this.time_spent + " ms"
            this.setState({toClick: false})
            this.setState({end: true})
            // Send record back to server
            this.props.socket.emit('save_reactTime',this.props.acc,this.time_spent)
        }
        // If user clicked too early 
        else if (!this.state.toClick && !this.state.end){
            this.refs.react_text.textContent = "Oops!"
            this.refs.time_count.textContent = "You clicked too Early"
            this.setState({toClick: false})
            this.setState({end: true})
            clearTimeout(this.trigger)
        }
    }
    // Back to main page
    done = () => {
        this.props.socket.emit("login",this.props.acc)
    }
    // reset the states
    retry = () => {
        this.setState({start: false})
        this.setState({end: false})
    }

    render() {
      return (
    <html>
        <head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"></link></head>
        <body>

           
			{/*This part is the introduction of the challenge*/
                !this.state.start && <section onClick={this.start} id="banner">
				<p><i class="fas fa-bolt fa-5x"></i></p>
                <h2><strong>React Time Test</strong></h2>
                <p>When the red box turns green, click as quickly as you can.</p>
                <p>Click anywhere to start</p>
            </section>}

             
            {/*This part is shown after the challenges starts*/
                this.state.start && <div onClick={this.clicked} ref="react" className="reactTime">
                <div className="textContainer" ref="react_text"> Wait For Green</div>
                <div className="textContainer" ref="time_count"></div>
                {this.state.end && <ul class="actions">
					<li><div onClick={this.done} class="login">Done</div></li>
                    <li><div onClick={this.retry} class="login">Retry</div></li>
                </ul>}
            </div>}
        </body>
    </html>
      );
    }
  }

  export default ReactTime