import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import cookie from "react-cookies";
import axios from "axios";
import { TestImage, Current } from "./TestImage";

function Test(): JSX.Element {
	const [isRest, setIsRest] = useState<boolean>(false);
	const [isCur, setIsCur] = useState<boolean>(false);
	const [isDone, setIsDone] = useState<boolean>(false);
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const [min, setMin] = useState<number>(120);
	const [sec, setSec] = useState<number>(0);
	const time = useRef(60 * 210);
	const visTime = useRef(60 * 120);
	const timerId = useRef<any>(null);

	useEffect(() => {
		const Rest = cookie.load("is_rest");
		const Cur = cookie.load("is_cur");
		const Done = cookie.load("is_done");
		const Finish = cookie.load("is_finish");
		if (Rest === "true") {
			setIsRest(true);
		}
		if (Cur === "true") {
			setIsCur(true);
		}
		if (Done === "true") {
			setIsDone(true);
		}
		if (Finish === "true") {
			setIsFinish(true);
		}
		const userName = cookie.load("name");
		axios({
			url: "https://pandaedu-api.herokuapp.com/users/" + userName,
			method: "GET",
		})
			.then(function (res) {
				const Rest = cookie.load("is_rest");
				const Cur = cookie.load("is_cur");
				const Done = cookie.load("is_done");
				const Finish = cookie.load("is_finish");
				time.current = res.data.timer;
				if (!Rest) {
					visTime.current = res.data.timer - 60 * 90;
				} else if (!Cur && Rest) {
					visTime.current = res.data.timer - 60 * 80;
				} else if (!Done && Cur) {
					visTime.current = res.data.timer - 60 * 10;
				} else if (!Finish && Done) {
					visTime.current = res.data.timer;
				}
			})
			.catch(function (err) {
				alert(err);
			});
		timerId.current = setInterval(() => {
			setMin(Math.floor(visTime.current / 60));
			setSec(visTime.current % 60);
			visTime.current -= 1;
			time.current -= 1;
		}, 1000);

		return () => {
			return clearInterval(timerId.current);
		};
	}, []);

	useEffect(() => {
		console.log(time.current);
		if (sec % 5 === 0 && time.current > 0) {
			handleSaveTime();
		}
		const expire = new Date();
		expire.setDate(expire.getDate() + 7);
		if (time.current === 60 * 90 - 1) {
			cookie.save("is_rest", "true", {
				path: "/",
				expires: expire,
			});
			visTime.current = 60 * 10;
			setIsRest(true);
		} else if (time.current === 60 * 80 - 1) {
			cookie.save("is_cur", "true", {
				path: "/",
				expires: expire,
			});
			visTime.current = 60 * 70;
			setIsCur(true);
		} else if (time.current === 60 * 10 - 1) {
			cookie.save("is_done", "true", {
				path: "/",
				expires: expire,
			});
			visTime.current = 60 * 10;
			setIsDone(true);
		} else if (time.current <= -1) {
			cookie.save("is_finish", "true", {
				path: "/",
				expires: expire,
			});
			setIsFinish(true);
			visTime.current = 0;
			time.current = 0;
			setMin(0);
			setSec(0);
			handleSaveTime();
			clearInterval(timerId.current);
		}
	}, [sec]);

	function handleSaveTime() {
		const userName = cookie.load("name");
		axios({
			url:
				"https://pandaedu-api.herokuapp.com/test/update/?user_name=" + userName,
			method: "PUT",
			data: {
				timer: time.current,
			},
		})
			.then(function (res) {
				console.log(res);
			})
			.catch(function (err) {
				alert(err);
			});
	}

	return (
		<Center>
			<Timer>
				<TimerP time={visTime.current}>
					{min}:{sec < 10 ? "0" + sec : sec}
				</TimerP>
			</Timer>
			<CenterBox onMouseLeave={handleSaveTime}>
				{time.current > 0 && !isRest ? (
					<TestImage />
				) : isRest && !isCur ? (
					<Rest />
				) : !isDone && isCur ? (
					<Current />
				) : !isFinish && isDone ? (
					<Done />
				) : (
					<Finish />
				)}
			</CenterBox>
		</Center>
	);
}

function Rest() {
	return (
		<Align>
			<h2>쉬는 시간입니다.</h2>
			<h3>정답을 휴대폰 카메라로 촬영한 후 휴식합니다.</h3>
		</Align>
	);
}

function Done() {
	return (
		<Align>
			<h2>시험이 종료되었습니다.</h2>
			<h3>아래의 QR코드로 접속하여 시험지를 제출하기 바랍니다.</h3>
			<QRcode src="/image/openkakao.png" alt="qrcode" />
		</Align>
	);
}

function Finish() {
	return (
		<Align>
			<h2>시험이 종료되었습니다.</h2>
			<h3>수고하셨습니다.</h3>
		</Align>
	);
}

const QRcode = styled.img`
	margin-top: 10vh;
	width: 15%;
	object-fit: cover;
`;

const Align = styled.div`
	height: 20%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const Center = styled.div`
	min-width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #e5e5e5;
	overflow: hidden;
`;

const CenterBox = styled.div`
	margin: auto;
	width: 70vw;
	min-height: 80vh;
	background-color: white;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	overflow: scroll;
`;

const Timer = styled.div`
	background-color: white;
	position: fixed;
	left: 0;
	top: 0;
	width: 100px;
	height: 60px;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 1100px) {
		right: calc(50% - 50px);
		top: 0;
	}
`;

const TimerP = styled.p<{ time: number }>`
	color: ${(props) => (props.time < 10 ? "#f94144" : "black")};
	text-align: center;
`;

export default Test;
