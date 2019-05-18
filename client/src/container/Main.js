import React from "react";
import "../css/Main.css"
import RankTable from '../components/RankTable';
class MainPage extends React.Component {

    constructor(props) {
      super(props);
      this.score = {}
      this.state = {
        isLoginOpen: true,
        reactTime_rank: undefined,
        reactTime_myScore: undefined,
        numMemory_rank: undefined,
        numMemory_myScore: undefined
      };
    }

    componentDidMount(){
      console.log("Main Mounted")
      this.props.socket.emit("test",["Main Mounted",this.props.acc])
      // Updating the ranking and personal records once recieved.
      this.props.socket.on("reactTime_Best",(topTen) => {
        this.setState({reactTime_rank : topTen})
      })
      this.props.socket.on("numMemory_Best",(topTen) => {
        this.setState({numMemory_rank : topTen})
      })
      this.props.socket.on("reactTime_Best_my", (myScore) => {
        this.setState({reactTime_myScore: myScore})
      })
      this.props.socket.on("numMemory_Best_my", (myScore) => {
        this.setState({numMemory_myScore: myScore})
      })
    
    }
    
    logout = () => {
        console.log("Logout")
        this.props.socket.emit('logout')
    }
    // To login page
    login = () => {
        console.log("loginPage")
        this.props.socket.emit('loginPage')
    }
    // To number memory challenge
    toNumberMemory = () => {
        console.log("NumMem")
        this.props.socket.emit('NumMem',this.props.acc)
    }
    // To react time challenge
    toReactTime = () => {
      console.log("ReactTime")
      this.props.socket.emit('reactTime',this.props.acc)
    }

    render() {
      return (
        <html>
            <head><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"></link></head>
            <body>
            {/* the section below is the introduction of the main page */}
            <section id="banner">
                {this.props.logged && <span className="userBar">
                    <div className="userName"> {this.props.acc.username}</div>
                    <div onClick={this.logout} class="logout">logout</div>
                </span>}
                <h2><strong>MYHUMANBENCHMARK</strong> an imitation of www.humanbenchmark.com</h2>
                <p>A place to measure your abilites and track your stats</p>
                {/* the challenges button */
                this.props.logged && <ul class="actions">
                    <li><div onClick={this.toReactTime} className="challenge"><i class="fa fa-bolt fa-3x"></i></div></li>
                    <li><div onClick={this.toNumberMemory} className="challenge"><i class="fa fa-sort-numeric-asc fa-3x"></i></div></li>
                    <li><div className="challenge"><i class="fa fa-share-square-o fa-3x"></i></div></li>
                </ul>}
                {!this.props.logged && <ul class="actions">
                    <li><div onClick={this.login} className="login"><span>login</span></div></li>
                </ul>}
            </section>
            {/* this is shown after login, including the challenges and its intro and the rankings*/
            this.props.logged && <section id="one" class="wrapper special">
                <div class="inner">
                    <header class="major">
                        <h2>Challenge Introduction</h2>
                    </header>
                    <div class="features">
                        <div class="feature">
                            <i class="fa fa-bolt "></i>
                            <h3>Reaction Time</h3>
                            <p>Check your Hand-eye reflection speed</p>
                            {/* React time rankings */
                            this.state.reactTime_myScore && <div>
                                <p>Best: {this.state.reactTime_myScore.reactTime_Best} ms Average: {Math.round(this.state.reactTime_myScore.reactTime_Avg)} ms</p>
                            </div>}
                            {this.state.reactTime_rank && <RankTable challenge="reactTime" rankList = {this.state.reactTime_rank}/>}
                        </div>
                        <div class="feature">
                            <i class="fa fa-sort-numeric-asc"></i>
                            <h3>Number Memory</h3>
                            <p>Remember the longest number you can</p>
                            {/*Number memory rankings */
                            this.state.numMemory_myScore && <div>
                                <p>Best: {this.state.numMemory_myScore.numMemory_Best} Average: {this.state.numMemory_myScore.numMemory_Avg.toFixed(2)}</p>
                            </div>}
                            {this.state.numMemory_rank && <RankTable challenge="numMemory" rankList = {this.state.numMemory_rank}/>}
                        </div>
                        <div class="feature">
                            <i class="fa fa-share-square-o"></i>
                            <h3>Visual Memory</h3>
                            <p>Remember an increasingly large board of squares</p>
                            <p><b>Still under development QQ</b></p>
                        </div>
                    </div>
                </div>
            </section>}
            </body>
        </html>
      );
    }
  }

  export default MainPage