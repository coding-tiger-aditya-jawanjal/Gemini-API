import { useState, useCallback } from "react";
import { IoSend } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useChatContext } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import BoxArea from "./components/BoxArea";
import ChatArea from "./components/ChatArea";
import RunChat from "./context/Gemini";

const App = () => {
	const {
		setOpen,
		setChats,
		setLightMode,
		lightMode,
		setSingleChat,
		singleChat,
		setShowChat,
		showChat,
		setSearchText,
		searchText,
	} = useChatContext();

	const [responseText, setResponseText] = useState([]);
	const [loading, setLoading] = useState(false);
	const [prevQue, setPrevQue] = useState("");
	const [inputDisabled, setInputDisabled] = useState(false);

	const handleToggleLightMode = useCallback(() => {
		setLightMode((prev) => !prev);
	}, [setLightMode]);

	const formatResponse = useCallback((response) => {
		return response
			.split("**")
			.map((text) =>
				text.includes(":") ? `<br/><br/><b>${text}</b><br/>` : text
			)
			.join("");
	}, []);

	const handleSearch = useCallback(async () => {
		if (searchText.length < 3) return;
		const currentQuestion = searchText;

		setPrevQue(currentQuestion);
		setSearchText("");
		setInputDisabled(true);
		setShowChat(true);
		setLoading(true);
		setSingleChat(null);

		try {
			const res = await RunChat(currentQuestion);
			const formattedResponse = formatResponse(res);

			setResponseText(formattedResponse);
			setChats((prevChats) => {
				const updatedChats = [
					{ question: currentQuestion, response: formattedResponse },
					...prevChats,
				];
				localStorage.setItem("chats", JSON.stringify(updatedChats));
				return updatedChats;
			});
		} finally {
			setLoading(false);
			setInputDisabled(false);
		}
	}, [searchText, formatResponse, setSingleChat, setShowChat, setChats]);

	return (
		<div
			className={`relative w-full h-screen max-h-screen min-h-screen ${
				lightMode ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
			} flex justify-center overflow-x-hidden`}
		>
			<div className="max-w-5xl w-[90%] flex flex-col gap-20 my-10">
				<div className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-10 overflow-y-auto overflow-x-hidden myscroll">
						<div className="flex flex-col gap-2 sm:gap-5 text-3xl sm:text-5xl lg:text-7xl font-bold font-sans">
							<h2>Hello, There!</h2>
							<h3>How Can I Help You?</h3>
						</div>
						{showChat ? (
							<ChatArea
								res={singleChat ? singleChat.response : responseText}
								req={singleChat ? singleChat.question : prevQue}
								loading={loading}
							/>
						) : (
							<BoxArea />
						)}
					</div>
					<div className="flex justify-center sm:justify-start items-center gap-5 mt-5">
						<input
							type="text"
							className={`${
								lightMode ? "border-2 border-black" : "border-none"
							} rounded-lg px-5 outline-none font-medium w-full max-w-[80%] h-14 text-black`}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							onKeyUp={(e) => e.key === "Enter" && handleSearch()}
							disabled={inputDisabled}
						/>
						<div className="flex items-center gap-5 cursor-pointer">
							{lightMode ? (
								<MdDarkMode size={32} onClick={handleToggleLightMode} />
							) : (
								<MdOutlineDarkMode size={32} onClick={handleToggleLightMode} />
							)}
							<IoSend size={32} onClick={handleSearch} />
						</div>
					</div>
				</div>
			</div>
			<GiHamburgerMenu
				size={32}
				className="absolute top-10 right-10 cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			/>
			<Sidebar />
		</div>
	);
};

export default App;
