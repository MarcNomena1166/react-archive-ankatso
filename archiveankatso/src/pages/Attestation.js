import React, { useEffect, useState ,useRef} from 'react';
import axios from "axios";
import { NavLink,Link,useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Barcode from 'react-jsbarcode';

const Attestation = () => {

    const id=useParams();
    const body=useRef();
    const codeBare=(contenu)=>{
        return <Barcode value="ABC123" options={{ format: 'code128' }} renderer="svg" />;
    }
    useEffect(()=>{
      
    },[])

    
    return (
        <div>
             <div className="container" ref={body}>

                <div className="row">
                    
                    <div className="col">
                   <img src="../images/gasy.png" width="100px"/>
                    </div>
                    <div className="col" align="left">
                    UNIVERSITE D'ANTANANARIVO
                    <br></br>
                    BIBLIOTHEQUE ET ARCHIVES UNIVERSITAIRES
                    <br></br>
                    B.P.:908
                    <br></br>
                    101-ANTANANARIVO
                    <br></br>
                    ddpie@univ-antananarivo.mg
                    </div>
                </div>
                <br></br>
                    <br></br>
                    <br></br>
                    <div align="center">
                       <strong>DEPOT DE THESE ET DE MEMOIRE </strong> 
                        <br></br>
                        En application de l'arrêté rectoral n 024/2002 du 23 Mai 2002
                    </div>
                    <br />
                    <br />
                    <div align="justify">
                    Le Chef du service de la bibliothèque et Archives Universitaires d'Antananarivo certifie avoir reçu de M. 
                        <br></br>
                        (...............................anarana........................) 
                        <br></br>
                      ..............................  01 exemplaire de sa (these/mémoire)
                        <br></br>
                      ..............................    01 exemplaire numerique(CD)
                        <br></br>

                        Soutenu publiquement le (date beeee)
                        <br></br>
                        Sous le N ............. <br />
                    </div>
                       
                        <div align="center">Antananarivo, le </div>
                        <br />
                        <br />
                        <br />
                        <div style={{bottom:0}}>
                             <Barcode value="ndpakcgtwls" options={{displayValue: false}} renderer="svg" />
                        </div>
                       
                       
                     
                </div>
                <br />
                <br />
                <br /> <br />

                <ReactToPrint
                trigger={()=>{
                    return <button type="button" class="btn btn-primary">ENREGISTRER</button>
                }}
                content={()=>body.current
                }
                documentTitle={'attestation de '+id.id}
                pageStyle="print"

                />

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
        </div>
        
      
            
    );
};

export default Attestation;