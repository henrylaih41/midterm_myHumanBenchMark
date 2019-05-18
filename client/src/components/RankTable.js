import React from 'react';

const RankTable = (props) => {
    const {rankList,challenge} = props
    let showList = []
    rankList.forEach((rank) =>{
        if(challenge == "reactTime"){
            var str = rank.username + " : " + rank.reactTime_Best + " ms"
        }
        else{
            var str = rank.username + " : " + rank.numMemory_Best
        }
        showList.push(<li>{str}</li>)
    })
    

    return (
      <div>
          <h1>Top Ten</h1>
       <ol className="rankTable">
           {showList}
       </ol>
       </div>
    )
};

export default RankTable