import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchCollection = (collectionname) => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    let getCollectionData = ()=>{
        setIsLoading(true)
        try{
            const docRef = collection(db,collectionname)
            const q = query(docRef,orderBy('createdAt','desc'))
            onSnapshot(q,(docSnap)=>{
                  let arr =  docSnap.docs.map((doc)=>({...doc.data() , id:doc.id}))
                  setData(arr)
            })
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false); toast.error(err.message)  }
    }
    useEffect(()=>{getCollectionData()},[])
  return ({data,isLoading})
}
export default useFetchCollection
