import React from 'react'
import '../App.css';
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {HiSearch} from 'react-icons/Hi'
import {GrFormClose} from 'react-icons/Gr'
export default function Search( { placeholder, data }){
    
    
        const [filteredData, setFilteredData] = useState([]);
        const [wordEntered, setWordEntered] = useState("");
        let history=useHistory();
        const handleFilter = (event) => {
          const searchWord = event.target.value;

          setWordEntered(searchWord);
          const newFilter = data.filter((value) => {
            return value.productname.toLowerCase().includes(searchWord.toLowerCase());
          });
         
          if (searchWord === "") {
            setFilteredData([]);
          } else {
            setFilteredData(newFilter);
          }
        };
      
        const clearInput = () => {
          setFilteredData([]);
          setWordEntered("");
        };
      
        return (
          <div className="search">
            <div className="searchInputs">
              <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                className="form-control me-2 rounded-pill"
                onChange={handleFilter}
              />
              <div className="searchIcon">
                {filteredData.length === 0 ? (
                  <HiSearch />
                ) : (
                  <GrFormClose id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </div>
            {filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                   
                    <div>{
                      <ul className="list-unstyled"> 
                        <li onClick={()=>{localStorage.setItem("productname",value.productname);
                                        history.push(`/productdetails/${value.productname}`)}}>{value.productname}
                        </li>
                      </ul>
                      }
                    </div>
                   
                  );
                })}
              </div>
            )}
          </div>
        );
      }



