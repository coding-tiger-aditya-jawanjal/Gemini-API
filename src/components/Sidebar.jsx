import { useChatContext } from "../context/ChatContext";

const Sidebar = () => {
	const { open, setOpen, chats, setSingleChat, setShowChat } = useChatContext();

	const handleOpenChat = (index) => {
		setOpen(false);
		setShowChat(true);
		setSingleChat(chats[index]);
	};

	return (
		<div
			className={`absolute right-10 top-20 z-30 w-60 p-5 max-h-[70%] overflow-y-auto rounded-lg shadow-md bg-white text-black cursor-pointer transition-all ease-in-out duration-500 ${
				open ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			{chats?.length ? (
				chats.map((chat, index) => (
					<p
						key={index}
						className="line-clamp-1 font-medium text-gray-700 cursor-pointer my-5"
						onClick={() => handleOpenChat(index)}
					>
						<span>{`${index + 1}. ${chat.question}`}</span>
					</p>
				))
			) : (
				<span>No History</span>
			)}
		</div>
	);
};

export default Sidebar;
