import { BoxData } from "../context/Data";
import Box from "./Box";

const BoxArea = () => {
	return (
		<div className="flex justify-center gap-5 flex-wrap my-5">
			{BoxData.map((e, i) => {
				return <Box key={i} content={e}/>;
			})}
		</div>
	);
};

export default BoxArea;
