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
                
                    <li> One tile is always slightly lighter or darker than the other 15. </li>
                    <li> The tiles will change color after a correct guess. </li>
                
                <div className="scoring-rules"> 
                    <h2> Scoring </h2>

                    <h4 > Accuracy </h4>
                        <li> One tile is always slightly lighter or darker than the other 15. </li>
                        <li> The tiles will change color after a correct guess. </li>
                    <h4> Speed </h4>
                        <li> One tile is always slightly lighter or darker than the other 15. </li>
                        <li> The tiles will change color after a correct guess. </li>
                    <h4> Deductions! </h4>
                        <li> One tile is always slightly lighter or darker than the other 15. </li>
                        <li> The tiles will change color after a correct guess. </li>
                </div>

            </div>


         </div>
    )
}


export default Modal