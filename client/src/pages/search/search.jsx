import React,{useState,useEffect} from 'react';
import './search.css';
import * as QueryString from "query-string"
import Card from '../../components/card/card';

const Search = ({location}) => {
    const [properties,Setproperties] = useState([]);
    const [loading,Setloading] = useState(false);
    useEffect(() => {
        const params = QueryString.parse(location.search);
        Setloading(true);
        if (!params.location) {
            Setloading(false);
            Setproperties([]);
            return;
        }
        fetch(`http://localhost:5000/properties/search/${params.location}`).then((resData) => {
            return resData.json()
          }).then((res) => {
           Setproperties(res.properties);
           Setloading(false);
          }).catch(err => {
              console.log(err);
          })   
    },[location.search])
   

    return (
        <div className='search'>
          {
              loading ? "Loading..." : (
                  properties.length !== 0 ? ( properties.map( property => <Card key={property._id} {...property} /> )) 
                  :
                   <div className='search__notfound'>
                        <h2>No Search Result Found.</h2>
                        <h3>Here are few tips that might help</h3>
                        <ul>
                            <li>Check the spelling of your keyword</li>
                            <li>Try alternate words or selections</li>
                            <li>Try entering a more generic keyword</li>
                            <li>Try entering fewer keywords</li>
                        </ul>   
                   </div>
              )
          }
        </div>
    )
}

export default Search;