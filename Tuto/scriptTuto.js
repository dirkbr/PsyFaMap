var isFirstTimeTuto = false;
var textFirstPopup = 'Hey ! So beginnst du ein Gespräch. Es können maximal vier Personen in einer Bubble sein.';
var textSecondPopup = 'Du kannst auch im Chat schreiben! ';
var targetObjectTutoBubble ='Tutobubble';
var targetObjectTutoChat ='tutoChat';
var targetObjectTutoExplanation ='tutoExplanation';
var popUpExplanation = undefined;
function launchTuto (){
    WA.openPopup(targetObjectTutoBubble, textFirstPopup, [
        {
            label: "Weiter",
            className: "popUpElement",
            callback: (popup) => {
                popup.close();

                WA.openPopup(targetObjectTutoChat, textSecondPopup, [
                    {
                        label: "Chat öffnen",
                        className: "popUpElement",
                        callback: (popup1) => {
                            WA.sendChatMessage("Hier kannst du auch schreiben!", 'PsyFaKo Guide');
                            popup1.close();
                            WA.openPopup("TutoFinal","Du bist jetzt Bereit! Gehe durch das Tor und erlebe die PsyFaWorld!",[
                                {
                                    label: "Alles klar!",
                                    className : "success",callback:(popup2 => {
                                        popup2.close();
                                        WA.restorePlayerControl();
                                    })
                                }
                            ])
                        }
                    }

                ])
            }
        }
    ]);
    WA.disablePlayerControl();

}


WA.onEnterZone('popupZone', () => {
    WA.displayBubble();
    if (!isFirstTimeTuto) {
        isFirstTimeTuto = true;
        launchTuto();
    }
    else {
        popUpExplanation = WA.openPopup(targetObjectTutoExplanation, 'Möchtest du die die Erklärung nochmal geben?', [
            {
                label: "Nein",
                className: "error",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Ja",
                className: "success",
                callback: (popup) => {
                    popup.close();
                    launchTuto();
                }
            }
        ])
    }
});

WA.onLeaveZone('popupZone', () => {
    if (popUpExplanation !== undefined) popUpExplanation.close();
    WA.removeBubble();
})
