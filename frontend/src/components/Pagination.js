import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';

export default function Paginate(props) {
    return (
        <Pagination style={{ justifyContent: 'center' }}>
            {/* Make sure current page isn't the first to disable it */}
            <PaginationItem disabled={props.currentPage === 1} key="prev">
                <PaginationLink
                    previous
                    onClick={() => props.setCurrentPage(props.currentPage - 1)}
                />
            </PaginationItem>

            {[...new Set([1, props.currentPage, props.last])].map(number => {
                return (
                    <PaginationItem
                        active={number === props.currentPage}
                        key={number.toString()}
                    >
                        <PaginationLink
                            onClick={() => props.setCurrentPage(number)}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                );
            })}
            {/* Make sure current page isn't the last to disable it */}
            <PaginationItem
                disabled={props.currentPage === props.last}
                key="next"
            >
                <PaginationLink
                    next
                    onClick={() => props.setCurrentPage(props.currentPage + 1)}
                />
            </PaginationItem>
        </Pagination>
    );
}
