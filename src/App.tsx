import React, { useEffect, useState } from "react";
import Main from "./Main";
import Test from "./Test";
import cookie from "react-cookies";

function App() {
	const [isTest, setIsTest] = useState<boolean>(false);

	function handleSetTestTrue(): void {
		setIsTest(true);
	}

	useEffect(() => {
		if (cookie.load("is_tested") === "true") {
			setIsTest(true);
		}
	}, []);

	return isTest ? (
		<Test setTestTrue={handleSetTestTrue} />
	) : (
		<Main setTestTrue={handleSetTestTrue} />
	);
}

export default App;
