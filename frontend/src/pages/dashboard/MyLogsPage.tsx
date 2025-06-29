import { useEffect, useState } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { MY_LOGS_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";
import { exportLogsToExcel } from "../../utils/exportToExcelLogs";
import { FileText } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">My Logs</h1>
          </div>
          <button
            onClick={() => exportLogsToExcel(myLogs, "my_logs.xlsx")}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Export to Excel
          </button>
        </div>

        {/* Logs Table */}
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
    </div>
  );
};

export default MyLogsPage;
