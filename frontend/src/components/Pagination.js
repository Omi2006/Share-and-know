import React from 'react'
import {
    PaginationItem,
    PaginationLink,
    Pagination,
} from 'reactstrap'

export default function Paginate(props) {
    return (
        <Pagination style={{justifyContent: 'center'}}>

            <PaginationItem disabled={props.currentPage - 1 < 1}>
                <PaginationLink previous onClick={() => props.setCurrentPage(props.currentPage - 1)}/>
            </PaginationItem>

            {props.numRange.map(number => {
                return (
                <PaginationItem active={number === props.currentPage}>
                    <PaginationLink onClick={() => props.setCurrentPage(number)}>{number}</PaginationLink> 
                </PaginationItem>
                )
            })}

            <PaginationItem disabled={props.currentPage + 1 > props.numRange.length}>
                <PaginationLink next onClick={() => props.setCurrentPage(props.currentPage + 1)}/>
            </PaginationItem>
            
        </Pagination>
    )
}