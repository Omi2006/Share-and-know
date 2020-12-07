import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function HubPath() {
    const { pathname } = useLocation();
    const [hubPath, setHubPath] = useState(null);

    useEffect(() => {
        //Make an array from the path
        let newHubPath = pathname.split('/');
        //Remove those 3 from the path
        if (newHubPath[newHubPath.length - 2] === 'posts')
            newHubPath.splice(-2);
        newHubPath = newHubPath.filter(
            path => !['', 'hubs', 'new'].includes(path)
        );
        //Remove the last two items if posts is there
        setHubPath(newHubPath);
    }, [pathname]);

    return pathname.split('/').includes('hubs') && hubPath ? (
        <Breadcrumb style={{ paddingTop: 0 }}>
            {hubPath.map((hub, index) => (
                <BreadcrumbItem key={index}>
                    <Link to={`/hubs/${hubPath.slice(0, index + 1).join('/')}`}>
                        {hub}
                    </Link>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    ) : null;
}
