import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [videos, setVideos] = useState([]);
	const [hoveredVideo, setHoveredVideo] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const config = {
		'headers': {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1N2I0NmRlOGFhOTk4OGM0MTU4YjA0YSIsIm5hbWUiOiJwb29ydmkiLCJlbWFpbCI6InBvb3J2aUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQzeFVPcER4dXhHWTFUeHNkYnZ2eXIuZnlLM21mS3U1Zy5hV3ZkNWh5Y0k2WFIvRnNqRzFCbSIsInZpZGVvcyI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMTItMTRUMTg6MTg6MDYuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTItMTRUMTg6MTg6MDYuMTQ5WiIsIl9fdiI6MH0sImlhdCI6MTcwMjU3Nzk1MCwiZXhwIjoxNzAzMTgyNzUwfQ.bJhWQebryKzH3IG4vOnjdLzGUlVnPZeBLoW_6uaEGps'
		}
	}
	useEffect(()=> {
		setLoading(true);
		axios.get('http://localhost:3001/video', config).then((resposne) => {
			setLoading(false);
			setVideos(resposne?.data?.data?.videos ?? []);
		}).catch((error) => {
			setLoading(false);
			console.log(error);
		})
	}, [])
	const handleHover = (video) => {
		setHoveredVideo(video);
	};

	const handleVideoClick = (video) => {
		setSelectedVideo(video);
	};
	const handleClosePlayer = () => {
		setSelectedVideo(null);
	};
	return (
		<div>
			{ loading ? <>Loading....</> : <>
			<h1>Video List</h1>
			<div>
				{
					videos.map((video) => (
						<div
							key={video.id}
							onClick={() => handleVideoClick(video)
							}
						>
							<video src={video.videoLink} alt={video.title} 
							onMouseOver={event => event.target.play()}
							onMouseOut={event => event.target.pause()}
							>
							-	{video.title}
							-	{video.subTitle}
							</video>
						</div>
					))
				}
			</div>
			{/* <video src="https://myproject-videos.s3.amazonaws.com/big_buck_bunny_720p_1mb.mp4"  ></video> */}
			{selectedVideo && (
				<div className="video-player">
					<ReactPlayer
						url= {selectedVideo.videoLink}
						controls
						width="100%"
						height="100%"
						playing
						onEnded={handleClosePlayer}
					/>
				</div>
			)}
			</> }
		</div>
	)
}

export default Home