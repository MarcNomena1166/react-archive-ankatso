import React from 'react';
import Navigation from '../components/Navigation';
import Result from './Result';
const Home = () => {
    return (
        <div>
        
            <h1 align="center">Archive de these et memoire de Madagascar </h1>
            <br/><br/> <br/><br/> <br/><br/> <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                 
                 
                    </div>
                    <div className="col-7">
                  
                    <div className="form-check form-check-inline mb-2">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Contenu"/>
                        <label className="form-check-label" htmlFor="inlineRadio1">Contenu</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Titre"/>
                        <label className="form-check-label" htmlFor="inlineRadio2">Titre</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Auteur" />
                        <label className="form-check-label" htmlFor="inlineRadio3">Auteur</label>
                        </div>
                                            
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Contenu,titre,auteur" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-outline-primary" type="button" id="button-addon2">Rechercher</button>
                        </div>
                        
                    </div>
                    <div className="col">
                 
                 
                    </div>
                </div>
             </div>

        </div>
    );
};

export default Home;