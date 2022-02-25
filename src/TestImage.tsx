import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from "react-cookies";

interface props {
	grade: string;
}

export function TestImage() {
	const [src, setSrc] = useState("");

	useEffect(() => {
		const name = cookie.load("name");
		console.log(name);
		axios({
			url: "https://pandaedu-api.herokuapp.com/testfile",
			method: "GET",
			params: {
				user_name: name,
				number: 0,
			},
			responseType: "blob",
		})
			.then(function (res) {
				const image = URL.createObjectURL(res.data);
				setSrc(image);
			})
			.catch(function (error) {
				alert(error);
			});
	}, []);

	return (
		<div>
			<Img src={src} alt="panda" />
		</div>
	);
}

export function Current() {
	const [src, setSrc] = useState("");

	useEffect(() => {
		const name = cookie.load("name");
		console.log(name);
		axios({
			url: "https://pandaedu-api.herokuapp.com/testfile",
			method: "GET",
			params: {
				user_name: name,
				number: 1,
			},
			responseType: "blob",
		})
			.then(function (res) {
				const image = URL.createObjectURL(res.data);
				setSrc(image);
			})
			.catch(function (error) {
				alert(error);
			});
	}, []);

	return (
		<div>
			<Img src={src} alt="panda" />
		</div>
	);
}

const Img = styled.img`
	width: max(70%, 800px);
	height: auto;
	object-fit: cover;
`;
