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
/*   optionsColor() {
    let options = document.querySelectorAll('.index-option');
    options.style.backgroundColor = 'yellow';
          
  } */

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

    // check if there are spells for the class
    let spellsSelector
    if (this.state.spellListByClass.length < 2) {
      spellsSelector = <p className='p-no-spells'>-This class has no spells-</p>
    } else {
      spellsSelector = (<select size='10' onChange={()=>this.bringSpellInfo()} className='index-spells select'>
      {spellsByClass.map((item, i) => <option key={i} className='index-option' /* onClick={()=> this.optionsColor()} */>{item.name}</option>)}
    </select>);
    }

    return (
      <article className='article'>
        <section className='select-section'>
        <select size='10' onChange={()=>this.bringSpellListByClass()} className='index-classes select'>
          {classes.map((item, i) => <option key={i} className='index-option'>{item.name}</option>)}
        </select>
        {spellsSelector}
        </section>
        <section className='info-section'>
          <h3>{this.state.spellToShow.name}</h3>
          <p className='pInfo'>{this.state.spellToShow.desc}</p>
        </section>
        


      </article>
    )
  }
}

export default SpellsIndex