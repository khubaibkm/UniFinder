import "./living.css";
import DrawerAppBarCat from "../../components/navCat";
import Footer from "../../components/footer";

export default function Living() {
  return (
    <div className="listings">
          <DrawerAppBarCat/>      
      <div className="list">
        <p style={{ marginBottom: "13px", fontSize: "13px" }}>
          CHECK OUT OUR LISTINGS
        </p>
        <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
          Explore the Living <br />
          Categories.
        </p>
      </div>

      
      <div id="contact us">
          <Footer />
        </div> 
    </div>
        
        );
}

