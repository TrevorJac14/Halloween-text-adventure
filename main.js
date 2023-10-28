const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up surrounded by fog, the air feels cold. You are confused but you start to walk through the fog and see a chest. In it there is a small camping medkit',
        options: [
            {
                text: 'Take the medkit',
                setState: { med: true},
                nextText: 2
            },
           
            {
                text: 'Stealing is wrong',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'In the distance you can make out a barn and a house.',
        options: [
            {
                text: 'Head for the barn',
                nextText: 3
            },
            {
                text: 'Haed for the house',
                nextText: 14
            }
        ]
    },
    {
        id: 3,
        text: 'You make your way to the barn. As you aproach you can hear the sounds of someone attempting to fix a generator.',
        options: [
            {
                text: 'Head inside the barn',
                nextText: 4
            },
            {
                text: 'Go try the house instead',
                nextText: 14
            }
        ]
    },
    {
        id: 4,
        text: "Inside the barn there is a man working on a generator. They don't seem to notice you.",
        options: [
            {
                text: 'Say hi to them',
                nextText: 5
            },
            {
                text: 'Stranger danger, leave',
                nextText: 14
            },
            {
                text: 'Approach them slowly',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: 'The man is startled by you and yelps casuing the generator to spark with a bang. He apollogieses saying he thoguht you were the killer. Alarmed you ask him what is going on. He explains that his name is Steve. He and two others are trapped here and the only way to get out is to power the front gates. His friends are getting another generator going but he has not seen them in a while.',
        options: [
            {
                text: 'Continue',
                nextText: 6
            },
        ]
    },
    {
        id: 6,
        text: 'As Steve is explaining you notice he is bleeding from the leg. He notices your gaze and explains that he was hit by the killer. It looks pretty bad, it might make it difficult for him to survive.',
        options: [
            {
                text: 'Use the medkit',
                requiredState: (currentState) => currentState.med,
                nextText: 7
            },
            {
                text: 'Help repair the generator',
                nextText :8
            }
        ]
    },
    {
        id: 7,
        text: 'You patch up his leg and he thanks you',
        options: [
            {
                text: 'Help with the generator',
                nextText: 8,
            }
        ]
    },
    {
        id: 8,
        text: 'You and the man work on the generator when you hear a man scream. Steve looks pale but keeps working on the generator determined to finish it.',
        options: [
            {
                text: 'Ask who it was',
                nextText: 9
            },
            {
                text: 'Keep working on the gen',
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: 'Steve says it was another survivor named Jake. He and Nea went off to fix a different generator in the house. As he finishes explaining the generator purrs to life and lights outside turn on. You and Steve get up and leave the barn Steve does not want to leave the others',
        options: [
            {
                text: 'Head for the gates!',
                nextText: 10
            },
        ]
    },
    {
        id: 10,
        text: 'As you head for the gates Steve tells you he does not want to leave the others. He says he says he saw the killer take another survivor to the shack behind the house',
        options: [
            {
                text: 'Tell him you will wait for him at the gate',
                nextText: 11
            },
            {
                text: 'Just head for the gate',
                nextText: 11
            },
            {
                text: 'Tell him to leave them',
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'Steve says he is going to look for his friends without you. You head for the gates and see a lever to open them',
        options: [
            {
                text: 'Pull it now',
                nextText: 12
            },
            {
                text: 'Wait for Steve',
                nextText: 13
            }
        ]
    },
    {
        id: 12,
        text: 'You pull the lever a loud alarm sounds as the gates creek open. You run out into the fog and everything fades',
        options: [
            {
                text: 'Play again',
                nextText: '1'
            },
        ]
    },
    {
        id: 13,
        text: 'You wait for a few minutes, your heart is pounding. You hear the sound of multiple people running and some lound angry stomps. You hear Steve yell to open the gates. He and a woman are running towards you with a large man in tattered bloody clothes following behind them. You open the gates and the three of you run out and everything starts to fade away',
        options: [
            {
                text: 'Play again',
                nextText: '1'
            },
        ]
    },
    {
        id: 14,
        text: 'You head for the house. As you apporach it you narely avoid a bear trap on the ground. You can hear someone working on some sort of machiery aand can see flashes of light in the upstairs window. A long cord is hanging out the window and continues north.',
        options: [
            {
                text: 'Go inside and up the stairs',
                nextText: 15
            },
        ]
    },
    {
        id: 15,
        text: 'As you walk inside you step on a creaky part of the floor and hear the working stop. You head up stairs and see a nearly repaired generator and two people a man and a woman doing a very bad job at hiding. You say hello and they both let out a breath of releif. They explain that there is a killer and you are all trapped on this farm unless you power the fron gates.',
        options: [
            {
                text: 'Continue',
                nextText: 16
            },
        ]
    },
    {
        id: 16,
        text: 'They tell you their names, Jake and Nea. There is a thrid person out there named Steve he went looking for another generator to fix but they have not seen him in a while. Just then you all hear the back door downstairs burst open and heavy footsteps aproach.',
        options: [
            {
                text: 'Hide in the closet',
                nextText: 17
            },
            {
                text: 'Hide under the bed',
                nextText: 17
            }
        ]
    },
    {
        id: 17,
        text: 'You each quickly hide but Jake was not lucky enough and the killer, a large man with ripped clothing attacks Jake and picks him up with no effort and takes him away. After they are gone you and Nea hear the sound of a gen start up and lights turn on.',
        options: [
            {
                text: 'Go help Jake',
                nextText: 18
            },
        ]
    },
    {
        id: 18,
        text: 'You and Nea run out of the house and try to distract the killer. He drops Jake and goes for you and you quickly think of the bear trap. You get him to follow you and he steps in it yelling in pain as you run for the gate. You three run and see Steve opening the gate, you all run out and everything fades',
    },
    
]


startGame()