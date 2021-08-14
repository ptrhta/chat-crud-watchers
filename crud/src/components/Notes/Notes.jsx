import React from 'react';
import uuid from 'react-uuid';
import Note from './Note/Note.jsx';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import SendIcon from '@material-ui/icons/Send';

import './Notes.css';

const styles = (theme) => ({
    send: {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        height: 'fit-content',
        marginLeft: '16px',
        border: '1px solid blue',
        color: 'blue',
        backgroundColor: 'white',
        borderRadius: '100%',
        padding: '8px',
        cursor: 'pointer',
        "&:hover": {
          backgroundColor: '#f0f2f5'
        }
    },
    update: {
        height: 'fit-content',
        marginLeft: '16px',
        border: '1px solid green',
        color: 'green',
        backgroundColor: 'white',
        borderRadius: '100%',
        padding: '8px',
        cursor: 'pointer',
        "&:hover": {
          backgroundColor: '#f0f2f5'
        }
    }
  });

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            valueNote: ''
        }
    }

    updateNotes = () => {
        fetch('http://localhost:7777/notes')
            .then(response => response.json())
            .then(notes => this.setState({ notes: notes }));
    }

    deleteNote = (id) => {
        fetch(`http://localhost:7777/notes/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
           this.updateNotes()
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
            id: uuid(),
            content: this.state.valueNote
        }

        fetch('http://localhost:7777/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)          
        })
        .then(() => {
            this.updateNotes();
        })
        .then(() => {
            this.setState({ valueNote: '' });
        });
    }

    handleChange = (e) => {
        this.setState({ valueNote: e.target.value });
    }

    componentDidMount() {
        this.updateNotes();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="notes">
                <div className="notes__top row">
                    <h1 className="notes__title">Notes</h1>
                        <IconButton 
                            className = {classes.update}
                            onClick={this.updateNotes}
                            aria-label="update"
                        >
                            <UpdateIcon />
                        </IconButton>
                </div>
                <div className="notes__list">
                {
                    this.state.notes.map((note) =>
                        <Note 
                            id={note.id}
                            content={note.content}
                            key={uuid()}
                            handleDelete={this.deleteNote} 
                        />
                    )
                }
                </div>
                <form onSubmit={this.handleSubmit} className="notes__form">
                    <textarea 
                        className="notes__textarea"
                        placeholder="New note" 
                        value={this.state.valueNote} 
                        onChange={this.handleChange}
                    />
                    <IconButton 
                            type="submit"
                            className = {classes.send}
                            aria-label="send"
                        >
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(Notes);