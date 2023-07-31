
    const array = new Array(10); // 배열 선언
    let timecnt = 3;
    let gametime = 60;
    time();
    startgame();
    //startgame(); function은 자동 실행되지 않음
    let score=0;
    let combo=0;
    const left = document.querySelector('.classcomp .standard0'); //왼쪽 버튼
    const right = document.querySelector('.classcomp .standard1'); // 오른쪽 버튼

    // APK 버전
    // left.addEventListener('click',(e)=>{
    //     const fistElem = document.querySelector('.createloc > div'); //비교요소
    //     let value = e.target.className; //클릭한 요소
    //     console.log(value)
    //     console.log(fistElem.className)
    //     if(fistElem.className == value){
    //         console.log('일치');
    //         addnum(); 

    //     } else {
    //         console.log('불일치');
    //         comboreset();
    //     }
    // })
    // right.addEventListener('click',(e)=>{
    //     const fistElem = document.querySelector('.createloc > div'); //비교요소
    //     let value = e.target.className; //클릭한 요소
    //     console.log(value)
    //     console.log(fistElem.className)
    //     if(fistElem.className == value){
    //         console.log('일치');
    //         addnum();
    //     } else {
    //         console.log('불일치');
    //         comboreset();
    //     }
    // })


    // setTimeout(() => {
    //     document.addEventListener('keydown', (e)=>{
    //         if(e.code === 'ArrowLeft'){
    //             console.log('left')
    //             const firstElem = document.querySelector('.createloc > div');
    //             console.log(firstElem.className)
    //             if(firstElem.className === 'standard0'){
    //                 console.log(firstElem.className)
    //                 addnum();
    //             }
    //         }else if(e.code === 'ArrowRight'){
    //             console.log('right')
    //             const firstElem = document.querySelector('.createloc > div');
    //             console.log(firstElem.className)
    //             if(firstElem.className === 'standard1'){
    //                 console.log(firstElem.className)
    //                 addnum();
    //             }            
    //         }
    //         else{
    //             console.log('error')
    //             comboreset();
    //         }
    //     });       
    // }, 3000);

    // PC버전    
    function game(){
        setTimeout(() => {
            document.addEventListener('keydown',(e)=>{
                const firstElem = document.querySelector('.createloc > div');
                if(firstElem.className === 'standard0'){
                    if(e.code === 'ArrowLeft'){
                        scorecheck();
                        addnum();
                    }else{
                        comboreset();
                    }
                }
                else if(firstElem.className === 'standard1'){
                    if(e.code === 'ArrowRight'){
                        scorecheck();
                        addnum();
                    }else{
                        comboreset();
                    }
                }
            });
        }, 3000);
    }

    function scorecheck(){
        if(score < 0)score=0;        
    }


    function startgame(){  // 게임 시작 시 생성되는 배열
        for(let i=0; i<array.length; i++){
            let randomnum = Math.floor(Math.random()*2);
            array[i] = randomnum; // 초기에는 push 사용 X;
            const createloc = document.querySelector('.createloc');
            const div = document.createElement('div');
            div.className = 'standard'+array[i];
            createloc.appendChild(div);
        }
        game();
        return;
    }

    /* 배열 임의의 위치에 요소 추가 제거 */
    // array.splice(start,deleteCount,el);
    // start - 수정할 배열 요소의 인덱스
    // deleteCount - 삭제할 요소 개수, 제거하지 않을 경우 0
    // el - 배열에 추가될 요소

    function addnum(){ // 다음 숫자 추가 -> 클래스랑 연동 필요
        let randomnum2 = Math.floor(Math.random()*2);
        array.splice(0,1);
        array.push(randomnum2);

        let findstandard0 = document.querySelector('.createloc div');
        let findstandard = document.querySelector('.createloc');
        findstandard.removeChild(findstandard0);
        //findstandard.parentnodes.remove(findstandard0);

        const createloc = document.querySelector('.createloc');
        const div = document.createElement('div');
        div.className = 'standard'+randomnum2;
        createloc.appendChild(div);
        btnsound();
        scorecnt();
        combocnt();
    }

    function btnsound(){
        let audio = new Audio('./Img/clicksound.mp3');
        audio.play();
    }

    function scorecnt(){
        score = score + 100;
        document.querySelector('.scoreresult').innerHTML = score+"점";
    }

    function combocnt(){
        combo ++;
        if(combo>=2){
            document.querySelector('.combo').innerHTML = combo + " Combo !";
        }
    }

    function comboreset(){
        combo = 0;
        score-=1000;
        document.querySelector('.combo').innerHTML = "";
        
    }

    function scoreAnimateRed(){
        $('.scoreresult').animate({

        });
    }
    function scoreAnimateBlack(){
        $('.scoreresult').animate({

        });
    }


    function time(){
        document.querySelector('.startcnt').innerHTML = timecnt;
        timecnt--;
        let timereset = setTimeout(time, 1000);
        if(timecnt==-1){
            document.querySelector('.cloud').style.display='none';
            setTimeout(() =>{
                clearInterval(timereset); // 카운트가 종료되고 더이상 돌지 않음
            gametimer();
            },100);
        }
    }

    function gametimer(){
        document.querySelector('.timerresult').innerHTML = gametime+"초";
        gametime--;
        let gametumercnt = setTimeout(gametimer, 1000);
        if(gametime<11){
            document.querySelector('.timer > p').style.color = "red";
        }
        if(gametime==-1){
            document.querySelector('.gameendmessage').style.display='block';
            setTimeout(() => {
                clearInterval(gametumercnt);
            }, 100);
        }
        gameEndMessage();
        clearInterval(game());
    }

    function gameEndMessage(){
        let escore = document.querySelector('.gameendmessage_score');
        if(score<0){
            escore.innerHTML = '0점';
        }
        else{
            escore.innerHTML = score + '점';
        }
    }

    // 실패 시 딜레이 추가(){} >> x
    // 최대 콤보 카운트(){} >> x
    // 현재 콤보 카운트(){}
    // 스코어 카운트(){} >> 시도
    // 게임 시간 제한(){} >> 시도
    // 피버 기능 추개(){} >> x
    // 1000점, 2000점 기준으로 랜덤 2가지에서 3, 4가지로 증가 어떻게 if문 을 짤것인가.
    // 버큰 클릭 시 사운드 추가 >> 완
    // 콤보 카운트 삭제 (css, 시간제한)
