import React from 'react';

function Asynchronous(props) {

    /* 
        동기(Synchronous): 순서대로 동작 o
        비동기(Asynchronous): 순서대로 동작 x

        콜백을 사용하는 이유? 
        비동기 처리 안에서 내가 지정한 순서대로 함수 호출하려고!

    */

    let num = 0;

    const handleClick = () => {
        num++;

        const click1 = (num) => {
            console.log(`${num} click1!!!`);
        }
        const click1After = () => {
            console.log("click1 다음 실행!");
        }
        const click2 = (num) => {
            console.log(`${num} click2!!!`);
        }
        const click2After = () => {
            console.log("click2 다음 실행!");
        }

        const clickFx = (fx1, fx2) => {
            fx1(num);
            fx2();
        }

        setTimeout(clickFx, Math.random(3) * 1000, click1, click1After); // 비동기
        click1After(); //동기
        setTimeout(clickFx, Math.random(3) * 1000, click2, click2After); // 비동기
        click2After(); //동기
        
    };

    const handleClick2 = () => {
        const p1 = new Promise((resolve, reject) => {
            const num = Math.random(4);
            if(Math.round(num % 2, 0) === 0) {
                resolve("짝수");
            }else {
                reject(new Error("홀수"));
            }
        });

        p1
        .then(result => {
            console.log(result);
            return "첫번째 then의 리턴";
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleClick3 = () => {

        const printUser2 = () => {
            return new Promise((resolve, reject) => {
                resolve("유저2");
                reject(new Error("오류2"));
            });
        }

        printUser2().then(r => console.log(r));

        const printUser = async () => {
            try {
                printUser2().then((r) => {
                    console.log(r);
                });
                throw new Error("오류 처리");
            } catch(error) {
                console.log(error);
            }
            return "유저1";
        }

        printUser().then(r => console.log(r));

        

    }
    
    return (
        <div>
            <button onClick={handleClick}>클릭</button>
            <button onClick={handleClick2}>클릭2</button>
            <button onClick={handleClick3}>클릭3</button>
        </div>
    );
}

export default Asynchronous;