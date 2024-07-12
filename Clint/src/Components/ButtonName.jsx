import { Button } from "flowbite-react"

import PropTypes from "prop-types"
const ButtonName = ({ name }) => {
    return (
        <Button>
            {name}
        </Button>
    )
}
ButtonName.propTypes = {
    name: PropTypes.node,
}
export default ButtonName