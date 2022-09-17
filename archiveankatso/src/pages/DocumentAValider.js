import React, { useEffect, useState ,useRef} from 'react';
import axios from "axios";
import { NavLink,Link } from 'react-router-dom';
import { Document,Page } from 'react-pdf';
import { saveAs } from 'file-saver';
const DocumentAValider = () => {

    const [listeDocValider,setDocValider]=useState([]);
    const [commentaire,setCommentaire]=useState();
    const [file,setFile]=useState();

    useEffect(()=>{
      //  getDocAValider(); 
     },[]);

     const handleCommentChange=(e)=>{
        setCommentaire(e.target.value);
     }

     const getDocAValider=()=>{
        axios.get("etudiantDocuments").then((res)=>setDocValider(res.data));
     }
     const handleConfirmDocument=(id)=>{

       axios.post("documentAValider/"+id).then((res)=>{
           console.log(res);
           axios.get("etudiantDocuments").then((res)=>setDocValider(res.data));    
             }
       );

     }

     const handleCommentDoc=(e,id)=>{

        e.preventDefault();
      
        let formdata=new FormData();
        formdata.append('commentaire',commentaire) ; 
        formdata.append('id',id) ; 
        axios({
            
            url: "documentAValider",
            method: "PUT",
            config:
                 { headers: {
                'Access-Control-Allow-Origin': true
            }},
            data: formdata,
          })
            .then((res) => {
                console.log(res);
                getDocAValider();  
               
            }) 
            .catch((err) => {console.log(err) }); 
       };

       const handleViewPdf=(pdfname)=>{
            window.open("http://localhost:8080/documentAValider/"+pdfname, '_blank');
         //   saveAs("documentAValider/"+pdfname);

 
       }
    return (
        <div>
                <h1> document a valider ohhh</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Pdf</th>
                                <th scope="col">Validation</th>
                                <th scope="col">Commentaires</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listeDocValider.map(docValider=>{
                                    return(
                                        <tr key={docValider.id}>
                                        <th scope="row">{docValider.code}</th>
                                        <td>{docValider.nom}</td>
                                        <td>{docValider.prenom}</td>
                                        <td onClick={()=>handleViewPdf(docValider.nom_pdf)}><Link to="#" >{docValider.nom_pdf} </Link> </td>
                                        <td>
                                            <button type="button"  onClick={(e)=>handleConfirmDocument(docValider.id)} className="btn btn-primary">Valider</button>           
                                        </td>
                                        <td>
                                        <div className="input-group mb-3">
                                            <textarea className="form-control" placeholder={docValider.commentaire} rows="2" onChange={(e)=>handleCommentChange(e)}></textarea>
                                            <button className="btn btn-outline-primary" type="button" onClick={(e)=>{handleCommentDoc(e,docValider.id)}}>commenter</button>
                                        </div>
                                      
                                        </td>
                                       
                                        </tr>     
                                    
                                    )})}
                               
                            </tbody>
                        </table>
                      
                       

        </div>
    );
};

export default DocumentAValider;

