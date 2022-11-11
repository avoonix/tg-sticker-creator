import dynamic from "next/dynamic";
import { FC, PropsWithChildren } from "react";

const DisableSsr: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(DisableSsr), { ssr: false });
