import React,{FC} from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Header';
import Table from './Tabel'
import Dashboard from './Dashboard';
export interface Information {
    setToken:string ;
  
  }

type Props={
    setToken: React.Dispatch<React.SetStateAction<any>>;
};
 const Home:FC <Props>= ({setToken}) => {
    return (
        
        <BrowserRouter>
        <>
      
                <header>
            <Header setToken={setToken}/>
           </header>
           <div>

       
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        <Route path="/State_Master" element={<Table/>} />
        </Routes>
        </div>
        </>
        </BrowserRouter>
    )
}
export default Home