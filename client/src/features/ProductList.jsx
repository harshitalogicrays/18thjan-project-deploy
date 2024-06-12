import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Container } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

const ProductList = ({products}) => {
  //pagination 
  const itemsPerPage = 2
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems,setCurrentItems]=useState([])
  const [pageCount,setPageCount] =useState(0)

  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage; //0+10 , 20+10=30
  setCurrentItems(products.slice(itemOffset, endOffset)) //0 to 9  , 20,30 =>20 to 29
  setPageCount(Math.ceil(products.length / itemsPerPage)) //100/10 =>10
  },[itemOffset,products])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length; //2*10%100 =>20
    setItemOffset(newOffset); //20
  };

  return (
   <>
    <div className="row">
        {currentItems.map((product,index)=><ProductCard key={product.id} product={product}></ProductCard>)}
    </div>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName = "page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
   </>
  )
}

export default ProductList
