import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { ILogDto } from "../../types/log.types";
import { LOGS_URL } from "../../utils/globalConfig";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const SystemLogsPage = () => {
  const [logs, setLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(LOGS_URL);
      const { data } = response;
      setLogs(data);
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
      <h1 className="text-3xl font-bold text-white mb-4">
        System Logs
      </h1>

      <div className="w-full p-4 flex flex-col justify-start items-stretch gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {/* Header Row */}
        <div className="grid grid-cols-6 p-2 bg-white/10 text-gray-200 font-semibold border-b border-white/10 rounded-t-xl">
          <span>No</span>
          <span>Date</span>
          <span>Username</span>
          <span className="col-span-3">Description</span>
        </div>

        {logs.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 p-2 hover:bg-white/10 transition-colors duration-200 border-b border-white/10"
          >
            <span className="text-gray-300">{index + 1}</span>
            <span className="text-gray-300">{moment(item.createdAt).fromNow()}</span>
            <span className="text-gray-300">{item.userName}</span>
            <span className="col-span-3 text-gray-300">{item.description}</span>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No logs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemLogsPage;
