import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavLink,Link } from 'react-router-dom';

const Result = () => {

    const [document,setDocument]=useState([]);
    const [filteredDocument,setFilterDoc]=useState([]);
    const [page,setPage]=useState(0);

    useEffect(()=>{
     //   getDocument();
     
    },[])

    const handleDeleteDoc=(e,id)=>{
        console.log("delete eh");
        axios.delete("documentsMysql/"+id)
             .then(res=>{
                console.log(res)
                getDocument();
            })
             .catch((err) => {console.log(err) });           
            
    }

    const getDocument=()=>{
        axios.get("documentsMysql").then((res)=>setDocument(res.data));
    }

    const handleFilterDoc=(e)=>{
        setFilterDoc(document.filter(doc=>doc.auteur.includes(e.target.value)));
    }

    const handleFilterTitleDoc=(e)=>{
        setFilterDoc(document.filter(doc=>doc.titre.includes(e.target.value)));        
        }
const handlePagination=(index)=>{
    setPage(page+index);
}
    return (
        
                    <div>
                    RESULTAT
      
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Nom d'auteur" onChange={(e)=>handleFilterDoc(e)}/>
                            </form>
                        </div>
                    </nav>
        <br></br>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item ">
                {page>0 &&   <a className="page-link" href="#" tabIndex="-1" onClick={()=>{handlePagination(-1)}}>Previous</a>}
                </li>              
               {page>0 && <li className="page-item"><a className="page-link" href="#" onClick={()=>{handlePagination(-1)}}>{page} </a></li>    }
                <li className="page-item"><a className="page-link" href="#">{page+1} *</a></li>
                 <li className="page-item"><a className="page-link" href="#" onClick={()=>{handlePagination(1)}}>{page+2} </a></li>  

                    <li className="page-item">
                    <a className="page-link" href="#" onClick={()=>{handlePagination(1)}}>Next</a>
                    </li>
            </ul>
        </nav>
        <br></br>
                    <table className="table ">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Titre</th>
                                <th scope="col">Auteur</th>
                                <th scope="col">Pdf</th>
                                <th scope="col">Interaction</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                           
                           
                            
                           { (()=>{
                            let docu=[...filteredDocument];
                            if(docu.length==0)docu=[...document];
                                let cmp=0;
                                const array=[];
                                console.log(page*10);
                            for(let i=page*10;i<docu.length;i++){
                                array.push(docu[i]);
                                if(cmp==10){
                                    cmp=0;
                                    break;
                                }
                               cmp++;
                            }
                            

                           return array.map(doc=> 
                                <tr key={doc.id}>
                                    <th scope="row">{doc.id}</th>
                                    <td>  {doc.titre}</td>
                                    <td><Link to={"/Attestation/"+doc.id}> {doc.auteur} </Link>  </td>
                                    <td> {doc.nom_pdf}</td>
                                    <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <Link to="/Detail"><button type="button" className="btn btn-primary">details</button></Link>  
                                        <Link to={"/Modifier/"+doc.id}><button type="button"  className="btn btn-primary"> Modifier </button></Link>  
                                        <button type="button" className="btn btn-primary" onClick={(e)=>handleDeleteDoc(e,doc.id)}>Supprimer</button>
                                    </div>    
                                    </td>

                                </tr>
                                   )})()}
                            </tbody>
                    </table>
                                           
                    
                  

                  
                </div>
              
    );
};

export default Result;