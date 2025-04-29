import HomePage from "@/features/home/Home";
import { pageTitle } from "@/utils/pageTitle";

const Home = () => {
  pageTitle("الرئيسية");
  return <HomePage />;
};

export default Home;
