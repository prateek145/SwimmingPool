import React from 'react'
// import './error1.css'

function Error() {
    return (
        <div>
   
            <title>Page Not Found</title>
            <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" />
            <h1 class="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
            <p class="text">Please check that the Web site address is spelled correctly.Or,</p>
            <div class="btn1">
                <a class="error" href="#">Go to Homepage</a>
                <a class="error" href="#">Go to LoginPage</a>
            </div>
        </div>
    )
}

export default Error