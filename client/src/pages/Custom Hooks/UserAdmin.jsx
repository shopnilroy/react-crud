import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";


const useAdmin = () => {
    const {user}=useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
   
    const {data: isAdmin,} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin;
        }
    })
    return [isAdmin ]
}
export default useAdmin;