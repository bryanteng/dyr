import React from "react";
import './Modal.css'
import MiniGrid from './MiniGrid';

const Modal = ({setIsModalVisible}) => {

    return (
        <div id="modal-container" className="modal-container"   > 
            <button className="close-modal-button" onClick={()=> setIsModalVisible(false)}> X </button>
            <div className="rules-section"> 
                <span className="how-to-play-section"> 
                    <h1 style={{fontWeight: 'bold'}}> How To Play: </h1>
                    <MiniGrid />
                </span>
                
                <h3> Click on the tile with a different color </h3>
                    <li> The tiles will change color after a correct guess. </li>
                    <li> One tile is always slightly lighter or darker than the other 15. </li>
                
                <div className="scoring-rules"> 
                    <h2> Scoring </h2>
                    <small> Each round can earn a maximum of 100 points. </small>
                    <h4 > Accuracy </h4>
                        <li> Incorrect guesses will deduct 10 points from total possible points for the round. </li>
                        <li> Players can have a round where enough incorrect guesses will result in a negative scoring round. </li>
                    <h4> Speed </h4>
                        <li> For every second, round score will take a 20% deduction </li>
                        <li> I.E. .58s on a round with no mistakes 100 * 1.0 = 100 </li>
                        <li> I.E. 1.2s on a round with no mistakes 100 * .8 = 80 </li>
                    <h4> Game modes! </h4>
                        <li> daily </li>
                        <li> sprint easy/medium/hard </li>
                        <li> zen </li>
                </div>

            </div>


         </div>
    )
}


export default Modal