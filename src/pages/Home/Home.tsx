import Search from "../../components/SearchResults/Search"
import Product from "../../components/products/Product"
import MyCarousel from "../../components/slider/Swiper"
import "./Home.css"

const Home = () => {


  return (
    <div className="home-container">
      <MyCarousel />
      <Product />
    </div>
  )
}

export default Home