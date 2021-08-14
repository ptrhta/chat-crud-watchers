import React from 'react';
import uuid from 'react-uuid'
import Clock from './Clock/Clock.jsx';

import './Watchers.css';

class Watchers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            title: '',
            hour: '',
            clocks: []
        }
    }

    handleDataChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        const clock = {
            id: uuid(),
            title: this.state.title,
            hour: this.state.hour
        }

        this.setState({
            clocks: [...this.state.clocks, clock],
            title: '',
            hour: ''
        })
    }

    componentDidMount() {
        this.time = setInterval(() => {
            this.setState({
                time: new Date(Date.now() + this.state.hour*60*60*1000).toLocaleTimeString()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.time);
    }

    deleteClock = (id) => {
        this.setState({
            clocks: this.state.clocks.filter(clock => clock.id !== id)
        });
    }

    render() {
        return (
            <div className="watchers">
              <form 
                className="watchers__form"
                onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    value={this.state.title} 
                    onChange={this.handleDataChange} 
                    placeholder="Город"
                    className="watchers__input"
                />
                <input 
                    type="number" 
                    name="hour" 
                    value={this.state.hour} 
                    onChange={this.handleDataChange} 
                    placeholder="Временная зона"
                    className="watchers__input"
                />
                <button 
                    type="submit" 
                    className="watchers__add"
                >
                    Добавить
                </button>
              </form>     
              <div className="watchers__clocks">
                {this.state.clocks.map((element) => 
                    <Clock 
                        key={uuid()} 
                        id={element.id}
                        title={element.title} 
                        hour={element.hour} 
                        deleteClock={this.deleteClock}                                            
                    />)
                }
              </div>
            </div>
        )
    }
}

export default Watchers