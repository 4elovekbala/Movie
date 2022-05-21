import { useSelector } from "react-redux";

const User = () => {
   const { username } = useSelector(state => state.user);


   return <h1>Hello, {username}</h1>;
}

export default User;