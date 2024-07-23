import { Button, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types"
const ModalComponent = ({ SetShowModal, ShowModal, HandelDeleteUser }) => {

    return (
        <div>

            <Modal show={ShowModal} size="md" onClose={() => SetShowModal(false)} popup >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete Your account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={HandelDeleteUser}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => SetShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
ModalComponent.propTypes = {
    SetShowModal: PropTypes.func,
    HandelDeleteUser: PropTypes.func,
    ShowModal: PropTypes.bool,
}
export default ModalComponent