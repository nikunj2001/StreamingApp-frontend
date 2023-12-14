import React, { useState } from 'react'
import axios from 'axios';
const Upload = () => {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		video: '',
		title: '',
		subTitle: ''
	});
	const handleInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}
	const handleFile = e => {
		if (!e?.target?.files?.length !== 0) {
			setState({
				...state,
				[e.target.name]: e.target.files[0]
			});
		}
	}
	const config = {
		headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1N2I0NmRlOGFhOTk4OGM0MTU4YjA0YSIsIm5hbWUiOiJwb29ydmkiLCJlbWFpbCI6InBvb3J2aUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQzeFVPcER4dXhHWTFUeHNkYnZ2eXIuZnlLM21mS3U1Zy5hV3ZkNWh5Y0k2WFIvRnNqRzFCbSIsInZpZGVvcyI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMTItMTRUMTg6MTg6MDYuMTQ5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTItMTRUMTg6MTg6MDYuMTQ5WiIsIl9fdiI6MH0sImlhdCI6MTcwMjU3Nzk1MCwiZXhwIjoxNzAzMTgyNzUwfQ.bJhWQebryKzH3IG4vOnjdLzGUlVnPZeBLoW_6uaEGps'
		}
	}
	const uploadVideo = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		const { title, subTitle, video } = state;
		formData.append('video', video);
		formData.append('title', title);
		formData.append('subTitle', subTitle);
		setLoading(true);
		axios.post('http://localhost:3001/video/upload', formData, config).then((response) => {
			setLoading(false);
		}).catch((error) => {
			setLoading(false);
		})
	}
	return (

		<>
			{loading ? <div> Loading..... </div> : <form onSubmit={uploadVideo} >
				<div className='title' >
					<h3>Add Video Title</h3>
					<input type="text" name='title' onChange={handleInput} />
				</div>
				<div className='subTitle' >
					<h3>Add Sub Title</h3>
					<input type="text" name='subTitle' onChange={handleInput} />
				</div>
				<div className='subTitle' >
					<label htmlFor="video">Upload Video</label>
					<input type="file" name='video' id='video' onChange={handleFile} />
				</div>
				<div>
					<input type="submit" value='Upload Video' />
				</div>
			</form>}

		</>
	)
}

export default Upload;