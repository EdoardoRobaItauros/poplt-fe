import '../App.css';
import * as React from 'react';
import QueryService from '../services/executeQuery';
import Post from '../components/Post';
import { Alert, Snackbar } from '@mui/material';

function UserFeed() {

    const [contents, setContents] = React.useState([])
    const [hasMore, setHasMore] = React.useState(true)
    const [loading, setLoading] = React.useState(true)
    const [pageNumber, setPageNumber] = React.useState(0)
    const [errorCode, setErrorCode] = React.useState()
    const [openSnackBarKo, setOpenSnackBarKo] = React.useState(false);

    const observer = React.useRef()
    const lastPostRef = React.useCallback(lastPost => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prev => prev + 1)
            }
        })
        if (lastPost) observer.current.observe(lastPost)
    }, [loading, hasMore])

    React.useEffect(() => {
        fetchData().catch(console.error)
    }, [pageNumber])

    const updateContent = async (contentId, isliked) => {
        var contentUpdated = {}
        const conts = contents.map((c) => {
            if (c.id === contentId) {
                c.isliked = isliked
                if (isliked) {
                    c.likes = c.likes + 1
                } else {
                    c.likes = c.likes - 1
                }
                contentUpdated = { isliked: isliked, likes: c.likes }
                return c
            }
            return c
        })
        const updated = await QueryService.put("contents", contentId, contentUpdated)
        setContents(conts)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await QueryService.getWithPaginationAndJoin("contents", pageNumber, 10)
            setLoading(false)
            setContents(prevContents => {
                // console.log("prev: ", prevContents)
                return [...prevContents, ...result.data.data]
            })
            if (result.data.data.length === 0) { setHasMore(false) }
        } catch (err) {
            setLoading(false)
            setErrorCode(err.toString())
            setOpenSnackBarKo(true)
        }
    }

    const handleCloseSnackBarKo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorCode()
        setOpenSnackBarKo(false);
    };

    return <div style={{ overflowY: "auto", maxHeight: "50rem" }}>
        {
            contents.map((content, index) => {
                if (index + 1 === contents.length) {
                    return <div ref={lastPostRef}><Post updateContent={updateContent} content={content}></Post></div>
                }
                return <div><Post updateContent={updateContent} content={content}></Post></div>
            })
        }
        <Snackbar open={openSnackBarKo} autoHideDuration={5000} onClose={handleCloseSnackBarKo}>
            <Alert onClose={handleCloseSnackBarKo} severity="error" sx={{ width: '100%' }}>
                Something went wrong! {errorCode}
            </Alert>
        </Snackbar>
    </div>
}

export default UserFeed;