import { useState, useEffect } from 'react';
import '../App.css';


export default function Nav(){
    
    
    
    return(
        <div className="Nav bg-secondary text-light">
            <i class='bx bx-list-ul' data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"></i>
            <div class="offcanvas offcanvas-bottom bg-dark text-light " tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header3">
                <i 
                    onClick={() => window.open("https://www.linkedin.com/in/yousef-alogiely-29389b283/", "_blank")}  
                    className="bi bi-linkedin bx-inner" 
                    style={{ cursor: "pointer" }}
                  ></i>

                  <i 
                    onClick={() => window.open("https://github.com/Yousef10p", "_blank")}  
                    className="bi bi-github bx-inner" 
                    style={{ cursor: "pointer" }}
                  ></i>

                </div>
                
            </div>
                <p>Naqa نقاء</p>
        </div>
    )
}