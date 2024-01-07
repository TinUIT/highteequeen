import "./Modal3.css";


const Modal3 = ({ openModal, content, onCancel, onYes,CancelShow=true,style,stylebtn }) => {
  // const [ShowYes, setShowYes] = useState(quantity);

  return (
    <>
      {openModal && (
        <div className="container-modal-ct" style={style}>
          <div className="wrapper-modal">
            <button onClick={onCancel} className="modal-btn">
              <i class="fa fa-close"></i>
            </button>
            <p className="modal-description">{content}</p>
            <div className="modal-diff-button" style={stylebtn}>
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

export default Modal3;