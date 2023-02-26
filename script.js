const characters = [
  {
      id: 1,
      name: 'Obi-Wan',
      img: './images/obi-wan.jpg',
      health: 100
  },
  {
      id: 2,
      name: 'Luke Sky',
      img: './images/luke-skywalker.jpg',
      health: 110
  },
  {
      id: 3,
      name: 'Darth Sidious',
      img: './images/darth-sidious.png',
      health: 120
  },
  {
      id: 4,
      name: 'Darth Maul',
      img: './images/darth-maul.jpg',
      health: 130
  }
]
const characterSection = document.querySelector("#characters-section")
const selectedSection = document.querySelector('#selected-character-section')
const defenderSection = document.querySelector('#available-to-attack-section')
const actionSection = document.querySelector("#action .character-section")
const gameInfo = document.querySelector('#game-message')
const attackButton = document.querySelector('#attack-button')
attackButton.addEventListener('click', () => {
  if (attacker !== '' && defender !== '') {
      getAttack()
  }
})
let attacker = ''
let defender = ''
let defenderList = []
function getInfo(item) {
  let chName = document.createElement("h2")
  chName.className = 'character-name'
  chName.innerHTML = item.name
  let chImg = document.createElement('img')
  chImg.src = item.img
  chImg.className = 'character-image'
  let chHealth = document.createElement('p')
  chHealth.innerHTML = item.health
  chHealth.className = 'character-health'
  let character = document.createElement('div')
  character.className = 'character'
  character.append(chName, chImg, chHealth)
  return character
}
function getDom(characters) {
  characters.forEach(item => {
      let character = getInfo(item)
      characterSection.append(character)
      character.addEventListener('click', () => {
          characterSection.innerHTML = ''
          attacker = item
          displaySelect(attacker)
          displayDef(attacker, characters)
      })
  })
}

function displaySelect(attacker) {
  let character = getInfo(attacker)
  character.setAttribute('id', 'selected-character')
  selectedSection.innerHTML = '<div class="section-title">Your Character</div>'
  selectedSection.append(character)
}
function displayDef(character, list) {
  defenderList = list.filter(item => item.id !== character.id)
  defenderSection.innerHTML = '<div class="section-title">Enemies Available To Attack</div>'
  defenderList.forEach(item => {
      let character = getInfo(item)
      defenderSection.append(character)
      character.addEventListener('click', () => {
          if (defender === '') {
              defender = item
              displayDef(item, defenderList)
              getDefender(item)
          }
      })
  })
}
function getDefender(defender) {
  let character = getInfo(defender)
  actionSection.innerHTML = '<div class="section-title">Defender</div>'
  actionSection.append(character)
}
function getAttack() {
  let attackerPoint = Math.floor(Math.random() * 40)
  let defenderPoint = 0
  if (defender.health > attacker.health) {
      defenderPoint = Math.floor(Math.random() * ((attackerPoint + 20) - attackerPoint) + attackerPoint);
  }
  else {
      defenderPoint = Math.floor(Math.random() * attackerPoint);
  }
  gameInfo.innerHTML = `
  <p>You attacked ${defender.name} for ${attackerPoint} damage</p>
  <p>${defender.name} attacked you for ${defenderPoint} damage</p>

  `
  defender.health -= attackerPoint
  attacker.health -= defenderPoint
  if (defender.health > 0 && attacker.health > 0) {
      getDefender(defender)
      displaySelect(attacker)
  }
  else if (defender.health < 0 && attacker.health > 0) {
      actionSection.innerHTML = `
      <div class="section-title">Defender</div>
      <p>You have defeated ${defender.name},you can choose to fight another enemy</p>
      `
      defender = ''
  }
  else {
      attacker = ''
      selectedSection.innerHTML = ''
      actionSection.innerHTML = `
      `
  }

}

getDom(characters)