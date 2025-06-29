import { useEffect, useState } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { MY_LOGS_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const MyLogsPage = () => {
  const [myLogs, setMyLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(MY_LOGS_URL);
      const { data } = response;
      setMyLogs(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error happened. Please contact admins.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-4">My Logs</h1>

      <div className="w-full p-4 flex flex-col justify-start items-stretch gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {/* Table Header */}
        <div className="grid grid-cols-6 p-2 bg-white/10 text-gray-200 font-semibold border-b border-white/10 rounded-t-xl">
          <span>No</span>
          <span>Date</span>
          <span>Username</span>
          <span className="col-span-3">Description</span>
        </div>

        {myLogs.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 p-2 hover:bg-white/10 transition-colors duration-200 border-b border-white/10"
          >
            <span className="text-gray-300">{index + 1}</span>
            <span className="text-gray-300">
              {moment(item.createdAt).fromNow()}
            </span>
            <span className="text-gray-300">{item.userName}</span>
            <span className="col-span-3 text-gray-300">
              {item.description}
            </span>
          </div>
        ))}

        {myLogs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No logs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLogsPage;
