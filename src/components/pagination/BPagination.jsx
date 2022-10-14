import React from 'react';
import { Pagination } from 'react-bootstrap';

function BPagination(props) {

    const renderPaginationItems = () => {
        let res = []
        for(let i=1;i<=props.pages;i++)
            res.push(<Pagination.Item onClick={props.handlePageChange} key={i} active={i === props.active}>{i}</Pagination.Item>)
        return res;
    }

    return (
        <Pagination>
            <Pagination.Prev disabled={props.active===1} onClick={e => props.handlePageChange(e, "prev")} />
            {renderPaginationItems()}
            <Pagination.Next disabled={props.active===props.pages} onClick={e => props.handlePageChange(e, "next")} />
        </Pagination>
    );
}

export default BPagination;