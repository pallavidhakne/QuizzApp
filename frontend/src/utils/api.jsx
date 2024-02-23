import axios from 'axios'
import { useEffect } from 'react'

export const fatchDataFromApi=async()=>{
    useEffect(()=>{
        axios.get("https://the-trivia-api.com/v2/questions/")
        .then((res)=>{
            console.log(`Response is ${res}`);
        })
    },[])

}