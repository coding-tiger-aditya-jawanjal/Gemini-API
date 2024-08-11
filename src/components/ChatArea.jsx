import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Logo from "/logo.avif";

const ChatArea = ({ res, req, loading }) => {
	return (
		<div className="flex flex-col gap-10 p-5 sm:text-lg">
			<p
				className=" rounded-lg bg-gray-700 max-w-[50%] p-3 text-gray-100 font-medium self-end"
				dangerouslySetInnerHTML={{ __html: req }}
			></p>
			{loading ? (
				<div>
					<img
						src={Logo}
						alt="logo"
						className=" w-14 h-14 rounded-lg mb-5 animate-spin"
						loading="lazy"
					/>
					<Skeleton count={5} baseColor="red" className="max-w-[80%]" />
				</div>
			) : (
				<p
					className={`rounded-lg text-gray-100 bg-gray-700
					max-w-[80%] p-3 font-serif`}
					dangerouslySetInnerHTML={{ __html: res }}
				></p>
			)}
		</div>
	);
};

export default ChatArea;
