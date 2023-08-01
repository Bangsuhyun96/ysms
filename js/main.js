    // const left = document.querySelector('.classcomp .standard0'); //왼쪽 버튼
    // const right = document.querySelector('.classcomp .standard1'); // 오른쪽 버튼

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

    const array = new Array(10);
    let timecnt = 3;
    let gametime = 30;
    let feverSwitch = 0; // 현재 상태
    let feverCount = 0; // 피버 진입 조건
    time();
    startgame();
    let score=0;
    let combo=0;

    // PC버전
    function game(){
        if(feverSwitch==0){
            normalEvent(); // 일반상태 진입
        }else if(feverSwitch==1){
            feverEvent(); // 피버상태 진입
        }
    }
    
    function feverOn(){
        let feverClassLoc = document.querySelectorAll('.createloc > div');
        for(let i = 0; i <= feverClassLoc.length-1; i++){
            feverClassLoc[i].classList.add('fever');
        }
    }

    function feverOff(){
        feverSwitch=0;
        let feverClassLoc = document.querySelectorAll('.createloc > div');
        for(let i = 0; i <= feverClassLoc.length-1; i++){
            feverClassLoc[i].classList.remove('fever');          
        }
        return;
    }
    
    // 피버모드 진입
    function feverEvent(){
        gametime+=3; // 피버 진입 시 3초 추가
        gametxt(); // 추가된 시간 출력
        document.addEventListener('keydown', (e)=>{ // 좌우 입력
            if(e.code === 'ArrowLeft' || e.code === 'ArrowRight'){
                addnum(); // 배열 갱신
                feverOn(); // 갱신된 객체 피버상태 적용
            }            
        });
        feverOff(); // 피버 종료 (조건부 추가 → 종료가 안됨)
        return;
    }

    // 일반모드 진입
    function normalEvent(){
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

    function startgame(){
        for(let i=0; i<array.length; i++){
            let randomnum = Math.floor(Math.random()*2);
            array[i] = randomnum;
            const createloc = document.querySelector('.createloc');
            const div = document.createElement('div');
            div.className = 'standard'+array[i];
            createloc.appendChild(div);
        }
        game();
        return;
    }

    function addnum(){
        let randomnum2 = Math.floor(Math.random()*2);
        array.splice(0,1);
        array.push(randomnum2);
        let findstandard0 = document.querySelector('.createloc div');
        let findstandard = document.querySelector('.createloc');
        findstandard.removeChild(findstandard0);
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
        feverCount ++;
        if(combo>=2){
            document.querySelector('.combo').innerHTML = combo + " Combo !";
        }
        comboPlusanimate();
        if(feverCount==40){
            feverSwitch=1;
        }
    }

    function comboreset(){
        combo = 0;
        scoreMinus();
        document.querySelector('.combo').innerHTML = "";
        console.log('reset');
    }

    function scoreMinus(){
        score-=1000;
        scoreMinusanimate();
        scorecheck();
        document.querySelector('.scoreresult').innerHTML = score+"점";
    }

    function scorecheck(){
        if(score < 0)score=0;
    }

    function scoreMinusanimate(){
        document.querySelector('.scoreresult').animate([
            {scale : 1.1, color: '#ff2222'},
            {scale : 1.2, color: '#ff2222'},
            {scale : 1.4, color: '#ff2222'},
            {scale : 1.5, color: '#ff2222'},
            {scale : 1.4, color: '#ff2222'},
            {scale : 1.3, color: '#ff2222'},
            {scale : 1.2, color: '#ff2222'},
            {scale : 1.1, color: '#ff2222'},
            {scale : 1.0, color: '#222222'}
        ],400);
    }

    function timeoutanimate(){
        document.querySelector('.timerresult').animate([
            {scale : 1.5, opacity: 0.5},
            {scale : 1.0, opacity: 1.0}
        ],400);
    }

    function comboPlusanimate(){
        document.querySelector('.combo').animate([
            {scale : 1.2,},
            {scale : 1.0,}
        ],300);
    }

    function time(){
        document.querySelector('.startcnt').innerHTML = timecnt;
        timecnt--;
        let timereset = setTimeout(time, 1000);
        if(timecnt==-1){
            document.querySelector('.cloud').style.display='none';
            setTimeout(() =>{
                clearInterval(timereset);
            gametimer();
            },100);
        }
    }

    function gametxt(){
        document.querySelector('.timerresult').innerHTML = gametime+"초";
    }

    function gametimer(){
        gametime--;
        gametxt();
        let gametumercnt = setTimeout(gametimer, 1000);
        if(gametime<10){
            document.querySelector('.timer > p').style.color = "red";
            timeoutanimate();
        }
        if(gametime==-1){
            document.querySelector('.gameendmessage').style.display='flex';
            setTimeout(() => {
                clearInterval(gametumercnt);
            }, 100);
        }
        gameEndMessage();
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
