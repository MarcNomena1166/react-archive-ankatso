import React, { useEffect, useState ,useRef} from 'react';
import Navigation from './Navigation';
import { Link,Outlet,useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateAdmin = () => {
const location=useLocation();

const path=location.pathname.split("/");
path.shift();
console.log(path);


    return (


       
           
            <div className="Result" >
                  
            <h1 align="center">Archive de document</h1>
            <div className="ms-3" >
                <div className="row">
                  
                   <Navigation/>


                    <div className=" col-9">
                    <ol className="breadcrumb">
                  {path.map((indexPath,index)=>{
                    return( <li className="breadcrumb-item" key={index}><a href="#"></a>{indexPath}</li>)

                  })}
                       
                    </ol>
                    <Outlet/>

                    </div>
                </div>
                </div>
             </div>

   
      
      
    );
};

export default TemplateAdmin;