import * as React from 'react';
import '../App.css';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function GridStatistics(props) {

    const lowRange = [0, 10]
    const mediumRange = [11, 40]
    const highRange = [41, 1000]

    return <Box sx={{ height: "60vh" }}>
        <Typography style={{marginBottom:"1rem"}} variant="subtitle1">Best to worst content for the challenge you picked:</Typography>
        <Grid container columnSpacing={12}>
            {
                props.statistics.map((stat) => {
                    return <Grid item xs={props.space}>
                        <Card className='centered' sx={{ height: 150, marginBottom:"1rem", width: 400 }}>
                            <CardMedia
                                component="img"
                                height="70"
                                image={stat.image_url}
                                alt={stat.image_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {stat.likes} likes
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {
                                        stat.likes <= lowRange[1] && <p>I am sorry: your content is not reaching much of attention...</p>
                                    }
                                    {
                                        stat.likes >= mediumRange[0] && stat.likes <= mediumRange[1] && <p>Your content is growing!</p>
                                    }
                                    {
                                        stat.likes >= highRange[0] && <p>Great! Your content is going viral!!</p>
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                })
            }
        </Grid>
    </Box>
}

export default GridStatistics;