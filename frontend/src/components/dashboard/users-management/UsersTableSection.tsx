import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.hook";
import { IAuthUser, RolesEnum } from "../../../types/auth.types";
import moment from "moment";
import Button from "../../../components/general/Button";
import { isAuthorizedForUpdateRole } from "../../../auth/auth.utils";

interface IProps {
  usersList: IAuthUser[];
}

const UsersTableSection = ({ usersList }: IProps) => {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const RoleClassNameCreator = (Roles: string[]) => {
    let className = "px-3 py-1 text-white text-xs rounded-3xl ";
    if (Roles.includes(RolesEnum.PATIENT)) {
      className += "bg-emerald-600";
    } else if (Roles.includes(RolesEnum.ADMIN)) {
      className += "bg-purple-600";
    } else if (Roles.includes(RolesEnum.NURSE)) {
      className += "bg-blue-600";
    } else if (Roles.includes(RolesEnum.DOCTOR)) {
      className += "bg-yellow-500 text-black";
    }
    return className;
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 px-2 py-2 text-sm font-semibold text-gray-300 border-b border-white/10">
        <div>No</div>
        <div>User Name</div>
        <div>First Name</div>
        <div>Last Name</div>
        <div>Created At</div>
        <div className="flex justify-center">Roles</div>
        <div>Operations</div>
      </div>
      {usersList.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-2 px-2 h-12 border-b border-white/5 hover:bg-white/10 transition duration-200"
        >
          <div className="flex items-center text-gray-300">{index + 1}</div>
          <div className="flex items-center font-medium text-gray-300">
            {user.userName}
          </div>
          <div className="flex items-center text-gray-300">
            {user.firstName}
          </div>
          <div className="flex items-center text-gray-300">
            {user.lastName}
          </div>
          <div className="flex items-center text-gray-300">
            {moment(user.createdAt).format("YYYY-MM-DD | HH:mm")}
          </div>
          <div className="flex justify-center items-center">
            <span className={RoleClassNameCreator(user.roles)}>
              {user.roles}
            </span>
          </div>
          <div className="flex items-center">
            <Button
              label="Update Role"
              onClick={() =>
                navigate(`/dashboard/update-role/${user.userName}`)
              }
              type="button"
              variant="primary"
              disabled={
                !isAuthorizedForUpdateRole(
                  loggedInUser!.roles[0],
                  user.roles[0]
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTableSection;
