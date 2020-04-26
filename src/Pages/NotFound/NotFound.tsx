import React from "react";
import { useParams } from "react-router-dom";
import './NotFound.css';
import error from '../../error.png'


function NotFound() {
    let { id } = useParams();

    return (
        <div className='errorBlock'>
            <div className='errorBlock__content'>
                <p className='erroBlock__mainText'>OOPS!</p>
                <p className='erroBlock__secText'>ERROR 404: the requested page (<span className='erroBlock__secText__span'>http://localhost:3000/{id}</span>) was not found.</p>
            </div>

            <div className='errorBlock__Image'>
                <img src={error} alt={"Not Found"} />
            </div>
        </div>
    );
}

export default NotFound