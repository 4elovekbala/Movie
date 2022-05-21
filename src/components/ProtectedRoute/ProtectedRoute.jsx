import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
   const { success } = useSelector(state => state.user);
   
   if(!success){
      return <Navigate to="/" replace />
   }

   return children;
}

export default ProtectedRoute;