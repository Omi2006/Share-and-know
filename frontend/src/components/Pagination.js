import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';

export default function Paginate({ setCurrentPage, currentPage, last }) {
    return (
        <Pagination
            style={{
                justifyContent: 'center',
                padding: '10px 1.6rem',
                paddingRight: '3.2rem',
            }}
        >
            {/* Make sure current page isn't the first to disable it */}
            <PaginationItem disabled={currentPage === 1} key="prev">
                <PaginationLink
                    previous
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            </PaginationItem>
            {/*Make the list of pages uniqui in case the active one is first or last by making the list a set and then a list again*/}
            {[...new Set([1, currentPage, last])].map(number => (
                <PaginationItem active={number === currentPage} key={number}>
                    <PaginationLink onClick={() => setCurrentPage(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}
            {/* Make sure current page isn't the last to disable it */}
            <PaginationItem disabled={currentPage === last} key="next">
                <PaginationLink
                    next
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            </PaginationItem>
        </Pagination>
    );
}
