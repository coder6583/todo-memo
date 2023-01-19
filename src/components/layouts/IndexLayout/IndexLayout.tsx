import IndexHeader from "@/components/models/IndexHeader/IndexHeader";
import { FC, ReactNode } from "react";

export type IndexLayoutProps = {
  children: ReactNode;
};

const IndexLayout: FC<IndexLayoutProps> = ({ children }) => {
  return (
    <>
      <IndexHeader />
      <main className="w-10/12 mx-auto mt-2">{children}</main>
    </>
  );
};

export default IndexLayout;
