import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons';
import './style.css';

const Navigation = () => {

    return (
        <div className=" col-3" >
            <div className="sidebar">
                <div className="logo_content">
                    <div className="logo" >

                    <box-icon name='notepad' id='icon'></box-icon>
                        <div className="logo_name">
                            Coding Lab 
                        </div>
                       
                    </div>
                    <box-icon name='menu' id="btn"></box-icon>
                </div>
                <ul className="nav_list">
                <Link to="/Detail" style={{textDecoration:"none"}}>
                    <li>
                   
                        <a href="#">
                        <box-icon name='bar-chart-square' id='icon'></box-icon>
                        <span className="links_name">DashBoard</span>
                        </a>                       
                     
 {/* <span className="tooltip">DashBoard</span> */}
                    </li>
                    </Link>    
                    <Link to="Ajout" style={{textDecoration:"none"}}>
                    <li>
                        <a href="#">
                        <box-icon type='solid' name='plus-square' id='icon'></box-icon>
                        <span className="links_name">Ajouter Document</span>
                        </a>
 {/* <span className="tooltip">DashBoard</span> */}
                    </li>
                    </Link>    
                    <Link to="Result" style={{textDecoration:"none"}}>
                    <li>
                        <a href="#">
                        <box-icon type='solid' name='edit'></box-icon>
                        <span className="links_name">Gestion Document</span>
                        </a>
 {/* <span className="tooltip">DashBoard</span> */}
                    </li>
                    </Link>   
                    <Link to="DocumentAValider" style={{textDecoration:"none"}}> 
                    <li>
                        <a href="#">
                        <box-icon type='solid' name='select-multiple'></box-icon>
                        <span className="links_name">Document à valider</span>
                        </a>
 {/* <span className="tooltip">DashBoard</span> */}
                    </li>
                    </Link>   
                </ul>
                <div className="profil_content">
                    <div className="profil">
                        <div className="profil_details">
                        <img src="https://img.icons8.com/color/48/000000/superman.png"/>
                            <div className="name_job">
                                <div className="name"> Mr Admin</div>
                                <div className="job"> Administrateur </div>
                            </div>
                        </div>
                        <box-icon name='log-out' id='log_out'></box-icon>
                        
                    </div>
                </div>
            </div>
       
        </div>
        
    );
};

export default Navigation;