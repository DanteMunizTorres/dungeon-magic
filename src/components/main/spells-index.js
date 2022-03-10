import React, {Component} from 'react'
import './spells-index.css'

class SpellsIndex  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      spellSelected: 'algo'
    }
  }
  componentDidMount () {
    fetch('https://www.dnd5eapi.co/api/spells')
      .then(response => response.json())
      .then(data => {
        this.setState({data: data.results})
      })
      .catch(error => console.log('Hubo un error en apiCall: ' + error))
  }

  componentDidUpdate () {
    console.log('me actualice');
  }

  bringSpellInfo(){
    let select = document.querySelector('.index')
      this.setState({spellSelected: this.state.data.find(spell=> spell.name === select.value)})
    }

  render () {
    let content
      if (this.state.data === '') {
        content = ['Loading...']
      } else {
        content = this.state.data
      }
    return (
      <>

        <select size='10' onChange={()=>this.bringSpellInfo()} className='index'>
          {content.map((item, i) => <option key={i} className='index-option'>{item.name}</option>)}
        </select>

        <h3>{this.state.spellSelected.name}</h3>
        <p className='pInfo'></p>

      </>
    )
  }
}

export default SpellsIndex