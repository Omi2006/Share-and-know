import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Jumbotron, Spinner, Button } from 'reactstrap';
import { PostList } from '../Post';
import { HubList, ToggleButton } from './';
import { Search, Dropdown, Paginate } from '../General';
import { fetchCsrf, LoggedInContext } from '../Auth';
import toast from 'react-hot-toast';
import '../../style/hub.css';

export default function Hub() {
    const loggedIn = useContext(LoggedInContext);
    const [hub, setHub] = useState(undefined);
    const [joinStatus, setJoinStatus] = useState(
        hub?.members?.includes(loggedIn) ? 'Leave' : 'Join'
    );
    const [sortBy, setSortBy] = useState(['-date', 'Newest']);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('posts');
    const [search, setSearch] = useState('');
    const { title } = useParams();
    const pathlist = useLocation().pathname.split('/');

    useEffect(() => {
        if (!hub) {
            const getHub = async () => {
                const response = await fetch(
                    `/knowledge/hub/details/${title}?list=${pathlist}`
                );
                const result = await response.json();
                setHub(result);
                setJoinStatus(
                    result.members.includes(loggedIn) ? 'Leave' : 'Join'
                );
            };
            getHub();
        }
    }, [title, hub, pathlist, loggedIn]);

    //Get items for given category and skip if category isn't ready
    useEffect(() => {
        //Reset the items to make the loading effect
        setIsLoading(true);
        //Only fetch if items aren't set and the hub isn't undefined
        if (hub !== undefined) {
            const getItems = async () => {
                const response = await fetch(
                    `/knowledge/hub/items/${hub.id}?sort=${sortBy[0]}&page=${currentPage}&type=${type}&search=${search}`
                );
                const result = await response.json();
                setItems(result);
                setIsLoading(false);
            };
            getItems();
        }
    }, [hub, currentPage, type, search, sortBy, loggedIn]);

    const handleTypeChange = () => {
        //Set is loading here to prevent memory leaks
        setIsLoading(true);
        //Set the sort by to newest to avoid invalid sort by in the hubs
        setType(type === 'posts' ? 'hubs' : 'posts');
        setSortBy(['-date', 'Newest']);
        //Set the current page to avoid errors if the pages count is less than the current page
        setCurrentPage(1);
    };

    const joinHub = () => {
        const result = fetchCsrf(`/knowledge/joined`, { hub: hub.id }, 'PUT');
        toast.promise(result, {
            loading: 'Loading...',
            error: err => err.toString(),
            success: data => {
                setJoinStatus(data.status);
                return data.status === 'Leave'
                    ? 'Hub joined successfully'
                    : 'Hub left successfully';
            },
        });
    };

    const options = [
        ['-date', 'Newest'],
        ['date', 'Oldest'],
    ];
    //Posts only sort by options
    if (type === 'posts')
        options.push(['-likes', 'Most Liked'], ['likes', 'Least liked']);

    return hub === undefined ? (
        <Spinner color="primary" />
    ) : hub.error ? (
        <h3>We couldn't find this hub.</h3>
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
                <h3 className="display-3 hub-name">
                    {title.replace(/-/g, ' ')}
                </h3>
                {loggedIn && (
                    <Button
                        onClick={joinHub}
                        color="success"
                        style={{ color: 'black' }}
                    >
                        {joinStatus}
                    </Button>
                )}

                <p style={{ fontSize: '1.5rem' }}>{hub.description}</p>
                <hr className="my-2" />
                <div className="d-flex justify-content-between">
                    <ToggleButton
                        type={type}
                        handleTypeChange={handleTypeChange}
                    />
                    {loggedIn &&
                        (type === 'posts' ? (
                            /*Ensure this isn't a source hub */
                            hub.full_path.includes('/') && (
                                <Link to="posts/new" className="lead">
                                    + New post
                                </Link>
                            )
                        ) : (
                            <Link to="new" className="lead">
                                + New Hub
                            </Link>
                        ))}
                </div>
            </Jumbotron>
            <div className="wrapper">
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
                {type === 'posts' ? (
                    <>
                        <PostList
                            posts={items.results || []}
                            isLoading={isLoading}
                        />
                        <Paginate
                            currentPage={currentPage}
                            last={items.total}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <>
                        <HubList hubs={items.results} isLoading={isLoading} />
                        <Paginate
                            currentPage={currentPage}
                            last={items.total}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
