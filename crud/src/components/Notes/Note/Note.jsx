import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './Note.css';

const useStyles = makeStyles({
    delete: {
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      border: '1px solid red',
      color: 'red',
      backgroundColor: 'white',
      borderRadius: '100%',
      padding: '8px',
      cursor: 'pointer',
      "&:hover": {
        backgroundColor: '#f0f2f5'
      }
    },
  });


export default function Note(props) {
    const deleteNote = props.handleDelete;
    const id = props.id;
    const content = props.content;

    const classes = useStyles();

    return (
        <div className="note">
            <IconButton 
                className = {classes.delete}
                onClick={() => deleteNote(id)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
            <p className="note__content">{content}</p>
        </div>
    )
}

Note.propTypes = {
    deleteNote: PropTypes.func,
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
}