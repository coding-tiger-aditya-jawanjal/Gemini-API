import { BoxData } from "../context/Data";
import Box from "./Box";

const BoxArea = () => {
	return (
		<div className="flex sm:justify-center gap-5 flex-wrap my-5 mx-2">
			{BoxData.map((e, i) => {
				return <Box key={i} content={e}/>;
			})}
		</div>
	);
};

export default BoxArea;
