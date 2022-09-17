import React, { useEffect, useState ,useRef} from 'react';
import axios from "axios";

const Ajout = () => {

   
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
     const[idDoc,setIdDoc]=useState([]);

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
           // console.log("inty ilay pdf ohhh :"+typeof pdf)
          //  console.log(Object.fromEntries(formdata.entries()));

             axios({
                 // Endpoint to send files
                 url: "documentsMysql",
                 method: "POST",
                 config:
                      { headers: {
                     'Access-Control-Allow-Origin': true,
                     'Content-Type': 'multipart/form-data',
                   
                
                 }},
                 data: formdata,
               })
                 .then((res) => {
                     console.log(res);
                     setIdDoc(res.data);
                     console.log("inty ilay idDoc :"+idDoc);
                     let formdataEs=new FormData();
                     formdataEs.append('pdf',pdf[0]);
                     formdataEs.append('auteur',inputAuteur.current.value) ; 
                     formdataEs.append('titre',inputTitre.current.value) ; 
                     formdataEs.append('id',res.data) ; 
                     formdataEs.append('mots_cles',mots_cles.current.value) ; 
                    


                     axios({
                        // Endpoint to send files
                        url: "documentsES",
                        method: "POST",
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
                        formJury.append('idDoc',res.data);
                        console.log(Object.fromEntries(formJury.entries()));
                        axios({
                            // Endpoint to send files
                            url: "jury_documents",
                            method: "POST",
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
            // axios.get("institutions").then((res)=>setInstitution(res.data));
            // axios.get("domaines").then((res)=>setDomaine(res.data));
            // axios.get("mentions").then((res)=>setMention(res.data));
            // axios.get("domaine_mentions").then((res)=>setDomaine_mention(res.data));
            // axios.get("parcours").then((res)=>setParcour(res.data));
            // axios.get("disciplines").then((res)=>setDiscipline(res.data));
            // axios.get("SousDisciplines").then((res)=>setSousDiscipline(res.data));
            // axios.get("Discipline_SousDisciplines").then((res)=>setDsd(res.data));
        },[])
        
    return (

                <div className="col-10">
                Ajout 
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 primary">
                    <input type="number" className="form-control" ref={inputAnnee}/>
                    <label htmlFor="floatingInput">Annee</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" ref={inputCodeDocument} />
                    <label htmlFor="floatingPassword">Code Document</label>
                </div>
                <br />
                <div className="form-floating">
                    <input type="text" className="form-control" ref={inputCodeInstitution}/>
                    <label htmlFor="floatingPassword">Code Instition</label>
                </div>
                <br />
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label" >Choisir un fichier PDF</label>
                    <input className="form-control" type="file" onChange={(e)=>handleAddPdf(e)} />
                </div>

                <br />
                <div className="form-floating">
                    <input type="text" className="form-control" ref={inputAuteur}/>
                    <label htmlFor="floatingPassword">Auteur</label>
                </div>
                <br />
               
                <div className="container overflow-hidden">
                    <div className="row gx-5">
                        <div className="col">
                       
                                        <h3> JURY</h3>
                                        
                       
                            {listeJury.map((jury,index)=>
                            {
                                return(
                                    <div className="input-group  mb-2" key={index}>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Jury"
                                    name="nomjury"
                                    value={jury.nomjury} 
                                    onChange={e=>handleChange(e,index)}
                                    />       
                                     <br />
                                   
                                    {listeJury.length>1 && <button className="btn btn-outline-secondary" type="button"  onClick={()=>handleDeleteJury(index)}>Supprimer</button>} 
                                 </div>
                                   
                                )
                              
                            })}
                                <button className="btn btn-outline-secondary" type="button" onClick={handleAddJury}>Ajouter</button>
                            
                        </div>

                    </div>
                    </div>
                    <br />

                    <div className="form-floating mb-3 primary">
                        <input type="text" className="form-control" ref={inputDirecteur}/>
                        <label htmlFor="floatingInput">Directeur du these</label>
                     </div>
                <br />

                <div className="form-floating mb-3 primary">
                        <input type="text" className="form-control" ref={inputTitre}/>
                        <label htmlFor="floatingInput">Titre</label>
                     </div>
                <br />

                <div className="form-floating mb-3 primary">
                        <input type="date" className="form-control" ref={InputDateSoutenance} />
                        <label htmlFor="floatingInput">Date de soutenance</label>
                     </div>
                <br />

                <div className="form-floating mb-3 primary">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ref={inputResume}></textarea>
                        <label htmlFor="floatingInput">Resume</label>
                     </div>
                <br />

                <div className="form-floating mb-3 primary">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ref={mots_cles}></textarea>
                        <label htmlFor="floatingInput">Mots clés</label>
                     </div>
                <br />

                <div className="form-floating mb-3 primary">
                <select className="form-select" aria-label="Default select example" ref={institution}> 
                { listeinstitution.map((institution,index)=>{
                    return (  <option value={institution.id} key={index}> {institution.nom_institution}</option> )                  
                })}              

                </select>
                <label htmlFor="floatingInput">Institution</label>
                </div>
              
                <br />

                <div className="form-floating mb-3 primary">
                <select className="form-select" aria-label="Default select example" ref={niveau}> 
                  <option value="1" >Licence</option>      
                  <option value="2" >Master</option>      
                  <option value="3" >Doctorat</option>                  

                </select>
                <label htmlFor="floatingInput">Niveau</label>
                </div>
              
                <br />

                <div className="form-floating mb-3 primary">
                <select className="form-select" name="domaine" onChange={(e)=>handleDomaineChange(e)} ref={inputDomaine}>
                    {listedomaine.map((domaine,index)=>
                    {
                        return ( <option value={domaine.id} key={index}>{domaine.nom_domaine}</option>)
                    })}
                    </select>
                    <label htmlFor="floatingInput">Domaine</label>
                    
                </div>
                <br />
                <br />
                <div className="form-floating mb-3 primary">
                    <select className="form-select" aria-label="Default select example" ref={inputMention}>
                        {mentionTemp.length==0 && listemention.map((mention,index)=>
                        {
                            return ( <option key={index} value={mention.id}>{mention.nom_mention}</option>)
                        })}

                        {mentionTemp.length>0  && mentionTemp.map((mention,index)=>
                        {
                            return ( <option key={index} value={mention.id}>{mention.nom_mention}</option>)
                        })}
                    </select>
                    <label htmlFor="floatingInput">Mention</label>
                    
                </div>
                <br />
                <br />
                <div className="form-floating mb-3 primary">
                    <select className="form-select" aria-label="Default select example" ref={inputParcour}>
                        {listeParcour.map((parcour,index)=>{

                            return( <option value={parcour.id} key={index}>{parcour.nom_parcour}</option> )
                        })}
                       
                    </select>
                    <label htmlFor="floatingInput">Parcour</label>
                </div>
                <br />
                <div className="form-floating mb-3 primary">
                    <select className="form-select" onChange={(e)=>handleDisciplineChange(e)} name="discipline">
                        {listeDiscipline.map(discipline=>{
                            return ( <option value={discipline.id} key={discipline.id}>{discipline.nomDiscipline}</option>)
                        })}
                    </select>
                    <label htmlFor="floatingInput">Discipline</label>
                    
                </div>
                <br />

                <div className="form-floating mb-3 primary">
                    <select className="form-select" aria-label="Default select example" ref={inputSD}>
                        {dsdTemp.length==0 && listeSousDiscipline.map(sousDiscipline=>
                            {
                                return(<option value={sousDiscipline.id} key={sousDiscipline.id}>{sousDiscipline.nomSousDiscipline}</option>)
                            })}
                        {dsdTemp.length>0 && dsdTemp.map(sousDiscipline=>
                        {
                            return(<option value={sousDiscipline.id} key={sousDiscipline.id}>{sousDiscipline.nomSousDiscipline}</option>)
                        })}

                    </select>
                    <label htmlFor="floatingInput">Sous discipline</label>
                               
                </div>
                <br />
                <div className="form-floating mb-3 primary">
                    <select className="form-select" aria-label="Default select example" ref={visibilite}>
                             <option value="1" >Public</option>
                             <option value="2" >Caché</option>                                                                    
                    </select>
                    <label htmlFor="floatingInput">Visibilité</label>
                </div>
                <br />
                                    <button className="btn btn-outline-secondary" type="submit" >Valider</button>
                <br />

                </form>
            </div>

    );
};

export default Ajout;