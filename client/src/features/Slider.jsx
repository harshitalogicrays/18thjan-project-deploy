import React, { useEffect } from 'react'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_SLIDERS, selectSliders } from '../redux/sliderSlice'
import { Carousel, Image } from 'react-bootstrap'

const Slider = () => {
    const {data}=useFetchCollection("sliders")
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(STORE_SLIDERS(data))
    },[data])
    const allsliders=useSelector(selectSliders)
    const sliders=allsliders.filter(item=>item.status=="Active")
  return (
    <>
        <Carousel fade indicators={false}>
            {sliders.map((s,i)=>
        <Carousel.Item key={s.id} interval={2000}>
            <Image src={s.image} className='w-100' height='500px'/>
            <Carousel.Caption><h3>{s.title}</h3>
            <p>{s.desc}</p></Carousel.Caption>
        </Carousel.Item>    
            )}  
        </Carousel>
    </>
  )
}

export default Slider
