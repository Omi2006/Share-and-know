import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Jumbotron, Spinner } from 'reactstrap';
import { PostList } from '../Post';
import { HubList, ToggleButton } from './';
import { Search, Dropdown } from '../General';
import Paginate from '../Pagination';
import '../../style/hub.css';

export default function Hub() {
    const [hub, setHub] = useState(useLocation().state?.hub);
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('posts');
    const [search, setSearch] = useState('');
    const { title } = useParams();
    const pathlist = useLocation().pathname.split('/');

    useEffect(() => {
        if (!hub) {
            const getHub = async () => {
                const response = await fetch(
                    `knowledge/hub/details/${title}?list=${pathlist}`
                );
                const result = await response.json();
                setHub(result);
            };
            getHub();
        }
    }, [title, hub, pathlist]);

    //Get items for given category and skip if category isn't ready
    useEffect(() => {
        //Reset the items to make the loading effect
        setIsLoading(true);
        //Only fetch if items aren't set and the hub isn't undefined
        if (hub !== undefined) {
            const getItems = async () => {
                const response = await fetch(
                    `knowledge/hub/items/${hub.id}?sort=${sortBy[0]}&page=${currentPage}&type=${type}&search=${search}`
                );
                const result = await response.json();
                setItems(result);
                setIsLoading(false);
            };
            getItems();
        }
    }, [hub, currentPage, type, search, sortBy]);

    const handleTypeChange = () => {
        //Set is loading here to prevent memory leaks
        setIsLoading(true);
        //Set the sort by to newest to avoid invalid sort by in the hubs
        setType(type === 'posts' ? 'hubs' : 'posts');
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
            <Jumbotron
                style={{
                    paddingTop: 0,
                    marginTop: '-20px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <hr />
                <h2 className="display-3 hub-name">{title}</h2>
                <p className="lead text-md-left">{hub.description}</p>
                <hr className="my-2" />
                <div className="d-flex justify-content-between">
                    <ToggleButton
                        type={type}
                        handleTypeChange={handleTypeChange}
                    />
                    {/*Ensure this isn't a source hub */}
                    {hub.full_path.includes('/') && (
                        <Link to="posts/new">+ New post</Link>
                    )}
                </div>
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
            {!isLoading ? (
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
