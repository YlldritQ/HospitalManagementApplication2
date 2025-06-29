import { useState } from "react";
import moment from "moment";
import { IAuthUser } from "../../../types/auth.types";

interface IProps {
  usersList: IAuthUser[];
}

const LatestUsersSection = ({ usersList }: IProps) => {
  const [visibleUsersCount, setVisibleUsersCount] = useState(3);

  const selectedUsers = usersList
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const handleLoadMore = () => {
    setVisibleUsersCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
      <h1 className="text-xl font-semibold text-white mb-4">Latest Users</h1>
      {selectedUsers.slice(0, visibleUsersCount).map((item) => (
        <div
          key={item.id}
          className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-4 hover:bg-white/20 transition-colors duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium text-white">
              {item.userName}
            </span>
            <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
              {moment(item.createdAt).fromNow()}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            {item.firstName} {item.lastName}
          </div>
        </div>
      ))}
      {visibleUsersCount < usersList.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestUsersSection;
