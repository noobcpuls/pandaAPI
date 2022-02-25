import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import pandalogo from "./pandalogo.png";
import axios from "axios";
import cookie from "react-cookies";

interface testFunc {
	setTestTrue: Function;
}

function Main(props: testFunc): JSX.Element {
	const [grade, setGrade] = useState<string>("1상2차/중1-1");
	const [name, SetName] = useState<string>("");

	function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
		SetName(e.target.value);
	}

	function handleChangeGrade(e: React.ChangeEvent<HTMLSelectElement>): void {
		setGrade(e.target.options[e.target.selectedIndex].value);
	}

	async function handleClickSubmit() {
		try {
			console.log(grade);
			const response = await axios({
				url: "https://pandaedu-api.herokuapp.com/test/",
				method: "POST",
				data: {
					name: name,
					grade: grade,
					is_tested: true,
					timer: 60 * 210,
				},
			});

			if (response.data.is_tested) {
				const expire = new Date();
				expire.setDate(expire.getDate() + 7);
				console.log(expire.toString());
				props.setTestTrue();
				cookie.save("is_tested", "true", {
					path: "/",
					expires: expire,
				});
				cookie.save("name", name, {
					path: "/",
					expires: expire,
				});
			}
		} catch (error) {
			alert(error);
		}
	}

	return (
		<Center>
			<CenterBox>
				<TextBox>
					<HH>판다교육 월말평가</HH>
				</TextBox>
				<FormDiv>
					<InputDiv>
						<PP>시험지</PP>
						<Select onChange={handleChangeGrade}>
							<option value="1상2차/중1-1">
								[1B] 양윤정 선생님, (1교시)중등 1-1 2차/(2교시)중등 1-1
							</option>
							<option value="1하2차/중1-1">
								[1P] 전진영 선생님, (1교시)중등 1-2 2차/(2교시)중등 1-1
							</option>
							<option value="2상2차/중1-1">
								[1I] 양윤정 선생님, (1교시)중등 2-1 2차/(2교시)중등 1-1
							</option>
							<option value="2하2차/중1-1">
								[1U] 최혜영 선생님, (1교시)중등 2-2 2차/(2교시)중등 1-1
							</option>
							<option value="3상2차/중1-1">
								[1A] 최귀종 선생님, (1교시)중등 3-1 2차/(2교시)중등 1-1
							</option>
							<option value="2상2차기본/중2-1">
								[2B] 최혜영 선생님, (1교시)중등 2-1 2차/(2교시)중등 2-1
							</option>
							<option value="2하1.5차기본/중2-1">
								[2P] 최혜영 선생님, (1교시)중등 2-2 1.5차/(2교시)중등 2-1
							</option>
							<option value="3하2차/중2-1">
								[2I] 주애선 선생님, (1교시)중등 3-2 2차/(2교시)중등 2-1
							</option>
							<option value="수상입문2차/중2-1">
								[2U] 주애선 선생님, (1교시)고등수학 상 입문 2차/(2교시)중등 2-1
							</option>
							<option value="수하기본2차/중2-1">
								[2A] 양윤정 선생님, (1교시)고등수학 하 기본 2차/(2교시)중등 2-1
							</option>
							<option value="3상2차기본/중3-1">
								[3N]최혜영 선생님, (1교시)중등 3-1 2차/(2교시)중등 3-1
							</option>
							<option value="3상2차기본/중3-1">
								[3B] 주애선 선생님, (1교시)중등 3-1 2차/(2교시)중등 3-1
							</option>
							<option value="수상심화2차/중3-1">
								[3P] 주애선 선생님, (1교시)고등수학 상 심화 2차/(2교시)중등 3-1
							</option>
							<option value="수하심화2차/중3-1">
								[3I] 양윤정 선생님, (1교시)고등수학 하 심화 2차/(2교시)중등 3-1
							</option>
							<option value="수1기본2차/중3-1">
								[3U] 최귀종 선생님, (1교시)수1 기본 2차/(2교시)중등 3-1
							</option>
							<option value="수2기본2차/중3-1">
								[3A] 전진영 선생님, (1교시)수2 기본 2차/(2교시)중등 3-1
							</option>
						</Select>
					</InputDiv>
					<InputDiv>
						<PP>이름</PP>
						<InputText
							type="text"
							placeholder="이름을 입력하세요."
							onChange={handleChangeName}
						/>
					</InputDiv>
					<PPW>테스트라능</PPW>
					<Start onClick={handleClickSubmit}>시험 시작</Start>
					<Img src={pandalogo} alt="pandalogo" />
				</FormDiv>
			</CenterBox>
		</Center>
	);
}

const gradientKeyframes = keyframes`
  0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
`;

const Center = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(137deg, #e0c3fc, #8ec5fc, #9795f0, #fbc8d4);
	background-size: 800% 800%;
	animation: ${gradientKeyframes} 16s ease infinite;

	overflow: auto;
`;

const CenterBox = styled.div`
	margin: auto;
	width: max(400px, 32%);
	height: max(600px, 80%);
	background-color: white;
	border-radius: 4px;
`;

const Img = styled.img`
	width: 200px;
	object-fit: cover;
	text-align: center;
`;

const TextBox = styled.div`
	width: 80%;
	height: 10%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 5% 10%;
	border-bottom: 1px solid #cfd9df;
`;

const HH = styled.h1`
	font-weight: 500;
	font-size: 32px;
	text-align: center;
`;

const FormDiv = styled.div`
	width: 80%;
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 10%;
`;

const PP = styled.p`
	color: #495057;
	font-size: 18px;
	font-weight: 100;
`;

const Select = styled.select`
	width: 100%;
	border: 1px solid #495057;
	border-radius: 4px;
	padding: 4px 9px;
	font-family: inherit;
`;

const InputText = styled.input`
	width: calc(100% - 18px);
	padding: 4px 9px;
	border: 0.6px solid #495057;
	border-radius: 4px;
`;

const InputDiv = styled.div`
	width: 80%;
	padding: 0 10%;
	height: 15%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: start;
`;

const Start = styled.button`
	width: 70%;
	height: 10%;
	border: none;
	border-radius: 4px;
	background: #96e6a1;
	color: white;
	font-size: 16px;
	font-weight: 300;
	transition: all 0.2s ease-out;
	&:hover {
		background: #d4fc79;
	}
`;

const PPW = styled(PP)`
	color: #f72585;
`;
export default Main;
