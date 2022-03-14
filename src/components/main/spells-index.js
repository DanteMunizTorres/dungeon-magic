import React, {Component} from 'react'
import './spells-index.css'
import PInfo from './pInfo'

class SpellsIndex  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      spellToShow: '',
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
    /* console.log('me actualice'); */
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
    let selectSpell = document.querySelector('.index-spells')
    let classSelected = this.state.classes.find(oneClass => oneClass.name === selectClass.value)

      fetch('https://www.dnd5eapi.co' + classSelected.url + '/spells')
      .then(response => response.json())
      .then(data => {
        this.setState({spellListByClass: data.results})
        this.setState({spellToShow: ''})
        selectSpell.value = null
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

    // check if there are spells for the class
    let spellsSelector
    if (this.state.spellListByClass.length < 2) {
      spellsSelector = <p className='p-no-spells'>-This class has no spells-</p>
      
    } else {
      spellsSelector =  <select size='10' onChange={()=>this.bringSpellInfo()} className='index-spells select'>
                          {spellsByClass.map((item, i) => <option key={i} className='index-option' /* onClick={()=> this.optionsColor()} */>{item.name}</option>)}
                        </select>;
    }

    //spells info p


    //ritual 
    let ritual
    if (this.state.spellToShow.ritual === true) {
      ritual = <PInfo className='pInfo-advise' info=''><span>Ritual</span></PInfo>
    }

    //concentration
    let concentration
    if (this.state.spellToShow.concentration === true) {
      concentration = <PInfo info=''><span>Concentration</span></PInfo>
    }
    //damage
    let damage
    let damageInfo
    if (this.state.spellToShow.damage && this.state.spellToShow.level > 0) {
      // console.log(this.state.spellToShow.damage)
      let diceDamage = Object.values(this.state.spellToShow.damage.damage_at_slot_level)[0]
      let damageType
        if (this.state.spellToShow.damage.damage_type) {
          damageType = this.state.spellToShow.damage.damage_type.name
        } else {
          damageType = 'affects'
        }
      damageInfo = `Damage: ${damageType}, ${diceDamage}`
      damage = <PInfo info={damageInfo}/>
    } else if (this.state.spellToShow.damage) {
      let diceDamage = Object.values(this.state.spellToShow.damage.damage_at_character_level)[0]
      let damageType = this.state.spellToShow.damage.damage_type.name
      damageInfo = `${damageType}, ${diceDamage}`
      damage = <PInfo info={damageInfo}><strong>Damage: </strong></PInfo>
    }
    // area_of_effect
    let area
    if (this.state.spellToShow.area_of_effect) {
      let type = this.state.spellToShow.area_of_effect.type
      let size = this.state.spellToShow.area_of_effect.size
      let areaText = `${type}, ${size} feet`
      area = <PInfo info={areaText}><strong>Area of effect: </strong></PInfo>
    }
    // dc
    let dc
    if (this.state.spellToShow.dc) {
      let name = this.state.spellToShow.dc.dc_type.name
      let succes = this.state.spellToShow.dc.dc_success
      let dcText = `${name}, effect is ${succes}`
      dc = <PInfo info={dcText} ><strong>DC: </strong></PInfo>
    }
    let spellInfo
    if (this.state.spellToShow === '') {
      spellInfo = <p className='p-no-spells p-no-info'>-There is no info to show-</p>
    } else {
      spellInfo = <>
                  <h3 className='info-section__name'>{this.state.spellToShow.name}</h3>
                  <div className='info-section-wrapper'>
                    <div className='info-section-wrapper__stast'>
                      {ritual}
                      <PInfo info={this.state.spellToShow.level}>
                        <strong>Level: </strong>
                      </PInfo>
                      <PInfo info={this.state.spellToShow.range}>
                      <strong>Range: </strong>
                      </PInfo>
                      {concentration}
                      {damage}
                      {area}
                      {dc}
                      <PInfo info={this.state.spellToShow.duration}>
                        <strong>Duration: </strong>
                      </PInfo>
                      <PInfo info={this.state.spellToShow.casting_time}>
                        <strong>Casting time: </strong>
                      </PInfo>                 
                      <PInfo info={this.state.spellToShow.school.name}>
                        <strong>School: </strong>
                      </PInfo>  
                      <PInfo info={`${this.state.spellToShow.components.map(comp => ' ' + comp)}`}>
                      <strong>Components: </strong>
                      </PInfo>  
                    </div>
                    <div className='info-section-wrapper__desc'>
                      <p className='pInfo desc__title'>Description:</p>
                       <p className='pInfo pInfo__desc'>{this.state.spellToShow.desc}</p>
                    </div>
                  </div>
                  </>
    }

    return (
      <article className='main-article'>
        <section className='select-section'>
{/*           <label for='index-classes' className='index-classes__label'>
            -Pick a class-
          </label> */}
          <select placeholder='Select a class' id='index-classes' size='10' onChange={()=> this.bringSpellListByClass()} className='index-classes select'>
            {classes.map((item, i) => <option key={i} className='index-option'>{item.name}</option>)}
          </select>
          {spellsSelector}
        </section>

        <section className='info-section'>
          {spellInfo}
        </section>
        


      </article>
    )
  }
}

export default SpellsIndex