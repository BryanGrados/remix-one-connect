import { Link } from "@remix-run/react";
import { V2_MetaFunction } from "@remix-run/server-runtime";

import { useOptionalUser } from "@/utils/utils";

export const meta: V2_MetaFunction = () => [{ title: "Kayser One Connect" }];

export default function Index() {
	const user = useOptionalUser();

	console.log(user);

	return (
		<div className="text-center text-5xl">
			{user ? (
				<>
					<h1>Welcome back, {user.name}!</h1>
					<Link
						to="/dashboard"
						className="text-blue-500 hover:text-blue-700 underline text-2xl"
					>
						Go to dashboard
					</Link>
				</>
			) : (
				<>
					<h1>Welcome to Kayser One Connect!</h1>
					<Link
						to="/login"
						className="text-blue-500 hover:text-blue-700 underline text-2xl"
					>
						Login
					</Link>
				</>
			)}
		</div>
	);
}
