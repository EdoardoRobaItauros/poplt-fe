import * as React from 'react';
import '../App.css';
import QueryService from '../services/executeQuery';
import GridStatistics from './GridStatistics';

function ModalGlobalStats(props) {

    const [globalStatistics, setGlobalStatistics] = React.useState([])

    React.useEffect(() => {
        fetchStats()
    }, [props])

    const fetchStats = async () => {
        const stats = await QueryService.getBySearch("contents", { challenge_id: props.selectedChallenge.challenge_id, orderedBy: "likes" })
        setGlobalStatistics(stats.data)
    }

    return <div style={{ height: "80vh" }}>
        <GridStatistics space={props.space} statistics={globalStatistics} />
    </div>
}

export default ModalGlobalStats;