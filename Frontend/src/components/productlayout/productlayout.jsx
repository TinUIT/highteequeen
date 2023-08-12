import './productlayout.css';
import logoName from '../../assets/SonA12.png';






function productlayout  (props) {
  return(
    <div className="wrappperProduct" style={{ backgroundImage: `url('${props.imgProduct}')` }} >
     
      <button className='ProductName'> {props.nameProduct} </button>
     
     

    </div>
  );
}
  export default productlayout;