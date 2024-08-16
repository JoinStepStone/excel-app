import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const renderTooltip = (props, msg) => (
    <Tooltip id="info-tooltip" {...props}>
      {msg}
    </Tooltip>
  );

export const Tooltop = ({ msg, className }) => {
    return <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => renderTooltip(props, msg)}
    >
        <FontAwesomeIcon icon={faInfoCircle} className={className} /> 
    </OverlayTrigger>
}
