import React from 'react';
import './App.css';
import axios from 'axios'
import Panel from './components/panel'
import Header from './components/header'
var defdata = { SEASON_1: 0, SEASON_2: 0, SEASON_3: 1, SEASON_4: 0, TEMP: 0.497, HOLIDAY: 0, HOUR: 11 }
var data=defdata
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pred: '',
            data: data,
        }
    }

    clickHandler = (name,) => {
        const temps=['0c','10c','20c','40c']
        const hours = ['8am','10am','12pm','16pm']
        if (name === 'reset') {
            data=defdata
            //we have to ensure that when one season is 1 the rest are 0
        }else if (name === 'spring') {
            data = {...data, SEASON_1: 1, SEASON_2: 0, SEASON_3: 0, SEASON_4: 0}
        } else if (name === 'summer') {
            data = {...data, SEASON_1: 0, SEASON_2: 1, SEASON_3: 0, SEASON_4: 0}
        } else if (name === 'fall') {
            data = {...data, SEASON_1: 0, SEASON_2: 0, SEASON_3: 1, SEASON_4: 0}
        } else if (name === 'winter') {
            data = {...data, SEASON_1: 0, SEASON_2: 0, SEASON_3: 0, SEASON_4: 1}
        }else if(temps.includes(name)){
            data={...data,TEMP:(parseFloat(name.slice(0,2))+8)/47}
        } else if (name === 'holiday') {
            const HOLIDAY=data['HOLIDAY']===0? 1 : 0
            console.log(HOLIDAY)
            data = { ...data, HOLIDAY: HOLIDAY}
        }else if(hours.includes(name)){
            data={...data,HOUR:parseFloat(name.slice(0,-2))}
        }

        axios.post('http://127.0.0.1:5000', {data })
            .then((resp) => {
                const pred =  resp.data.res
                this.setState({pred})})
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:5000', {data })
            .then((resp) => {
                const pred =  resp.data.res
                this.setState({pred})})
    }

    render() {
        return (
            <div className = "App">
            <Header/>
            <Panel clickHandler = { this.clickHandler } result = { this.state.pred}values={data}/>
            </div>
        );
    }
}
export default App;