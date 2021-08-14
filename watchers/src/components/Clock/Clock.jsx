import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './Clock.css';

const useStyles = makeStyles({
    delete: {
      border: '1px solid green',
      color: 'green',
      backgroundColor: 'white',
      borderRadius: '100%',
      padding: '8px',
      cursor: 'pointer',
      "&:hover": {
        backgroundColor: '#f0f2f5'
      }
    },
  });

export default function Clock(props) {
    const id = props.id;
    const title = props.title;
    const hour = props.hour;
    const deleteClock = props.deleteClock;

    const today = new Date();
    let hoursStyle, minutesStyle, secondsStyle;
    const rotation = (h, m, s) => {
        hoursStyle = {
            transform: `rotate(${h}deg)`
        };
        minutesStyle = {
            transform: `rotate(${m}deg)`
        }
        secondsStyle = {
            transform: `rotate(${s}deg)`
        }
    };

    let h = ((today.getHours()+(+hour)) % 12) + today.getMinutes() / 59;
    let m = today.getMinutes();
    let s = today.getSeconds();

    h *= 30;
    m *= 6;
    s *= 6;

    rotation(h, m, s);

    const classes = useStyles();
  
    return (
        <div className="clock">
            <div className="clock__top">
                <p className="capital">{title}</p>
                <IconButton 
                    className = {classes.delete}
                    onClick={() => deleteClock(id)}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton> 
            </div>
            <div className="clock__watch">
                <div className="hand hours" style={hoursStyle}></div>
                <div className="hand minutes" style={minutesStyle}></div>
                <div className="hand seconds" style={secondsStyle}></div>
                <div className="point"></div>
                <div className="marker">
                    <span className="marker__1"></span>
                    <span className="marker__2"></span>
                    <span className="marker__3"></span>
                    <span className="marker__4"></span>
                </div>
            </div>
        </div>        
    )
}

Clock.propTypes = {
    id:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    hour:PropTypes.string.isRequired,
    deleteClock:PropTypes.func.isRequired
};
