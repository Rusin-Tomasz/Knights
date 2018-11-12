let rowSize;

document.querySelector('.start-game').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.init-window').classList.add('invisible');
    let activePlayer = 2;
    let secondPlayer = 1;
    let playersName = document.getElementsByClassName('player-name-input');
    let radios = document.getElementsByName('map');
    let turnRadio = parseInt(document.querySelector('.turn-limit-input').value);
    let mapFieldArr = [];
    let cartsArrP1 = [];
    let cartsArrP2 = [];
    let currentRow;
    let currentCol;
    let currentContent;
    let currentNorth;
    let currentEast;
    let currentSouth;
    let currentWest;
    let turnCounter = 0;
    let turnLimit = turnRadio;
    let counter = turnLimit * 2 - 1;
    let viewPort;
    let viewportHeight = Math.max(document.documentElement.clientHeight);
    let viewportWidth = Math.max(document.documentElement.clientWidth);
    if(viewportWidth >= viewportHeight) {
        viewPort = 1;
    }else {
        viewPort = 2;
    }

    document.querySelector('.counter').innerHTML = `Pozostało tur: ${counter}`;

    [...playersName].forEach((element, index) => {
        let playersNameField = document.getElementsByClassName('player-name');
        playersNameField[index].innerHTML = element.value;
    });

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            let mapSize = radios[i].value;
            rowSize = mapSize;
            break;
        }
    };

    for (let i = 0; i < turnLimit; i++) {
        let numberArr = [];
        for (let i = 0; i < 8; i++) {
            let rndNumber = Math.floor((Math.random() * 10) + 1);
            numberArr.push(rndNumber);
        }

        // Rozdzielić na dwa typy a potem z tablicy pobrać karte
        function setCardType() {
            if (this.race == 'undead' && this.sumOfNumber > 0 && this.sumOfNumber < 8) {
                this.content.className += ' undead-card-P1 witch';
            } else if (this.race == 'undead' && this.sumOfNumber > 7 && this.sumOfNumber < 16) {
                this.content.className += ' undead-card-P1 brain-zombie';
            } else if (this.race == 'undead' && this.sumOfNumber > 15 && this.sumOfNumber < 23) {
                this.content.className += ' undead-card-P1 crypt-archer';
            } else if (this.race == 'undead' && this.sumOfNumber > 22 && this.sumOfNumber < 30) {
                this.content.className += ' undead-card-P1 reaper';
            } else if (this.race == 'undead' && this.sumOfNumber > 29 && this.sumOfNumber < 37) {
                this.content.className += ' undead-card-P1 grim-reaper-red';
            } else if (this.race == 'undead' && this.sumOfNumber > 36) {
                this.content.className += ' undead-card-P1 grim-reaper';
            } else if (this.race == 'human' && this.sumOfNumber > 0 && this.sumOfNumber < 8) {
                this.content.className += ' human-card-P1 sword';
            } else if (this.race == 'human' && this.sumOfNumber > 7 && this.sumOfNumber < 16) {
                this.content.className += ' human-card-P1 cleric';
            } else if (this.race == 'human' && this.sumOfNumber > 15 && this.sumOfNumber < 23) {
                this.content.className += ' human-card-P1 ranger';
            } else if (this.race == 'human' && this.sumOfNumber > 22 && this.sumOfNumber < 30) {
                this.content.className += ' human-card-P1 knight';
            } else if (this.race == 'human' && this.sumOfNumber > 29 && this.sumOfNumber < 37) {
                this.content.className += ' human-card-P1 space-police';
            } else if (this.race == 'human' && this.sumOfNumber > 36) {
                this.content.className += ' human-card-P1 mermai';
            }
        }

        function setRaceToCard(player) {
            if (document.getElementById(`p${player}-human`).checked) {
                this.race = 'human'
            } else if (document.getElementById(`p${player}-undead`).checked) {
                this.race = 'undead'
            }
        }

        function DefineCard(Obj1, Obj2) {
            let cartObjValueArr1 = [Obj1.north, Obj1.east, Obj1.south, Obj1.west];
            let cartObjValueArr2 = [Obj2.north, Obj2.east, Obj2.south, Obj2.west];
            for (let i = 0; i < 2; i++) {
                let cart = document.createElement('div');
                cart.setAttribute('draggable', 'true');
                if (i < 1) {
                    cart.className += (` card card-P1`);
                    Obj1.content = cart;
                    Obj1.setCardType();
                } else {
                    cart.className += (` card card-P2`);
                    Obj2.content = cart;
                    Obj2.setCardType();
                }
                for (let j = 0; j < 4; j++) {
                    let cartValue = document.createElement('span');
                    if (i < 1) {
                        cartValue.innerHTML = cartObjValueArr1[j];
                        cart.appendChild(cartValue);
                    } else {
                        cartValue.innerHTML = cartObjValueArr2[j];
                        cart.appendChild(cartValue);
                    }
                }

                if(document.querySelector(`.p${i+1}-cards`).childNodes.length <= 4) {
                    document.querySelector(`.p${i+1}-cards`).appendChild(cart);
                } else {
                    document.querySelector(`.p${i+1}-cards-holder`).appendChild(cart);
                }        
            }
            setHeightOfCard();
        }

        function cartObject() {
            let cartObjP1 = {};
            let cartObjP2 = {};
            cartObjP1.north = numberArr[0];
            cartObjP1.east = numberArr[1];
            cartObjP1.south = numberArr[2];
            cartObjP1.west = numberArr[3];
            cartObjP1.setRaceToCard = setRaceToCard;
            cartObjP1.setRaceToCard(1);
            cartObjP1.sumOfNumber = numberArr[0] + numberArr[1] + numberArr[2] + numberArr[3];
            cartObjP1.setCardType = setCardType;
            cartsArrP1.push(cartObjP1);
            cartObjP2.north = numberArr[4];
            cartObjP2.east = numberArr[5];
            cartObjP2.south = numberArr[6];
            cartObjP2.west = numberArr[7];
            cartObjP2.sumOfNumber = numberArr[4] + numberArr[5] + numberArr[6] + numberArr[7];
            cartObjP2.setRaceToCard = setRaceToCard;
            cartObjP2.setRaceToCard(2);
            cartObjP2.setCardType = setCardType;
            cartsArrP2.push(cartObjP2);
            DefineCard(cartObjP1, cartObjP2);
        }
        cartObject();
    };

    function setHeightOfCard() {
        let container = document.querySelector('.player');
        let currentHeightOfContainer = parseInt(window.getComputedStyle(container).height) * 0.9;
        let cards = document.querySelectorAll('.card');
        [...cards].forEach((element, index) => {
            cards[index].style.height = currentHeightOfContainer + 'px' ;
            cards[index].style.width = currentHeightOfContainer + 'px' ;
        });
    }

    function mapObj() {
        let currentHeight;
        for (let i = 0; i < rowSize; i++) {
            for (let j = 0; j < rowSize; j++) {
                let mapObj = {};
                let mapField = document.createElement('div');
                mapField.classList.add('map-field');
                document.querySelector('.map').appendChild(mapField);
                mapObj.content = mapField;
                if (i == 0) {
                    mapObj.dropzone1 = true;
                } else if (i == rowSize - 1) {
                    mapObj.dropzone2 = true;
                }
                mapObj.row = i + 1;
                mapObj.col = j + 1;
                mapFieldArr.push(mapObj);
                if(viewPort == 1) {
                    mapField.style.height = `${(100 - (2/rowSize * 2*rowSize))/rowSize}%`;
                    console.log(mapField.style.height);
                    mapField.style.margin = `${2/rowSize}%`;
                    currentHeight = window.getComputedStyle(mapField).height;
                    mapField.style.width = currentHeight;
                } else  {
                    mapField.style.width = `${(100 - (2/rowSize * 2*rowSize))/rowSize}%`;
                    mapField.style.margin = `${2/rowSize}%`;
                    currentHeight = window.getComputedStyle(mapField).width;
                    mapField.style.height = currentHeight;
                }
            };
        };
        setContainerWidth();
    }

    mapObj();
   
    function setContainerWidth() {
        let mapField;
        if(viewPort == 1 ) {
            mapField =   Math.floor(parseInt(document.querySelector('.map-field').style.width, 10) + 0.5);
        }else {
            mapField =   Math.floor(parseInt(document.querySelector('.map-field').style.height, 10) + 0.5);
        }
        let margin =  Math.floor(parseInt(window.getComputedStyle(document.querySelector('.map-field')).margin, 10) + 0.5);
        document.querySelector('.map').style.width = `${(mapField * rowSize) + (rowSize * (margin *2))}px`;
    }
 
    //Drag and drop 
    let cards = document.getElementsByClassName('card')
    for (const card of document.getElementsByClassName('card')) {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    }

    let maps = document.getElementsByClassName('map-field');
    for (const fields of maps) {
        fields.addEventListener('dragover', dragOver);
        fields.addEventListener('dragenter', dragEnter);
        fields.addEventListener('dragleave', dragLeave);
        fields.addEventListener('drop', dragDrop);
    }
    let dragEl;

    function dragStart() {
        dragEl = this;
        for (const fields of mapFieldArr) {
            if (activePlayer == 1 && fields.dropzone1 == true) {
                fields.content.classList.add('allow-drop-1')
            } else if (activePlayer == 2 && fields.dropzone2 == true) {
                fields.content.classList.add('allow-drop-2')
            } else {
                fields.content.classList.remove('allow-drop-2');
                fields.content.classList.remove('allow-drop-1');
            }
        }
    }

    function dragEnd() {
        for (const fields of mapFieldArr) {
            fields.content.className = 'map-field'
        }
    }

    function dragOver(e) {
        for (const fields of mapFieldArr) {
            if (activePlayer == 1 && fields.content == this && fields.dropzone1 == true) {
                e.preventDefault();
            } else if (activePlayer == 2 && fields.content == this && fields.dropzone2 == true) {
                e.preventDefault();
            }
        }
    }

    function dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    }

    function dragLeave() {
        if (this.classList.contains('allow-drop-1')) {
            this.className = 'map-field allow-drop-1';
        } else if (this.classList.contains('allow-drop-2')) {
            this.className = 'map-field allow-drop-2';
        } else {
            this.className = 'map-field';
        }
    }
    
    function dragDrop() {
        this.className = 'map-field';
        this.append(dragEl);
        dragEl.setAttribute('draggable', 'false');
  
        for (const fields of mapFieldArr) {
            function setCordinate(cardArr) {
                for (const carts of cardArr) {
                    if (fields.content.firstChild == carts.content) {
                        currentNorth = carts.north;
                        currentEast = carts.east;
                        currentSouth = carts.south;
                        currentWest = carts.west;
                    }
                }
            }

            if (this == fields.content) {
                currentContent = fields.content;
                currentRow = fields.row;
                currentCol = fields.col;
                if (activePlayer == 1) {
                    setCordinate(cartsArrP1);
                } else {
                    setCordinate(cartsArrP2);
                }
            }
        }
        let delay = 0;
        for (const fields of mapFieldArr) {
            let rowMinusOneContent;
            let colPlusOneContent;
            let rowPlusOneContent;
            let colMinusOneContent;
            function takeContentFromField(colToCheck, rowToCheck, contentVar) {
                if (fields.col == colToCheck && fields.row == rowToCheck && fields.content.firstChild && fields.content.firstChild.classList.contains('card-P' + secondPlayer)) {
                    if(contentVar == 1){
                        rowMinusOneContent = fields.content.firstChild;
                    }else if(contentVar == 2) {
                        colPlusOneContent = fields.content.firstChild;
                    }else if(contentVar == 3) {
                        rowPlusOneContent = fields.content.firstChild;
                    }else {
                        colMinusOneContent = fields.content.firstChild;
                    }
                }
            }

            takeContentFromField(currentCol, currentRow-1, 1);
            takeContentFromField(currentCol+1, currentRow, 2);
            takeContentFromField(currentCol, currentRow+1, 3);
            takeContentFromField(currentCol-1, currentRow, 4);

            function destroyTopCard() {
                delay += 600;

                function moveTop() {
                    let elem = currentContent.firstChild
                    let pos = 0;
                    let interval = setInterval(frame, 10);

                    function frame() {
                        if (pos == 50) {
                            clearInterval(interval);
                            elem.style.bottom = 0;
                            rowMinusOneContent.remove()
                        } else {
                            pos++;
                            elem.style.bottom = pos + 'px';
                        }
                    }
                }
                setTimeout(moveTop, delay);
            }

            function destroyRightCard() {
                delay += 600;

                function moveRight() {
                    let elem = currentContent.firstChild
                    let pos = 0;
                    let interval = setInterval(frame, 10);

                    function frame() {
                        if (pos == 50) {
                            clearInterval(interval);
                            elem.style.left = 0;
                            colPlusOneContent.remove()
                        } else {
                            pos++;
                            elem.style.left = pos + 'px';
                        }
                    }   
                }
                setTimeout(moveRight, delay);
            }

            function destroyBottomCard() {
                delay += 600;

                function moveBottom() {
                    let elem = currentContent.firstChild
                    let pos = 0;
                    let interval = setInterval(frame, 10);
                    function frame() {
                        if (pos == 50) {
                            clearInterval(interval);
                            elem.style.top = 0;
                            rowPlusOneContent.remove()

                        } else {
                            pos++;
                            elem.style.top = pos + 'px';
                        }
                    }
                }
                setTimeout(moveBottom, delay);
            }

            function destroyLeftCard() {
                delay += 600;

                function moveLeft() {
                    let elem = currentContent.firstChild
                    let pos = 0;
                    let interval = setInterval(frame, 10);

                    function frame() {
                        if (pos == 50) {
                            clearInterval(interval);
                            elem.style.right = 0;
                            colMinusOneContent.remove()
                        } else {
                            pos++;
                            elem.style.right = pos + 'px';
                        }
                    }
                }
                setTimeout(moveLeft, delay);
            }

            function compareFieldsAround(ArrayOfCards) {
                for (const carts of ArrayOfCards) {
                    if (rowMinusOneContent == carts.content && currentNorth > carts.south) {
                            destroyTopCard();
                    } else if (colPlusOneContent == carts.content && currentEast > carts.west) {
                            destroyRightCard();
                    } else if (rowPlusOneContent == carts.content && currentSouth > carts.north) {
                            destroyBottomCard();
                    } else if (colMinusOneContent == carts.content && currentWest > carts.east) {
                            destroyLeftCard();
                    }
                };
            }

            if (activePlayer == 1) {
                compareFieldsAround(cartsArrP2);
            } else {
                compareFieldsAround(cartsArrP1);
            }
        };

        for (const cart of cartsArrP1) {
            cart.content.setAttribute('draggable', 'false');
            cart.content.style.userSelect = 'none';
        }
        for (const cart of cartsArrP2) {
            cart.content.setAttribute('draggable', 'false');
            cart.content.style.userSelect = 'none';
        }

        for (fields of mapFieldArr) {
            fields.dropzone1 = false;
            fields.dropzone2 = false;
        }
    }

    function init() {
        activeplayer = 2;
    }

    function endOfTurn() {

        function setInitialDropzone(item) {
            if (item.row == rowSize) {
                for (i = 0; i < rowSize; i++) {
                    if (!item.content.firstChild) {
                        item.dropzone2 = true;
                    }
                }
            } else if (item.row == 1) {
                for (i = 0; i < rowSize; i++) {
                    if (!item.content.firstChild) {
                        item.dropzone1 = true;
                    }
                }
            }
        }

        for (fields of mapFieldArr) {
            if (fields.content.firstChild) {
                let turnRow = fields.row;
                let turnCol = fields.col;
                let turnContent = fields.content.firstChild.classList.contains('card-P1');
                for (fields of mapFieldArr) {

                    function setDropzone() {
                        if (turnContent) {
                            fields.dropzone1 = true;
                        } else if (!turnContent) {
                            fields.dropzone2 = true;
                        }
                    }

                    function AllowTodrop(ColToCheck, RowToCheck) {
                        if (fields.col == ColToCheck && fields.row == RowToCheck && !fields.content.firstChild) {
                            setDropzone();
                        }
                    }

                    AllowTodrop(turnCol, turnRow-1);
                    AllowTodrop(turnCol, turnRow+1);
                    AllowTodrop(turnCol-1, turnRow);
                    AllowTodrop(turnCol-1, turnRow-1);
                    AllowTodrop(turnCol-1, turnRow+1);
                    AllowTodrop(turnCol+1, turnRow-1);
                    AllowTodrop(turnCol+1, turnRow);
                    AllowTodrop(turnCol+1, turnRow+1);

                }
            }
            setInitialDropzone(fields);
        }

        function SetDraggablePlayer (cardArr, atrr) {
            for (const cart of cardArr) {
                cart.content.setAttribute('draggable', atrr)
            }
        }

        if (activePlayer == 1) {
            activePlayer = 2;
            secondPlayer = 1;
            SetDraggablePlayer(cartsArrP1, 'false');
            SetDraggablePlayer(cartsArrP2, 'true');
            if(document.querySelector('.p2-cards-holder').children.length > 1) {
                document.querySelector('.p2-cards').appendChild (
                    document.querySelector('.p2-cards-holder').lastChild                 
                );
            }
        } else {
            activePlayer = 1;
            secondPlayer = 2;
            SetDraggablePlayer(cartsArrP1, 'true');
            SetDraggablePlayer(cartsArrP2, 'false');
            if(document.querySelector('.p2-cards-holder').children.length > 1) {
                document.querySelector('.p1-cards').appendChild (
                    document.querySelector('.p1-cards-holder').lastChild
                );
            }
        }
        document.querySelector(`.player-${activePlayer}`).classList.add('active');
        document.querySelector(`.player-${secondPlayer}`).classList.remove('active');
    }
    document.querySelector('.next-turn').addEventListener('click', () => {
        if(turnCounter < (turnLimit * 2 - 1)) {
            turnCounter ++;
            counter --;
            document.querySelector('.counter').innerHTML = `Pozostało tur: ${counter}`;
            endOfTurn();    
        } else {
            if( document.querySelectorAll(`.card-P2`).length > document.querySelectorAll(`.card-P1`).length) {
                let playerName = document.querySelector('.p2-name').innerHTML;
                document.querySelector(".player-win").innerHTML = `Gracz ${playerName} Wygrał`;
                document.querySelector(".end-game-info").style.height = 100 + 'vh';
                document.querySelector(".end-game-info").style.opacity = 1;
                document.querySelector(".container").style.filter = 'blur(2rem)';
            }else if (document.querySelectorAll(`.card-P2`).length == document.querySelectorAll(`.card-P1`).length) {
                document.querySelector(".player-win").innerHTML = `Remis, zapraszam do ponownej rozgrywki.`;
                document.querySelector(".end-game-info").style.height = 100 + 'vh';
                document.querySelector(".end-game-info").style.opacity = 1;
                document.querySelector(".container").style.filter = 'blur(2rem)';
            }else {
            let playerName = document.querySelector('.p1-name').innerHTML;
                document.querySelector(".player-win").innerHTML = `Gracz ${playerName} Wygrał`;
                document.querySelector(".end-game-info").style.height = 100 + 'vh';
                document.querySelector(".end-game-info").style.opacity = 1;
                document.querySelector(".container").style.filter = 'blur(2rem)';
            }
        } 
    });
    endOfTurn();
});