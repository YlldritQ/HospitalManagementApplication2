import { ReactNode } from "react";
import { IconType } from "react-icons";

interface IProps {
  role: string;
  icon: IconType;
  color: string;
  children?: ReactNode;
}

const PageAccessTemplate = ({ role, icon: Icon, children }: IProps) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl border-l-4 border-t-4"
    >
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 p-6">
        <div>
          <Icon className="text-6xl md:text-8xl text-white" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
          >
            {`This is the ${role} Page`}
          </h2>
        </div>
      </section>
      <section className="p-6 text-gray-300">{children}</section>
    </div>
  );
};

export default PageAccessTemplate;
