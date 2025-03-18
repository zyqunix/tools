var D=Object.defineProperty;var w=(c,o,u)=>o in c?D(c,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):c[o]=u;var d=(c,o,u)=>(w(c,typeof o!="symbol"?o+"":o,u),u);(function(){"use strict";const c=`
canvas {
	pointer-events: none;
	border: #ffcc29 3px solid;
	box-sizing: border-box;
	border-top-width: 45px;
}

#replay-panel {
	height: 45px;
    z-index: 100;
    position: absolute;
    top: 0;
    font-family: 'Arial';
    color: #000000;
    display: flex;
	width: 100%;
    align-items: baseline;
    justify-content: center;
	font-size: 20px;
	font-weight: 700;
}

#replay-panel button {
	height: 35px;
    line-height: 1;
	cursor: pointer;
    padding: 6px 23px;
    background: #ff8f00;
    margin: 5px;
    border-radius: 18px;
    font-size: 17px;
	font-weight: 700;
}

#replay-panel button:hover {
	outline: 1px solid #774400;
	outline-offset: 2px;
}

#replay-panel button:disabled {
	pointer-events: none;
	cursor: unset;
	opacity: 0.5;
}

.highlight {
	animation: highlight 1s ease 0s infinite normal forwards;
	outline-offset: 2px;
	outline: 3px solid #ff0000;
}

#pause-message {
	animation: flash 1s ease 0s infinite normal forwards;
    position: absolute;
	font-family: 'Arial';
    color: #ffffff;
	top: 43vh;
    font-size: 400%;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

@keyframes highlight {
	0%,
	100% {
		outline-color: #ff0000;
	}
	50% {
		outline-color: #ffcc29;
	}
}

@keyframes flash {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
`,o={START_LOADING:"start_loading",GAME_RESOURCES_LOADED:"game_resources_loaded",GAME_LOADED:"game_loaded",GAME_INITIALIZED:"game_initialized",ACTION_EXEC:"action_exec",BET_CHANGED:"bet_changed",FINISH_SPIN_ANIMATIONS:"finish_spin_animations",FINISH_ROUND_ANIMATIONS:"finish_round_animations",API_RESPONSE:"api_response",BALANCE_UPDATE:"balance_update",BUTTON_CLICK:"button-click",PRE_PLAY:"pre_play",PLAY:"play",AUTOSPINS_STOPPED:"autospins_stopped",GO_HOME:"go_home",SET_SKIN:"set_skin",ERROR:"game_error",SET_LINES_COUNT:"set_lines_count",CUSTOM_EVENT:"custom_event",GAME_UI_BET_PANEL_OPENED:"game_ui_bet_panel_opened",GAME_UI_BET_PANEL_CLOSED:"game_ui_bet_panel_closed",GAME_UI_SETTINGS_OPENED:"game_ui_settings_opened",GAME_UI_SETTINGS_CLOSED:"game_ui_settings_closed",GAME_UI_RULES_OPENED:"game_ui_rules_opened",GAME_UI_RULES_CLOSED:"game_ui_rules_closed",GAME_UI_PAYTABLE_OPENED:"game_ui_paytable_opened",GAME_UI_PAYTABLE_CLOSED:"game_ui_paytable_closed",GAME_UI_AUTOSPINS_PANEL_OPENED:"game_ui_autospins_panel_opened",GAME_UI_AUTOSPINS_PANEL_CLOSED:"game_ui_autospins_panel_closed",GAME_UI_QUICK_SPIN_OFFER_OPENED:"game_ui_quick_spin_offer_opened",GAME_UI_QUICK_SPIN_OFFER_CLOSED:"game_ui_quick_spin_offer_closed"};let u=!1;class f{constructor(){d(this,"gameController",null);d(this,"globalEventDispatcher",null);d(this,"game",null);d(this,"isEditor",!1);d(this,"isDebug",!1);this.initialHandler=this.initialHandler.bind(this),window.trackGameEventListeners||(window.trackGameEventListeners=[]),window.trackGameEventListeners.push(this.initialHandler),window.addEventListener("keydown",t=>{var e,i,a,l;if(this.game&&t.altKey&&t.ctrlKey&&t.code==="KeyR"&&(i=(e=this.game.data.latestData)==null?void 0:e.flow)!=null&&i.round_id){const r=new URLSearchParams(window.location.search).get("server_url");window.open("/api/replays/"+((l=(a=this.game.data.latestData)==null?void 0:a.flow)==null?void 0:l.round_id)+(r?"?server_url="+r:""),"__blank")}})}initialHandler(t,e,i){var a;switch(t){case o.START_LOADING:this.gameController=i,this.game=i==null?void 0:i.game,this.globalEventDispatcher=(a=this.game)==null?void 0:a.globalEventDispatcher,this.game&&this.initStyles();break}}gameInitHanddler(){this.game={}}initGame(){this.initReplayData(),this.isReplayMode()&&(this.game.all.hasOwnProperty("spin-button")&&(this.game.all["spin-button"].hotkey=0),this.speed||(this.speed=1),this.started=!1,this.firstSpinClicked=!1,this.replayData&&(this.initView(),this.game.settings.clear()),this.clickToContinueDelay=0,this.refreshView()),this.initStyles()}isReplayMode(){return!!this.replayData}isReplayFinished(){return this.replayData.length===0}getNextResponse(){return _(this.replayData&&this.replayData.length,"Replays data is empty."),this.replayData.shift()}beforeGameInit(){this.isReplayMode()&&(window._thingEngineAssets.projectDesc.id="replay-mode")}initView(){if(!this.viewInitialized){let t=0;this.game.pixiApp.ticker.add(()=>{for(t>this.game.time&&(t=this.game.time);this.game.time>=t+10;)t+=10,this.update()}),this.viewInitialized=!0;const e=document.createElement("div");e.id="replay-panel",this.game.pixiApp.view.parentElement.appendChild(e);const i=document.createElement("button");i.addEventListener("pointerdown",()=>{this.setSpeed(1)}),i.innerText="×1",e.appendChild(i),this.x1btn=i;const a=document.createElement("button");a.addEventListener("pointerdown",()=>{this.setSpeed(2)}),a.innerText="×2",a.innerText="×2",e.appendChild(a),this.x2btn=a;const l=document.createElement("button");l.addEventListener("pointerdown",()=>{this.setSpeed(4)}),l.innerText="×4",e.appendChild(l),this.x4btn=l,e.appendChild(document.createTextNode("replay"));const n=document.createElement("button");n.addEventListener("pointerdown",()=>{this.paused=!1,this.started=!1,this.firstSpinClicked=!1,this.game.pixiApp.ticker.speed=1,this.game.SharedAPI.restartGame()}),n.innerText="⏮",e.appendChild(n),this.restartButton=n;const r=document.createElement("button");r.addEventListener("pointerdown",()=>{this.started?(this.paused=!this.paused,this.game.pixiApp.ticker.speed=this.paused?0:this.speed,this.refreshView()):this.startReplay()}),e.appendChild(r),this.playBtn=r;const h=document.createElement("div");h.id="pause-message",e.appendChild(h),h.innerText="P A U S E",this.pauseMessage=h;const p=document.createElement("button");p.style.position="absolute",p.style.right="10px",p.addEventListener("pointerdown",()=>{this.spinReelsOrSkip()}),p.innerText="Help",e.appendChild(p),this.helpMessage=p,this.refreshView()}}startReplay(){this.started=!0,this.refreshView()}clickSpin(){if(!this.firstSpinClicked){const t=this.game.all["spin-button"];if(t&&t.isCanBePressed)return this.firstSpinClicked=!0,t.callClick(),!0}}skipClickToContinuePopups(){let t=!1;if(this.clickToContinueDelay<0){this.clickToContinueDelay++;return}return this.game.currentContainer&&this.game.currentContainer.forAllChildren(e=>{if((e.worldVisible&&e.worldAlpha&&this.clickToContinueDelay>=0||this.clickToContinueDelay>0)&&(e instanceof this.game.classes.Text&&e.translatableText&&(e.translatableText.includes("tap_to_continue")||e.translatableText.includes("click_to_continue")||e.translatableText.includes("push_to_continue")||e.translatableText.includes("tap_to_start")||e.translatableText.includes("push_to_start")||e.translatableText.includes("click_to_start")||e.translatableText.includes("tap_to_spin")||e.translatableText.includes("push_to_spin")||e.translatableText.includes("click_to_spin")||e.translatableText.includes("tap_to_play")||e.translatableText.includes("push_to_play")||e.translatableText.includes("click_to_play"))||e.name&&e.name.startsWith&&e.name.startsWith("slot-animations/popup/free-spins"))){let i=e.findParentByType(this.game.classes.Button);i&&i.isCanBePressed?this.clickButton(i):(this.clickToContinueDelay++,this.clickToContinueDelay===12&&(this.spinReelsOrSkip(),this.clickToContinueDelay=-12),t=!0)}}),t||(this.clickToContinueDelay=0),t}buyFeature(){const t=g(this.replayData[0]);if(t&&!t.includes("chance")){let e=".buyBonusClick`"+t;const i=b(this.replayData[0]);i&&(e+=","+i);let a=this.game.currentScene.getBuyBonusButtonForReplays&&this.game.currentScene.getBuyBonusButtonForReplays(t)||this.game.currentContainer.findChildrenByType(this.game.classes.Button).filter(n=>n.isCanBePressed&&n.onClick&&n.onClick.endsWith(e))[0];if(a)return this.clickButton(a),!0;const l=this.game.currentContainer.findChildrenByType(this.game.classes.Button).filter(n=>n.isCanBePressed&&["currentScene.showBuyBonusPopup","showModal`buy-bonus-popup","showModal`buy-bonus","currentScene.launchAnimations`buy-bonus","slot-animations/buy-bonus-portrait"].includes(n.onClick))[0];if(l)return this.clickButton(l),!0}}chooseFeature(){const t=C(this.replayData[0]);if(t){let e=this.game.currentContainer.findChildByName("choose-btn-"+t);e&&this.clickButton(e)}}gamblePlay(){const t=k(this.replayData[0]);if(t){let e=this.game.currentContainer.findChildByName("gamble-btn");if(e&&e.isCanBePressed)return this.clickButton(e),!0;e=null;const i="currentScene.playGamble`"+t;this.game.currentContainer.forAllChildren(a=>{a instanceof this.game.classes.Button&&a.onClick===i&&(e=a)}),e&&this.clickButton(e)}}markedButtonClick(){let t=this.game.currentContainer.findChildrenByName("replay-auto-click-parent");t=t.map(i=>i.parent).filter(i=>i instanceof this.game.classes.Button&&i.isCanBePressed);const e=t[Math.floor(Math.random()*t.length)];if(e)return this.clickButton(e),!0}update(){this.paused||!this.started||!this.game.currentScene||(this.buttonClickWaits?this.processClickWaitingButton():this.replayData.length&&this.game.currentContainer?this.buyFeature()||this.collectRound()||this.chooseFeature()||this.gamblePlay()||this.markedButtonClick()||this.skipClickToContinuePopups()||this.clickSpin():this.skipClickToContinuePopups()||this.markedButtonClick())}collectRound(){if(this.replayData[0].flow.command==="close")return this.clickButton(this.game.all["collect-btn"]),!0}spinReelsOrSkip(){if(this.game.classes.BaseSlotScene&&this.game.currentContainer instanceof this.game.classes.BaseSlotScene){const t=this.game.all["spin-button"];t&&t.isCanBePressed?(t.callClick(),this.started=!0,this.refreshView()):(this.game.currentContainer.skipSpin&&this.game.currentContainer.skipSpin(),this.game.all.hasOwnProperty("root-skip-trigger")&&this.game.all["root-skip-trigger"].skipNext())}}clickButton(t){_(!this.buttonClickWaits,"previous button click is not finished."),this.buttonClickWaits=t;const e=this.game.Lib.loadPrefab("replays-click-animation");e.targetButton=t,t.getRootContainer().addChild(e),this.clickButtonDelay=0}processClickWaitingButton(){if(this.buttonClickWaits)return this.buttonClickWaits.isCanBePressed&&this.buttonClickWaits.worldVisible&&this.buttonClickWaits.worldAlpha>.1&&(this.clickButtonDelay++,this.clickButtonDelay===6&&this.buttonClickWaits.onOver(),this.clickButtonDelay===12&&(this.buttonClickWaits.callClick(),this.buttonClickWaits=null)),!0}setSpeed(t){this.speed=t,this.game.pixiApp.ticker.speed=t,this.refreshView()}refreshView(){this.playBtn.innerText=!this.started||this.paused?"⏵":"⏸",this.pauseMessage.style.display=!this.started||this.paused?"block":"none",this.started?this.playBtn.classList.remove("highlight"):this.playBtn.classList.add("highlight"),this.restartButton.disabled=!this.started,this.x1btn.disabled=this.speed===1,this.x2btn.disabled=this.speed===2,this.x4btn.disabled=this.speed===4}initStyles(){u||(this.initReplayData(),this.replayData&&(u=!0,this.game.applyCSS(c)))}initReplayData(){var t;if(this.replayData=m(((t=window.__OPTIONS__)==null?void 0:t.replay)||null),this.replayData){const e=this.replayData[0].options;if(this.replayData.some(i=>{if(i&&i.outcome&&i.outcome.bet){let a=i.outcome.bet;return this.betRestoringProcess&&(a=this.betRestoringProcess(i)),e.currency||(e.currency={code:"FUN",symbol:"FUN",subunits:100,exponent:2}),e.default_bet=a,e.available_bets.indexOf(a)<0&&(e.available_bets.push(a),e.available_bets.sort((l,n)=>l-n)),!0}}),this.replayData[0].api_version==="2"?this.replayData[0].balance.wallet=this.replayData[1].balance.wallet+this.replayData[1].outcome.bet:this.replayData[0].balance=this.replayData[1].balance+this.replayData[1].outcome.bet,e.feature_options&&e.feature_options.feature_multipliers){let i=this.replayData[0].balance;this.replayData[0].api_version==="2"&&(i=i.wallet);let a=0;for(const n in e.feature_options.feature_multipliers)if(n!=="base_bet"){const r=e.feature_options.feature_multipliers[n];if(typeof r=="number")a=Math.max(r,a);else for(let h in r)a=Math.max(r[h],a)}a=Math.max(i,a/(e.feature_options.feature_multipliers.base_bet||100)*this.replayData[1].outcome.bet);const l=a-i;l>0&&this.replayData.some(n=>{this.replayData[0].api_version==="2"?n.balance.wallet+=l:n.balance+=l})}if(this.replayData[1].flow.purchased_feature&&this.replayData[1].flow.purchased_feature.name){const i=this.replayData[1].flow.purchased_feature.name;y(i)&&(this.replayData[0].flow.purchased_feature=JSON.parse(JSON.stringify(this.replayData[1].flow.purchased_feature)))}}}replayLastRound(){var e,i;let t=((i=(e=this.game.data.latestData)==null?void 0:e.flow)==null?void 0:i.round_id)||editor.settings.getItem(this.game.projectDesc.id+"last-replay-round-id");t?(editor.settings.setItem(this.game.projectDesc.id+"last-replay-round-id",t),this.__replayRound(t)):alert("Play a round first.")}async __replayRound(t){const e=window.SERVER_URL+"/api/replays/"+t,i=await fetch(e).then(l=>l.text()),a=i.indexOf("window.__OPTIONS__ = ")+21;window.__OPTIONS__.replay=JSON.parse(i.substring(a,i.indexOf("<\/script>"))).replay,this.initGame(),this.game.SharedAPI.restartGame()}}function _(s,t){s||alert(t)}function m(s){return s?JSON.parse(JSON.stringify(s)):null}function y(s){return s&&s.endsWith("_chance")}function g(s){if(s.flow&&s.flow.purchased_feature)return s.flow.purchased_feature.name}function b(s){if(s.flow&&s.flow.purchased_feature)return s.flow.purchased_feature.level}function C(s){if(s.features)return s.features.freespins_type}function k(s){if(s.gamble)return s.gamble.value[1]}const E=new f;window.__REPLAYS__=E})();
