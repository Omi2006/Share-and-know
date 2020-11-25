import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { Jumbotron, Spinner } from 'reactstrap';
import PostList from '../Post/List';
import HubList from './HubList';
import Paginate from '../Pagination';
import Search from '../General/Search';
import Dropdown from '../General/Dropdown';
import ToggleButton from './ToggleButton';
import '../../style/hub.css';

export default function Hub() {
    const [hub, setHub] = useState(useLocation().state?.hub);
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);
    const [items, setItems] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('posts');
    const [search, setSearch] = useState('');
    const { title } = useParams();
    const pathlist = useLocation().pathname.split('/');

    useEffect(() => {
        if (hub) return () => {};
        const getHub = async () => {
            const response = await fetch(
                `knowledge/hub/details/${title}?list=${pathlist}`
            );
            const result = await response.json();
            setHub(result);
        };
        getHub();
    }, [title, hub]);

    //Get items for given category and skip if category isn't ready
    useEffect(() => {
        setItems({});
        if (!hub) return () => {};
        const getItems = async () => {
            const response = await fetch(
                `knowledge/hub/items/${hub.id}?sort=${sortBy[0]}&page=${currentPage}&type=${type}&search=${search}`
            );
            const result = await response.json();
            setItems(result);
        };
        getItems();
    }, [hub, currentPage, type, search, sortBy]);

    const handleTypeChange = () => {
        setType(type === 'posts' ? 'hubs' : 'posts');
        //Set the sort by to newest to avoid invalid sort by in the hubs
        setSortBy(['-date', 'Newest']);
        //Set the current page to avoid errors if the pages count is less than the current page
        setCurrentPage(1);
    };

    const options = [
        ['-date', 'Newest'],
        ['date', 'Oldest'],
    ];
    //Posts only sort by options
    if (type === 'posts')
        options.push(['-likes', 'Most Liked'], ['likes', 'Least liked']);

    return !hub ? (
        <Spinner color="primary" />
    ) : (
        <div style={{ overflow: 'hidden' }}>
            <Jumbotron>
                <h2 className="display-3 hub-name">{title}</h2>
                <p className="lead">{hub.description}</p>
                <hr className="my-2" />
                <ToggleButton type={type} handleTypeChange={handleTypeChange} />
            </Jumbotron>
            <Search
                setSearch={setSearch}
                type={type}
                setCurrentPage={setCurrentPage}
            />
            <Dropdown
                options={options}
                setSortBy={setSortBy}
                selected={sortBy[1]}
            />
            {items.results ? (
                type === 'posts' ? (
                    <>
                        <PostList posts={items.results} />
                        <Paginate
                            currentPage={currentPage}
                            last={items.total}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <HubList hubs={items.results} />
                )
            ) : (
                <Spinner color="primary" />
            )}
        </div>
    );
}
