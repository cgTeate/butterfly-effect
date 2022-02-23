import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";

//passing type from App.jsx to Home.jsx
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  //called axios to get data
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,})

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            //add headers with Token to verify
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        console.log(res);
        //set the list to react page
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
       {/* pass list of movies into List.jsx
       Note: if there is no genre and type, get 10 random movies, 
       if there is type, display 10 diff type movies
       if there is genre + type, display 10  */}
      {lists.map((list) => (
        <List list={list} key = {list._id} />
      ))}
      <Footer className = "footer"/>
    </div>
  );
};

export default Home;
