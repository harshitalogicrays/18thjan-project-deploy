import ReactImageMagnify from '@blacklab/react-image-magnify'
import React, { useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const ImageThumbnail = ({images}) => {
    let [image,setImage]=useState(images[0])
    let [index,setIndex]=useState(0)
    let handleClick=(i)=>{
        setIndex(i)
        setImage(images[i])
    }
    let handlePrev=()=>{
        if(index > 0){
            setIndex(index-1)
            setImage(images[index])
        }
    }
    let handleNext=()=>{
        if(index < images.length-1){
            setIndex(index+1)
            setImage(images[index])
        }
    }
  return (
    <>
        {/* <img src={image} className='mb-3' width={500} height={300}/> */}
        <ReactImageMagnify
                imageProps={{
                    alt: 'loading',
                    height:200,
                    width:400,
                    src: image
                }}
                magnifiedImageProps={{
                    src: image,
                    width: 1800,
                    height: 800
                }}
                portalProps = {{
                    horizontalOffset : 10,
                    verticalOffset:-150
                    }}
            />
        <div className='mt-3'>
        <button type="button"  class="btn btn-primary me-2" onClick={handlePrev}>
            <FaArrowAltCircleLeft/>
        </button>
        
        {images.map((img,i)=>
            <img src={img} height={100} width={100} className={`me-2 ${index==i?'border border-dark border-5':''}`} onClick={()=>handleClick(i)}/>
        )}
          <button type="button"  class="btn btn-primary ms-2" onClick={handleNext} >
            <FaArrowAltCircleRight  />
        </button>
        </div>
    </>
  )
}

export default ImageThumbnail
