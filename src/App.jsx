import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Work from './components/Work';
import Stripes from './components/Stripes';
import Products from './components/Products';
import Marquees from './components/Marquees';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Calendar from './Page/touch Calendar.jsx';
import Stopwatch from './Page/Stopwatch.jsx';
import ToDo from './Page/ToDo.jsx';
import Dashboard from './Page/Dashboard.jsx';
import Notes from './components/Notes.jsx';
import Pomodoro from "./Page/Pomodoro.jsx";
import Break from "./Page/Break.jsx";


  

const App = () => {
  return (
    <div className='w-full bg-zinc-900 select-none text-white'>

      <Navbar />

      <Routes>
        
          <Route
          path="/"
          element={
            <>
               
              <Work />
              <Stripes />
              <Products />
              <Marquees />
              <Cards />
              <Footer />
            </>
          }
        />

         <Route
          path="/Calendar"
          element={
            <>           
              <Calendar />
              
            </>
          }
        />
        
        
         <Route
          path="/Stopwatch"
          element={
            <>              
              <Stopwatch />
               
            </>                      
          }
        />

         <Route
          path="/ToDo"
          element={
            <>
             <ToDo/>
             
            </>                      
          }
        />
            
          <Route
          path="/Dashboard"
          element={
            <>
             <Dashboard/>
             <Footer/>
            </>                      
          }
        />           
           
              <Route
          path="/Notes"
          element={
            <>
             <Notes/>
             <Footer/>
            </>                      
          }
        />   

           <Route path="/Pomodoro" element={<Pomodoro />} />
        <Route path="/Break" element={<Break />} />

         
        <Route path="/Cards" element={<Notes />} />

        </Routes>


    </div>
  );
};

export default App;
