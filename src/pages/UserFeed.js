import '../App.css';
import * as React from 'react';
import QueryService from '../services/executeQuery';
import Post from '../components/Post';

function UserFeed() {

    const [contents, setContents] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await QueryService.getWithPaginationAndJoin("contents", 0, 10)
            setContents(result.data)
        }
        fetchData().catch(console.error)
    }, [])


    return <div>
        {
            contents.map((content) => {
                return <Post content={content}></Post>
            })
        }
    </div>
}

export default UserFeed;