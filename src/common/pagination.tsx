import React, { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

 const Pagination = (props:any) => {
  return <PaginationControl
    page={props.currentPage}
    between={4}
    total={props.pageCount}
    limit={props.limit}
    changePage={(page) => {
        props.onPageChange(page)
      }}
    ellipsis={1}
  />
}

export default Pagination


