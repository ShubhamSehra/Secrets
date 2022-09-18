import React from "react";

const Navbar = (props) =>{

    const logout = () => {
        localStorage.clear();
        window.open("http://localhost:3002/auth/logout", "_self")

    }
    
    

    return(
        <div className="nav" >
            <span style={{textTransform: "capitalize"}} >{props.username}</span>

            <button className="posi" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Navbar;