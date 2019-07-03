import React from 'react'
import Button from './buttons'
import './panel.css'

const Panel = (props) => {
    const { clickHandler, result,values } = props
    const style = {
        'backgroundColor':'gray',
        'color':'white',
        'position':'fixed',        
        'left':0,
        'width':'100%',
        'height':'88%',
        'border':'1px solid',
        'font-size':'20px'
        
    }
    const temp=parseInt((values['TEMP']*47)-8)
    const hours = values['HOUR']
    const holiday = values['HOLIDAY']? "Holiday":"Not Holiday"
    const season = values['SEASON_1']? 'spring':values['SEASON_2']? 'summer':values['SEASON_3']?'fall':'winter'
    return (
    <div className = "container" >
        <table className='table1' style={style}>
            <thead>
            </thead>
            <tbody>
                <tr className="results" align ='center'>
                    <td colSpan='4' color='blue'>
                        Predicted Bikes: {result} 
                    </td>
                </tr>
                <tr className="selections">
                    <td  className='title'>Selections</td>
                    <td> Season: {season}</td>
                    <td>Time: {hours}</td>
                    <td>Temp: {Math.ceil(temp)}C</td>
                    <td>Day: {holiday}</td>
                </tr>
                <tr colSpan='4'align ='center'>
                    <td className='title'>Seasons</td>
                    <td><Button name = "fall" clickHandler = { clickHandler }/> </td>
                    <td><Button name = "summer" clickHandler = { clickHandler }/> </td>
                    <td><Button name = "spring" clickHandler = { clickHandler }/></td>
                    <td><Button name = "winter" clickHandler = { clickHandler } /> </td>
                </tr>
                <tr className='hours' colSpan='4'align ='center'>     
                    <td className='title'>Hours</td>                         
                    <td><Button name = '8am'  clickHandler = { clickHandler }/></td>
                    <td> <Button name = '10am' clickHandler = { clickHandler }/></td>
                    <td> <Button name = '12pm' clickHandler = { clickHandler }/></td>
                    <td><Button name = '16pm' clickHandler = { clickHandler }/></td>
                </tr>
            
                <tr colSpan='4'align ='center' >
                    <td className='title'>Temperature</td>
                    <td><Button name = '0c' clickHandler = { clickHandler }/></td>
                    <td><Button name = '10c' clickHandler = { clickHandler }/></td>
                    <td><Button name = '20c' clickHandler = { clickHandler }/></td>
                    <td><Button name = '40c' clickHandler = { clickHandler }/></td>
                   
                </tr>  
                <tr colSpan='4'align ='center'>
                    <td className='title'>Days</td>
                    <td><Button name = 'holiday' clickHandler = { clickHandler } /></td>
                </tr>
                <tr colSpan='4'align ='center'>
                    <td><Button name ='reset' clickHandler = {clickHandler}/></td>
                </tr>
                
            
            </tbody>
        </table>

        </div>
    )
}
export default Panel