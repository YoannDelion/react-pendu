import React, {Component} from 'react';
import './App.css';
import ScoreCount from './ScoreCount';
import Control from './Control';

const WORDS = ['JAVASCRIPT', 'DEVELOPPEUR', 'CHAT', 'ARMOIRE', 'ORDINATEUR', 'DERIVE', 'TATOUAGE', 'PAPIER', 'CISEAUX', 'PIERRE', 'ANIMATION', 'IMAGINATION', 'VICTOIRE'];
const CONTROLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class App extends Component {
    state = {
        score: 0,
        word: this.generateWord(),
        usedLetters: new Set(),
    };

    //arrow function for biding
    handleClick = (index) => {
        const {usedLetters} = this.state;
        const newScore = this.getScore(index);

        this.setState({
            usedLetters: usedLetters.add(CONTROLS[index]),
            score: newScore
        });
    };

    getScore(index) {
        const {usedLetters, word, score} = this.state;

        if (usedLetters.has(CONTROLS[index])) {
            return score - 2;
        } else {
            return word.includes(CONTROLS[index]) ? score + 2 : score - 1;
        }
    }

    //arrow function for biding
    getFeedback = (index) => {
        const {usedLetters, word} = this.state;

        if (usedLetters.has(CONTROLS[index])) {
            return word.includes(CONTROLS[index]) ? 'right' : 'wrong';
        }
    };

    computeDisplay(word, usedLetters) {
        return word.replace(/\w/g,
            (letter) => (usedLetters.has(letter) ? letter : '_')
        )
    }

    generateWord() {
        const randomNumber = Math.floor(Math.random() * Math.floor(WORDS.length));
        return WORDS[randomNumber]
    }

    //arrow function for biding
    resetGame = () => {
        this.setState({
            score: 0,
            word: this.generateWord(),
            usedLetters: new Set(),
        })
    };

    render() {
        const {score, word, usedLetters} = this.state;
        const hiddenWord = this.computeDisplay(word, usedLetters);
        const won = word === hiddenWord;

        return (
            <div className="game">
                <ScoreCount score={score}/>
                <div className="word">{hiddenWord}</div>
                {
                    <div className='controls'> {
                        won ? <button onClick={this.resetGame}>Rejouer</button> : (
                            CONTROLS.map((letter, index) => (
                                    <Control
                                        letter={letter}
                                        feedback={this.getFeedback(index)}
                                        index={index}
                                        key={index}
                                        onClick={this.handleClick}
                                    />
                                )
                            ))
                    }
                    </div>
                }
            </div>
        );
    }
}

export default App;