import React from 'react';

const ConfirmationModal = ({title,closeModal,modalData,deleteConfirm}) => {
    return (
        <div>
           
            <input type="checkbox" id="confirmation-modal" className="modal-toggle bg-base-100" />
            <div className="modal ">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">This data will not be recover!</p>
                    <div className="modal-action">
                        <label onClick={()=>deleteConfirm(modalData)} htmlFor="confirmation-modal" className="btn">Yes</label>
                        <button onClick={closeModal} className='btn btn-outline bg-black-100' >No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;