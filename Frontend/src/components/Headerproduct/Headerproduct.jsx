import './Headerproduct.css';
import logoName from '../../assets/SonA12.png';

function Headerproduct(props) {
  const { background, nameProduct, expanded, onClick } = props;

  return (
    <div
      className={`HeaderProduct ${expanded ? 'expanded' : ''}`}
      style={{ backgroundImage: `url(${background})` }}
      onClick={onClick}
    >
      <button className="HeaderProductName">{nameProduct}</button>
    </div>
  );
}

export default Headerproduct;