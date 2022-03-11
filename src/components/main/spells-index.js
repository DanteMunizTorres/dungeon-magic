import React, {Component} from 'react'
import './spells-index.css'

class SpellsIndex  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      spellToShow: 'algo',
      classes: '',
      spellListByClass: ''
    }
  }
  componentDidMount () {
    //llamado a api spells
    fetch('https://www.dnd5eapi.co/api/spells')
      .then(response => response.json())
      .then(data => {
        this.setState({data: data.results})
      })
      .catch(error => console.log('Hubo un error en apiCall: ' + error))
      
    //llamado a api clases
    fetch('https://www.dnd5eapi.co/api/classes')
      .then(response => response.json())
      .then(data => {
        this.setState({classes: data.results})
      })
      .catch(error => console.log('Hubo un error en apiCall: ' + error))


  }

  

  componentDidUpdate () {
    console.log('me actualice');
  }

  bringSpellInfo(){
    let select = document.querySelector('.index-spells')
    let spellSelected = this.state.data.find(spell=> spell.name === select.value)
      fetch('https://www.dnd5eapi.co' + spellSelected.url)
      .then(response => response.json())
      .then(data => {
        this.setState({spellToShow: data})
      })
  }
  bringSpellListByClass() {
    let selectClass = document.querySelector('.index-classes')
    let classSelected = this.state.classes.find(oneClass => oneClass.name === selectClass.value)
      fetch('https://www.dnd5eapi.co' + classSelected.url + '/spells')
      .then(response => response.json())
      .then(data => {
        this.setState({spellListByClass: data.results})
      })
  }

  render () {
    let spellsByClass
      if (this.state.spellListByClass === '') {
        spellsByClass = ['Loading...']
      } else {
        spellsByClass = this.state.spellListByClass
      }
    let classes
    if (this.state.classes === '') {
      classes = ['Loading...']
    } else {
      classes = this.state.classes
    }    
    return (
      <>
        <select size='10' onChange={()=>this.bringSpellListByClass()} className='index-classes'>
          {classes.map((item, i) => <option key={i} className='index-option'>{item.name}</option>)}
        </select>

        <select size='10' onChange={()=>this.bringSpellInfo()} className='index-spells'>
          {spellsByClass.map((item, i) => <option key={i} className='index-option'>{item.name}</option>)}
        </select>

        <h3>{this.state.spellToShow.name}</h3>
        <p className='pInfo'>{this.state.spellToShow.desc}</p>


      </>
    )
  }
}

export default SpellsIndex