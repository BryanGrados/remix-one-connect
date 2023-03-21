import { V2_MetaFunction } from "@remix-run/server-runtime";

export const meta: V2_MetaFunction = () => [{ title: "Kayser One Connect" }];

export default function Index() {
	return <div className="text-center text-5xl text-red-500">Hi</div>;
}
