import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [lightMode, setLightMode] = useState(false);
	const [open, setOpen] = useState(false);
	const [singleChat, setSingleChat] = useState(null);
	const [showChat, setShowChat] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [chats, setChats] = useState(() => {
		const savedChats = localStorage.getItem("chats");
		return savedChats ? JSON.parse(savedChats) : [];
	});

	useEffect(() => {
		localStorage.setItem("chats", JSON.stringify(chats));
	}, [chats]);

	return (
		<ChatContext.Provider
			value={{
				chats,
				setChats,
				open,
				setOpen,
				lightMode,
				setLightMode,
				setSingleChat,
				singleChat,
				showChat,
				setShowChat,
				searchText,
				setSearchText,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = () => useContext(ChatContext);

export default ChatProvider;
