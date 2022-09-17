import React, { useEffect, useState ,useRef} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

const Modifier = () => {

const id=useParams();

   
const [listeJury,setJury]=useState([
    { nomjury:"jury" }
 ]);

 const [pdf,setPdf]=useState();
 const [listedomaine,setDomaine]=useState([]);
 const [listeinstitution,setInstitution]=useState([]);
 const [listemention,setMention]=useState([]);
 const [listedomaine_mention,setDomaine_mention]=useState([]);
 const [mentionTemp,setmentionTemp]=useState([]);
 const [listeParcour,setParcour]=useState([]);
 const [listeDiscipline,setDiscipline]=useState([]);
 const [listeSousDiscipline,setSousDiscipline]=useState([]);
 const [dsd,setDsd]=useState([]);
 const [dsdTemp,setDsdTemp]=useState([]);


 const inputAnnee=useRef();
 const inputCodeDocument=useRef();
 const inputCodeInstitution=useRef();
 const inputAuteur=useRef();
 const inputDirecteur=useRef();
 const inputTitre=useRef();
 const InputDateSoutenance=useRef();
 const institution=useRef();
 const niveau=useRef();
 const inputResume=useRef();
 const visibilite=useRef();
 const inputDomaine=useRef();
 const inputParcour=useRef();
 const inputMention=useRef();
 const inputSD=useRef();
 const mots_cles=useRef();


const handleChange=(e,i)=>{
    const {name,value}=e.target;
    const list=[...listeJury];
    list[i][name]=value;
        setJury(list);
   
};

const handleAddJury=()=>{
    setJury([...listeJury,{nomjury:"vide"}]);
};

const handleAddPdf=(e)=>{       
    setPdf(e.target.files);
    
}

const handleDeleteJury=(i)=>{
const list=[...listeJury];
const temp=[];
    list.map((jury,index)=>
    {
        if(index!=i)
        {
            temp.push(jury);
        }
        
    })
    setJury(temp);
};

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        let formdata=new FormData();
        
     //   console.warn(pdf[0]);
     
        formdata.append('annee',inputAnnee.current.value) ; 
        formdata.append('codeInstitution',inputCodeInstitution.current.value) ; 
        formdata.append('auteur',inputAuteur.current.value) ; 
        formdata.append('directeur',inputDirecteur.current.value) ; 
        formdata.append('titre',inputTitre.current.value) ; 
        formdata.append('dateSoutenance',InputDateSoutenance.current.value) ; 
        formdata.append('institution',institution.current.value) ;
        formdata.append('codeDocument',inputCodeDocument.current.value) ; 
        formdata.append('jury',listeJury) ; 
        formdata.append('resume',inputResume.current.value) ; 
        formdata.append('niveau',niveau.current.value) ; 
        formdata.append('domaine',inputDomaine.current.value) ;
        formdata.append('mention',inputMention.current.value) ; 
        formdata.append('parcour',inputParcour.current.value) ;
        formdata.append('sousDiscipline',inputSD.current.value) ;
        formdata.append('visibilite',visibilite.current.value) ;
        formdata.append('idDoc',id);
       // console.log("inty ilay pdf ohhh :"+typeof pdf)
      //  console.log(Object.fromEntries(formdata.entries()));

         axios({
             // Endpoint to send files
             url: "documentsMysql",
             method: "PUT",
             config:
                  { headers: {
                 'Access-Control-Allow-Origin': true,
                 'Content-Type': 'multipart/form-data',
               
            
             }},
             data: formdata,
           })
             .then((res) => {
                 console.log(res);
                
                 let formdataEs=new FormData();
                 formdataEs.append('pdf',pdf[0]);
                 formdataEs.append('auteur',inputAuteur.current.value) ; 
                 formdataEs.append('titre',inputTitre.current.value) ; 
                 formdataEs.append('id',id) ; 
                 formdataEs.append('mots_cles',mots_cles.current.value) ; 
                


                 axios({
                    // Endpoint to send files
                    url: "documentsES",
                    method: "PUT",
                    config:
                         { headers: {
                        'Access-Control-Allow-Origin': true,
                        'Content-Type': 'multipart/form-data',
                      
                   
                    }},
                    data: formdataEs,
                  })
                    .then((res) => {console.log(res)}) // Handle the response from backend here
                    .catch((err) => {console.log(err) }); // Catch errors if any

                  let lj="";
                  listeJury.map(jury=>{
                    lj=lj+jury.nomjury+"@@@";
                  });

                 
                    let formJury=new FormData();
                    formJury.append('jury',lj);
                    formJury.append('idDoc',id);
                    console.log(Object.fromEntries(formJury.entries()));
                    axios({
                        // Endpoint to send files
                        url: "jury_documents",
                        method: "PUT",
                        config:
                             { headers: {
                            'Access-Control-Allow-Origin': true,
                            'Content-Type': 'multipart/form-data',
                          
                       
                        }},
                        data: formJury,
                      })
                        .then((res) => {
                            console.log(res);
                           
                        }) // Handle the response from backend here
                        .catch((err) => {console.log(err) }); // Catch errors if any



                }) // Handle the response from backend here
             .catch((err) => {console.log(err) }); // Catch errors if any
        
    }

    const handleDomaineChange=(e)=>{
        
        const temp=[];
        listedomaine_mention.map(dm=>{
            
            if(dm.idD==e.target.value)
            {
                temp.push(dm);
            }
        })
       
        const retour=[];
        temp.map(dm=>{
            listemention.map(lm=>
                {
                    if(dm.idM==lm.id)retour.push(lm);
                }) ;    
        });
        setmentionTemp(retour);
    }

    const handleDisciplineChange=(e)=>{
        const temp=[];
        dsd.map(liste=>{               
            if(liste.idD==e.target.value)temp.push(liste);
        });
      //  console.log(temp.length);
        const retour=[];
        temp.map(dsd=>{
            listeSousDiscipline.map(lsd=>{
                if(lsd.id==dsd.idS)retour.push(lsd);
            });
        });
        setDsdTemp(retour);
    }
    useEffect(()=>{
        axios.get("/institutions")
            .then((res)=>setInstitution(res.data))
            .catch((err)=>console.log(err))
    },[])
    return (
      <div></div>

    );
};

export default Modifier;