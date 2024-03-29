import "./Modal2.css";


const Modal2 = ({ openModal, content, onCancel, onYes,CancelShow=true,style,stylebtn }) => {
  // const [ShowYes, setShowYes] = useState(quantity);

  return (
    <>
      {openModal && (
        <div className="container-modal" style={style}>
          <div className="wrap-modal">
            <button onClick={onCancel} className="modal-btn">
              <i class="fa fa-close"></i>
            </button>
            <p className="modal-desc">{content}</p>
            <div className="modal-diff-btnn" style={stylebtn}>
              { CancelShow?( <button onClick={onCancel} className="btn-action cancel">
                Cancel
              </button>):<></>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal2;