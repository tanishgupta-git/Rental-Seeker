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
            console.log("blank search")
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
                   <span>No Search Result Found.</span>
              )
          }
        </div>
    )
}

export default Search;