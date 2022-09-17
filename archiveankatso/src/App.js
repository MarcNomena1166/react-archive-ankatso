import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from './pages/Result';
import Ajout from './pages/Ajout';
import Navigation from './components/Navigation';
import Modifier from './pages/Modifier';
import DocumentAValider from './pages/DocumentAValider'; 
import Attestation from './pages/Attestation';
import TemplateAdmin from './components/TemplateAdmin';


const App = () => {
  return (
    
    <BrowserRouter>
   
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Detail" element={<Detail/>}/>

                       
                        <Route path="/TemplateAdmin" element={<TemplateAdmin/>}>
                          <Route path="/TemplateAdmin/Result" element={<Result/>}/>
                          <Route path="/TemplateAdmin/Ajout" element={<Ajout/>}/>
                          <Route path="/TemplateAdmin/Modifier/:id" element={<Modifier/>}/>
                          <Route path="/TemplateAdmin/Attestation/:id" element={<Attestation/>}/>
                          <Route path="/TemplateAdmin/DocumentAValider" element={<DocumentAValider/>}/>
                        </Route>
                    </Routes>

                  
          

    </BrowserRouter>
  );
};

export default App;