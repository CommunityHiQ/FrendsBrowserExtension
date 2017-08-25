window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

/* 
Solarized väriteema: http://ethanschoonover.com/solarized

konversio tumman ja vaalean välillä 

vaalea --  tumma
base00 -- base0
base3 -- base03
base2 -- base02

*/

function vaalea() {
	
	/* Database merkki */
	$("path[style='fill: white; stroke-width: 2px; stroke: black;'], .bpmn-icon-data-store, .bpmn-icon-data-object").css('cssText', "fill: none; stroke: #6c71c4; color: #6c71c4;");

	/* tausta väri */
	$("body").css('cssText', "background-color: #fdf6e3; color: #657b83;");
		
	/* ylä ja ala valikot */ 
	$(".save-changes-bar, .navbar-static-top").css('cssText', "background-color: #eee8d5; color: #eee8d5; border: solid 1px #586e75;");

	/* vasemman laidan kuvakkeiden tausta ja reuna*/
	$(".djs-palette, .djs-palette-entries").css('cssText', "border: solid 1px #586e75; background-color: #eee8d5;"); 

	// TODO hassu valkoinen halo
	/* vasemman laidan nappulat (kaikki, mutta käsiä ja nuolia ei ylikirkjoiteta) sekä taskien vieresäs nappula*/ 
	$(".entry").css('cssText', "color: #586e75; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	/* eri tekstit triggeriewn alla yms */
	$("text").css('cssText', "font-size: 14px; fill: #657b83; fill-opacity: 1; stroke-width: 0px;");
	
	/* Oikean laidan pudotusvalikkojen ja tekstibopksien tausta ja kaikkien reuna*/
	$(".Select-control, .form-control, .btn, .textarea").css('cssText', "background-color: #eee8d5; color: #657b83; border: solid 1px #586e75;"); 
	
	/* vasemman ja oikean laidan valikoiden välissä oleva viiva */
	$(".separator").css('cssText', "border-top: solid 1px #586e75;"); 

	$("p, .bpmn-task-parameter-legend").css('cssText', "color: #586e75;");
	//$("h1,h2,h3,h4,h5,h6").css('cssText', "color: red;");
	
	/* yläladdan linkit */
	$("a, a:active, a:visited").css('cssText', "color: #657b83;");

	/* Taski */	
	$("rect[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-task").css('cssText', "stroke: #657b83; color: #657b83; fill: #eee8d5; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	/* Subprocess kutsu */
	$("rect[style='stroke: black; stroke-width: 5px; fill: white; fill-opacity: 0.95;'], .bpmn-icon-call-activity").css('cssText', "stroke: #657b83; stroke-width: 3px; color: #657b83; fill: #eee8d5; stroke-opacity: 1; fill-opacity: 0.9;");
	
	/* Scope ja for each */			
	$("rect[style='stroke: black; stroke-width: 2px; fill: white; fill-opacity: 0.95;'], .bpmn-icon-subprocess-expanded, .bpmn-icon-loop-marker, .bpmn-icon-sequential-mi-marker").css('cssText', "stroke: #859900; color: #859900; fill: #fdf6e3; fill-opacity: 0.6; fill-opacity: 0.6;");
	
	/* kommentti boksi, tekxt annotation */
	$("path[style='fill: none; stroke-width: 2px; stroke: black;']").css('cssText', "stroke: #657b83; stroke-width: 2px; fill: none;");
	
	/* triggeri pallo */
	$("circle[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-start-event-none").css('cssText', "stroke: #268bd2; color: #268bd2; fill: #eee8d5;");
	
	/* Exeption heitto ja koppi, eka pallo */ 		
	$("circle[style='stroke: black; stroke-width: 1px; fill: white;']").css('cssText', "stroke: #d33682; fill: none;");
	
	/* Exeption heitto ja koppi, toka pallo */ 
	$("circle[style='stroke: black; stroke-width: 1px; fill: none;'], .bpmn-icon-intermediate-event-throw-signal, .bpmn-icon-intermediate-event-catch-signal").css('cssText', "stroke: #d33682; color: #d33682; fill: #eee8d5; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	/* Expection koppi sisä kolmio, decission rasti, intermediate kolmio */ 
	$("path[style='fill: black; stroke-width: 1px; stroke: black;']").css('cssText', "stroke: #657b83; fill: #657b83;");
	
	/* Inclusive decission sisempi pallo */ 
	$("circle[style='stroke: black; stroke-width: 2.5px; fill: none;']").css('cssText', "stroke: #657b83; fill: none;");
	
	/* Decission palikkat */
	$("polygon[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-gateway-or, .bpmn-icon-gateway-xor").css('cssText', "stroke: #2aa198; color: #2aa198; fill: #eee8d5; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	/* return pallo ja intermediate rueturn */	
	$("circle[style='stroke: black; stroke-width: 4px; fill: white;'], .bpmn-icon-end-event-none, .bpmn-icon-end-event-signal").css('cssText', "stroke: #268bd2; stroke-width: 3px; color: #268bd2; fill: #eee8d5; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	/* Koodi laatikko */ 
	$("path[style='fill: white; stroke-width: 1px; stroke: darkred;'], .bpmn-icon-script").css('cssText', "stroke: #cb4b16; color: #cb4b16; fill: #eee8d5; background-color: #eee8d5; box-shadow: 0 0 2px 1px #eee8d5;");
	
	// TODO
	/* taskeja yhdistävä viiva ja nuoli, sekä viiva jossa poikki viiva */	
	$("path[style='fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\");'], path[style='fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\"); marker-start: url(\"#conditional-default-flow-marker\");']").css('cssText', "fill: none; stroke-width: 1px; stroke: #657b83; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\");");
		
};


function tumma() {
	
	/* Database merkki */
	$("path[style='fill: white; stroke-width: 2px; stroke: black;'], .bpmn-icon-data-store, .bpmn-icon-data-object").css('cssText', "fill: none; stroke: #6c71c4; color: #6c71c4;");

	/* tausta väri */
	$("body").css('cssText', "background-color: #002b36; color: #839496;");
		
	/* ylä ja ala valikot */ 
	$(".save-changes-bar, .navbar-static-top").css('cssText', "background-color: #073642; color: #073642; border: solid 1px #586e75;");

	/* vasemman laidan kuvakkeiden tausta ja reuna*/
	$(".djs-palette, .djs-palette-entries").css('cssText', "border: solid 1px #586e75; background-color: #073642;"); 

	// TODO hassu valkoinen halo
	/* vasemman laidan nappulat (kaikki, mutta käsiä ja nuolia ei ylikirkjoiteta) sekä taskien vieresäs nappula*/ 
	$(".entry").css('cssText', "color: #586e75; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	/* eri tekstit triggeriewn alla yms */
	$("text").css('cssText', "font-size: 14px; fill: #839496; fill-opacity: 1; stroke-width: 0px;");
	
	/* Oikean laidan pudotusvalikkojen ja tekstibopksien tausta ja kaikkien reuna*/
	$(".Select-control, .form-control, .btn, .textarea").css('cssText', "background-color: #073642; color: #839496; border: solid 1px #586e75;"); 
	
	/* vasemman ja oikean laidan valikoiden välissä oleva viiva */
	$(".separator").css('cssText', "border-top: solid 1px #586e75;"); 

	$("p, .bpmn-task-parameter-legend").css('cssText', "color: #586e75;");
	//$("h1,h2,h3,h4,h5,h6").css('cssText', "color: red;");
	
	/* yläladdan linkit */
	$("a, a:active, a:visited").css('cssText', "color: #839496;");

	/* Taski */	
	$("rect[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-task").css('cssText', "stroke: #839496; color: #839496; fill: #073642; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	/* Subprocess kutsu */
	$("rect[style='stroke: black; stroke-width: 5px; fill: white; fill-opacity: 0.95;'], .bpmn-icon-call-activity").css('cssText', "stroke: #839496; stroke-width: 3px; color: #839496; fill: #073642; stroke-opacity: 1; fill-opacity: 0.9;");
	
	/* Scope ja for each */			
	$("rect[style='stroke: black; stroke-width: 2px; fill: white; fill-opacity: 0.95;'], .bpmn-icon-subprocess-expanded, .bpmn-icon-loop-marker, .bpmn-icon-sequential-mi-marker").css('cssText', "stroke: #859900; color: #859900; fill: #002b36; fill-opacity: 0.6; fill-opacity: 0.6;");
	
	/* kommentti boksi, tekxt annotation */
	$("path[style='fill: none; stroke-width: 2px; stroke: black;']").css('cssText', "stroke: #839496; stroke-width: 2px; fill: none;");
	
	/* triggeri pallo */
	$("circle[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-start-event-none").css('cssText', "stroke: #268bd2; color: #268bd2; fill: #073642;");
	
	/* Exeption heitto ja koppi, eka pallo */ 		
	$("circle[style='stroke: black; stroke-width: 1px; fill: white;']").css('cssText', "stroke: #d33682; fill: none;");
	
	/* Exeption heitto ja koppi, toka pallo */ 
	$("circle[style='stroke: black; stroke-width: 1px; fill: none;'], .bpmn-icon-intermediate-event-throw-signal, .bpmn-icon-intermediate-event-catch-signal").css('cssText', "stroke: #d33682; color: #d33682; fill: #073642; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	/* Expection koppi sisä kolmio, decission rasti, intermediate kolmio */ 
	$("path[style='fill: black; stroke-width: 1px; stroke: black;']").css('cssText', "stroke: #839496; fill: #839496;");
	
	/* Inclusive decission sisempi pallo */ 
	$("circle[style='stroke: black; stroke-width: 2.5px; fill: none;']").css('cssText', "stroke: #839496; fill: none;");
	
	/* Decission palikkat */
	$("polygon[style='stroke: black; stroke-width: 2px; fill: white;'], .bpmn-icon-gateway-or, .bpmn-icon-gateway-xor").css('cssText', "stroke: #2aa198; color: #2aa198; fill: #073642; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	/* return pallo ja intermediate rueturn */	
	$("circle[style='stroke: black; stroke-width: 4px; fill: white;'], .bpmn-icon-end-event-none, .bpmn-icon-end-event-signal").css('cssText', "stroke: #268bd2; stroke-width: 3px; color: #268bd2; fill: #073642; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	/* Koodi laatikko */ 
	$("path[style='fill: white; stroke-width: 1px; stroke: darkred;'], .bpmn-icon-script").css('cssText', "stroke: #cb4b16; color: #cb4b16; fill: #073642; background-color: #073642; box-shadow: 0 0 2px 1px #073642;");
	
	// TODO
	/* taskeja yhdistävä viiva ja nuoli, sekä viiva jossa poikki viiva */	
	$("path[style='fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\");'], path[style='fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\"); marker-start: url(\"#conditional-default-flow-marker\");']").css('cssText', "fill: none; stroke-width: 1px; stroke: #839496; stroke-linejoin: round; marker-end: url(\"#sequenceflow-end\");");
		
};

function toimi() {
	chrome.storage.local.get("color", function(items){
		if (items.color == "light") {
			vaalea();
		}
		else if (items.color == "dark") {
			tumma();
		}
		// vanilla ei tee mitään
	});
}

setInterval(toimi, 500);
