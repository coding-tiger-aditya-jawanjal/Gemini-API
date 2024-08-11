import { FaLightbulb } from "react-icons/fa";
import { useChatContext } from "../context/ChatContext";

const Box = ({ content }) => {
	const { lightMode, setSearchText } = useChatContext();

	return (
		<div
			className={`w-36 sm:w-56 h-40 font-medium ${
				lightMode ? "bg-gray-300" : "bg-gray-600"
			} rounded-lg shadow-md shadow-white p-3 sm:text-lg flex flex-col justify-between hover:scale-105 transition-all ease-linear duration-300 cursor-pointer`}
			onClick={() => setSearchText(content)}
		>
			<p className=" line-clamp-3">{content}</p>
			<FaLightbulb size={28} className=" self-end" />
		</div>
	);
};

export default Box;
