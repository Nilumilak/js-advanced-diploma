!function(){"use strict";function e(e,t,s){const a={};for(let i=0;i<t;i++)s[`row${i}`].includes(e.position)&&(a.row=i),s[`column${i}`].includes(e.position)&&(a.column=i);return a}function t(e,t,s){let i=0;for(let r=0;r<s;r++)for(let r=0;r<s;r++){if(i==e.position)return a(e,r,s,e.character[t]);i++}}function s(e){const t=[];for(const s of e)t.push(s.position);return t}function a(e,t,s,a){const i=[];let r=e.position-a*(s+1),l=2*a;t<a?(r+=a-t,l-=a-t):s-t-1<a&&(l-=a-(s-t-1));for(let t=0;t<=2*a;t++){for(let t=r;t<=r+l;t++)t!=e.position&&i.push(t);r+=s}return i}class i{constructor(){this.boardSize=8,[this.tileMap,this.rowsColumnsMap]=function(e){const t={},s={};let a=0;for(let i=0;i<e;i++)for(let r=0;r<e;r++)t[a]=0==i&&0==r?"top-left":0==i&&r==e-1?"top-right":i==e-1&&0==r?"bottom-left":i==e-1&&r==e-1?"bottom-right":0==i?"top":i==e-1?"bottom":0==r?"left":r==e-1?"right":"center",null==s[`row${i}`]?s[`row${i}`]=[a]:s[`row${i}`].push(a),null==s[`column${r}`]?s[`column${r}`]=[a]:s[`column${r}`].push(a),a++;return[t,s]}(this.boardSize),this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const a=document.createElement("div");a.classList.add("cell","map-tile",`map-tile-${t=e,s=this.tileMap,s[t]}`),a.addEventListener("mouseenter",(e=>this.onCellEnter(e))),a.addEventListener("mouseleave",(e=>this.onCellLeave(e))),a.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(a)}var t,s;this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const s of e){const e=this.boardEl.children[s.position],a=document.createElement("div");a.classList.add("character",s.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=s.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${s.character.health}%`,i.appendChild(r),a.appendChild(i),e.appendChild(a)}var t}updateScore(e){const t=e.points,s=e.maxPoints,a=document.querySelector("#score"),i=document.querySelector("#max-score");a.innerHTML=`Score: ${t}`,i.innerHTML=`Max Score: ${s}`}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((s=>{const a=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(()=>{a.removeChild(i),s()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}var r="prairie",l="desert",n="arctic",o="mountain";class h{constructor(e,t=0,s=0,a=50,i="generic",r=!1){if(this.level=e,this.attack=t,this.defence=s,this.health=a,this.type=i,"Character"===new.target.name)throw Error("Cannot create class Character");r||Array(this.level-1).fill(0).forEach((e=>this.upgradeStats()))}attackTarget(e){const t=Math.floor(Math.max(this.attack-e.defence,.1*this.attack));return e.health-=t,t}upgradeStats(){this.attack=Math.floor(Math.max(this.attack,this.attack*((80+this.health)/100))),this.defence=Math.floor(Math.max(this.defence,this.defence*((80+this.health)/100))),this.health=Math.floor(Math.min(100,this.health+80))}levelUp(){this.level<4&&(this.level++,this.upgradeStats())}}class c{constructor(e,t){if(!(e instanceof h))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}class d extends h{constructor(e,t=25,s=25,a=50,i=!1){super(e,t,s,a,"bowman",i),this.maxMoves=2,this.maxRange=2}}class m extends h{constructor(e,t=10,s=10,a=50,i=!1){super(e,t,s,a,"daemon",i),this.maxMoves=1,this.maxRange=4}}class u extends h{constructor(e,t=10,s=40,a=50,i=!1){super(e,t,s,a,"magician",i),this.maxMoves=1,this.maxRange=4}}class g extends h{constructor(e,t=40,s=10,a=50,i=!1){super(e,t,s,a,"swordsman",i),this.maxMoves=4,this.maxRange=1}}class f extends h{constructor(e,t=40,s=10,a=50,i=!1){super(e,t,s,a,"undead",i),this.maxMoves=4,this.maxRange=1}}class C extends h{constructor(e,t=25,s=25,a=50,i=!1){super(e,t,s,a,"vampire",i),this.maxMoves=2,this.maxRange=2}}class v{constructor(){this.characters=new Set}add(e){if(this.characters.has(e))throw new Error(`Character ${e} is already in the team`);this.characters.add(e)}}function L(e,t,s){const a=new v,i=function*(e,t){for(;;){const s=e[Math.floor(Math.random()*e.length)];yield new s(Math.ceil(Math.random()*t))}}(e,t);for(let e=0;e<s;e++)a.add(i.next().value);return a}var P="auto",p="pointer",S="crosshair",T="not-allowed";class y{#e={first:"first",second:"second"};constructor(e=this.#e.first,t=!0,s=0,a=0,i=[],r=[],l=void 0,n=[],o=1){this.turn=e,this.running=t,this.points=s,this.maxPoints=a,this.firstTeamList=i,this.secondTeamList=r,this.currentLevel=l,this.nextLevelsList=n,this.currentLevelNumber=o}changeTurn(){this.turn==this.#e.first?this.turn=this.#e.second:this.turn=this.#e.first}getPoint(){this.points++,this.points>this.maxPoints&&(this.maxPoints=this.points)}refreshPoints(){this.points=0}static from(e){const{turn:t,running:s,points:a,maxPoints:i,firstTeamList:r,secondTeamList:l,currentLevel:n,nextLevelsList:o,currentLevelNumber:h}=e;return new y(t,s,a,i,r,l,n,o,h)}}const w=new i;w.bindToDOM(document.querySelector("#game-container"));const b=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage),E=new class{#t={bowman:d,daemon:m,magician:u,swordsman:g,undead:f,vampire:C};#s=void 0;#a=[o,n,l];#i=void 0;#r=[5,4,3];constructor(e,t){this.gameState=new y,this.gamePlay=e,this.stateService=t,this.allCharacters={},this.firstTeamAllowedCharacters=[d,g,u],this.secondTeamAllowedCharacters=[m,f,C]}get currentLevel(){return this.#i}get getNextLevelType(){return this.#i=this.#a.pop(),this.#i}get nextLevelsList(){return this.#a}setlevelTypes(e){this.#a=e}refreshLevels(){this.#a=[o,n,l]}get getNextEnemiesAmount(){return this.#r.pop()}refreshEnemies(){this.#r=[5,4,3]}get allCharactersList(){let e=[];for(const t in this.allCharacters)e=e.concat(this.allCharacters[t]);return e}get characterSelected(){return this.#s}set characterSelected(e){this.#s=e}init(){this.startNewGame(),this.setHandlers()}initPositionTeam(e,t){const s=[];for(const i of e.characters){const e=(a=t,a.splice(Math.floor(Math.random()*a.length),1))[0];s.push(new c(i,e))}var a;return s}setHandlers(){this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.startNewGame.bind(this)),this.gamePlay.addSaveGameListener(this.saveGame.bind(this)),this.gamePlay.addLoadGameListener(this.loadGame.bind(this))}getPositions(){const e=[],t=[];let s=0;for(let a=0;a<this.gamePlay.boardSize;a++)for(let a=0;a<this.gamePlay.boardSize;a++)0!=a&&1!=a||e.push(s),6!=a&&7!=a||t.push(s),s++;return{firstTeamPositionsList:e,secondTeamPositionsList:t}}onCellClick(e){this.gameState.running&&"first"==this.gameState.turn&&(this.cellHasCharacter(e,(a=>{if(s(this.allCharacters.firstTeamPositioned).includes(e)){for(const e of this.allCharactersList)this.gamePlay.deselectCell(e.position);this.gamePlay.selectCell(e),this.characterSelected=a}else if(s(this.allCharacters.secondTeamPositioned).includes(e)&&this.characterSelected&&t(this.characterSelected,"maxRange",this.gamePlay.boardSize).includes(e)){this.gameState.changeTurn();const t=this.characterSelected.character.attackTarget(a.character);this.deleteDeadCharacters(),this.gamePlay.redrawPositions(this.allCharactersList),this.gamePlay.showDamage(e,t).then((()=>this.enemyTurn()))}}))||(this.characterSelected?t(this.characterSelected,"maxMoves",this.gamePlay.boardSize).includes(e)&&(this.gamePlay.deselectCell(this.characterSelected.position),this.characterSelected.position=e,this.gamePlay.selectCell(e),this.gamePlay.redrawPositions(this.allCharactersList),this.gameState.changeTurn(),this.enemyTurn()):i.showError("Empty cell")))}characterTag(e){return`🎖${e.level} ⚔${e.attack} 🛡${e.defence} ❤${e.health}`}cellHasCharacter(e,t,s=this.allCharactersList){for(const a of s)if(a.position==e)return t(a),!0;return!1}onCellEnter(e){this.cellHasCharacter(e,(s=>{this.gamePlay.showCellTooltip(this.characterTag(s.character),e),this.allCharacters.firstTeamPositioned.includes(s)?this.gamePlay.setCursor(p):this.characterSelected&&this.allCharacters.secondTeamPositioned.includes(s)&&(t(this.characterSelected,"maxRange",this.gamePlay.boardSize).includes(s.position)?(this.gamePlay.setCursor(S),this.gamePlay.selectCell(e,"red")):this.gamePlay.setCursor(T))})),this.characterSelected&&t(this.characterSelected,"maxMoves",this.gamePlay.boardSize).includes(e)&&!s(this.allCharactersList).includes(e)&&this.gamePlay.selectCell(e,"green")}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.gamePlay.setCursor(P);for(let t=0;t<this.gamePlay.boardSize;t++)for(let t=0;t<this.gamePlay.boardSize;t++)this.characterSelected&&e!=this.characterSelected.position&&this.gamePlay.deselectCell(e)}enemyTurn(){for(const e of this.allCharacters.secondTeamPositioned){const s=t(e,"maxRange",this.gamePlay.boardSize);if("second"==this.gameState.turn)for(const t of s)if(this.cellHasCharacter(t,(s=>{if(this.allCharacters.firstTeamPositioned.includes(s)){const a=e.character.attackTarget(s.character);this.deleteDeadCharacters(),this.gamePlay.redrawPositions(this.allCharactersList),this.gamePlay.showDamage(t,a),this.gameState.changeTurn()}}),this.allCharacters.firstTeamPositioned))return void("second"==this.gameState.turn&&this.gameState.changeTurn())}"second"==this.gameState.turn&&(this.enemyMove(),this.gamePlay.redrawPositions(this.allCharactersList),this.gameState.changeTurn())}enemyMove(){const a=e(this.allCharacters.firstTeamPositioned[0],this.gamePlay.boardSize,this.gamePlay.rowsColumnsMap),i=e(this.allCharacters.secondTeamPositioned[0],this.gamePlay.boardSize,this.gamePlay.rowsColumnsMap),r=t(this.allCharacters.secondTeamPositioned[0],"maxMoves",this.gamePlay.boardSize),l=s(this.allCharactersList);let n,o;const h=Math.abs(i.row-a.row);if(i.row<a.row)for(let e=1;e<=h;e++)n=this.allCharacters.secondTeamPositioned[0].position+this.gamePlay.boardSize*e,r.includes(n)&&(l.includes(n)||(o=n));else for(let e=1;e<=h;e++)n=this.allCharacters.secondTeamPositioned[0].position-this.gamePlay.boardSize*e,r.includes(n)&&(l.includes(n)||(o=n));o&&(this.allCharacters.secondTeamPositioned[0].position=o);const c=Math.abs(i.column-a.column);if(i.column<a.column)for(let e=1;e<=c;e++)n=this.allCharacters.secondTeamPositioned[0].position+e,r.includes(n)&&(l.includes(n)||(o=n));else for(let e=1;e<=c;e++)n=this.allCharacters.secondTeamPositioned[0].position-e,r.includes(n)&&(l.includes(n)||(o=n));o&&(this.allCharacters.secondTeamPositioned[0].position=o)}deleteDeadCharacters(){for(const e of this.allCharactersList)if(e.character.health<=0){let t=this.allCharacters.firstTeamPositioned.indexOf(e);t>-1?(this.allCharacters.firstTeamPositioned.splice(this.allCharacters.firstTeamPositioned.indexOf(e),1),e==this.characterSelected&&(this.gamePlay.deselectCell(this.characterSelected.position),this.characterSelected=void 0)):(t=this.allCharacters.secondTeamPositioned.indexOf(e),t>-1&&(this.allCharacters.secondTeamPositioned.splice(this.allCharacters.secondTeamPositioned.indexOf(e),1),this.gameState.getPoint(),this.gamePlay.updateScore(this.gameState)))}this.allCharacters.firstTeamPositioned.length||(this.finishGame(),i.showMessage("You Lost!")),this.allCharacters.secondTeamPositioned.length||(this.allCharacters.firstTeamPositioned.forEach((e=>e.character.levelUp())),this.startNextLevel())}startNextLevel(){this.characterSelected=void 0;const e=this.getNextLevelType;if(this.gameState.turn="first",this.gameState.currentLevelNumber++,e){this.gamePlay.drawUi(e);const t=L(this.firstTeamAllowedCharacters,this.gameState.currentLevelNumber,1);this.allCharacters.firstTeamPositioned.forEach((e=>t.characters.add(e.character)));const s=L(this.secondTeamAllowedCharacters,this.gameState.currentLevelNumber,this.getNextEnemiesAmount),a=this.getPositions(),i=this.initPositionTeam(t,a.firstTeamPositionsList),r=this.initPositionTeam(s,a.secondTeamPositionsList);this.allCharacters.firstTeamPositioned=i,this.allCharacters.secondTeamPositioned=r,this.gamePlay.redrawPositions(this.allCharactersList)}else this.finishGame(),i.showMessage("You Won!")}finishGame(){this.gameState.running=!1;let e=0;for(let t=0;t<this.gamePlay.boardSize;t++)for(let t=0;t<this.gamePlay.boardSize;t++)this.gamePlay.deselectCell(e),e++}startNewGame(){this.gameState.running=!0,this.refreshLevels(),this.refreshEnemies(),this.gameState.refreshPoints(),this.gamePlay.drawUi(r),this.#i=r;const e=L(this.firstTeamAllowedCharacters,this.gameState.currentLevelNumber,2),t=L(this.secondTeamAllowedCharacters,this.gameState.currentLevelNumber,2),s=this.getPositions(),a=this.initPositionTeam(e,s.firstTeamPositionsList),i=this.initPositionTeam(t,s.secondTeamPositionsList);this.allCharacters.firstTeamPositioned=a,this.allCharacters.secondTeamPositioned=i,this.gamePlay.redrawPositions(this.allCharactersList),this.gamePlay.updateScore(this.gameState)}saveGame(){this.gameState.firstTeamList=this.allCharacters.firstTeamPositioned,this.gameState.secondTeamList=this.allCharacters.secondTeamPositioned,this.gameState.currentLevel=this.currentLevel,this.gameState.nextLevelsList=this.nextLevelsList,this.stateService.save(this.gameState),i.showMessage("Game is saved")}loadGame(){try{const{maxPoints:e}=this.gameState,t=this.stateService.load();this.gameState=y.from(t),e>this.gameState.maxPoints&&(this.gameState.maxPoints=e),this.characterSelected=void 0;const s=this.gameState.currentLevel;this.#i=s,this.setlevelTypes(this.gameState.nextLevelsList),this.gamePlay.drawUi(s),this.allCharacters.firstTeamPositioned=this.gameState.firstTeamList.map((e=>this.createCharacterFromData(e))),this.allCharacters.secondTeamPositioned=this.gameState.secondTeamList.map((e=>this.createCharacterFromData(e))),this.gamePlay.redrawPositions(this.allCharactersList),this.gamePlay.updateScore(this.gameState),setTimeout((()=>{i.showMessage("Game is loaded")}),100)}catch{i.showError("Cannot find saved data")}}createCharacterFromData(e){if(Object.keys(this.#t).includes(e.character.type)){const t=new this.#t[e.character.type](e.character.level,e.character.attack,e.character.defence,e.character.health,!0);return new c(t,e.position)}}}(w,b);E.init()}();